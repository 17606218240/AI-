const fs = require('node:fs');
const designDefaults = require('../src/design-presets/surface-defaults.json');
const catalog = {
  'b-web': ['权限与数据密度', '复杂表格和批量失败恢复'],
  'c-web': ['触屏关键路径', '首屏与按需 SEO'],
  'mobile-web': ['软键盘与浏览器差异', 'PWA 能力与离线边界'],
  'installed-app': ['权限、返回与后台', '真机、签名和分发'],
  'mini-program': ['宿主 API 与包体', '授权及审核'],
  'service': ['数据契约和幂等', '权限、恢复与运行观测']
};
const files = ['framework-architecture.md', 'common-redlines.md', 'project-start.md'];
const branches = {
  'service': ['服务验证', '选一个关键请求，验证重复提交、失败恢复及数据结果。'],
  'token': ['局部 Token 调整', '定位实际消费的背景角色，在目标页面对照文字、边框及适用的明暗主题。'],
  'reuse': ['复用已采用组件', '用现有组件走一遍关键操作，记录成功、失败和恢复结果。'],
  'component': ['组件缺口评审', '列出必须保留的行为，用现有基座验证缺口，再比较适配或自建。'],
  'replace-base': ['组件基座替换评审', '对照当前与候选实现，回归公共接口、状态、键盘、焦点及失败恢复，确认回退方案。'],
  'brand': ['品牌规则提炼', '从参考提炼语义规则，用一个代表组件验证视觉与交互。'],
  'explore': ['界面方向探索', '围绕关键任务对照候选风格，试做一个代表界面。'],
  'intake': ['补充端型或任务', '先补齐影响当前分支的输入，再选择代表路径。']
};
const present = value => typeof value === 'string' && value.trim().length > 0;

function planSurface(surface, projectBaseline) {
  const { kind, assets, change } = surface;
  const adoptionBasis = present(surface.adoptionBasis) ? surface.adoptionBasis : null;
  const assetStatus = assets?.status;
  const changeKind = change?.kind;
  const missingDecisions = [];
  let branch = 'intake';
  if (!present(kind)) missingDecisions.push('确认交付端型');
  if (!present(surface.task)) missingDecisions.push('明确本端关键任务');
  if (!adoptionBasis) missingDecisions.push('记录本端采用依据，或明确尚未采用');

  if (kind === 'service') {
    branch = 'service';
  } else if (present(kind)) {
    if (!['adopted', 'reference', 'none'].includes(assetStatus)) missingDecisions.push('核对现有资产状态');
    if (['adopted', 'reference'].includes(assetStatus) && !assets.references?.some(present)) missingDecisions.push('补充可定位的资产引用');
    if (!['token', 'feature', 'component', 'replace-base', 'redesign'].includes(changeKind)) missingDecisions.push('明确本次改动类型');
    if (['component', 'replace-base'].includes(changeKind) && !(Array.isArray(change.requiredBehaviors) && change.requiredBehaviors.some(present))) {
      missingDecisions.push('列出目标组件必须满足的行为及验收条件');
    }
    if (changeKind === 'token' && assetStatus !== 'adopted') {
      missingDecisions.push('先定位已采用的主题或组件，再判断能否只改 Token');
    } else if (changeKind === 'token') {
      branch = 'token';
    } else if (changeKind === 'replace-base') {
      branch = 'replace-base';
      if (assetStatus !== 'adopted') missingDecisions.push('定位当前已采用的基座及公共接口');
    } else if (changeKind === 'component' && assetStatus === 'adopted') {
      branch = 'component';
    } else if (changeKind === 'redesign' || (present(changeKind) && assetStatus === 'reference')) {
      branch = 'brand';
    } else if (changeKind === 'feature' && assetStatus === 'adopted') {
      branch = 'reuse';
    } else if (present(changeKind) && assetStatus === 'none') {
      branch = 'explore';
    }
  }
  const [branchLabel, verification] = branches[branch];
  return {
    assets: assets ?? null,
    adoptionBasis,
    projectBaseline: projectBaseline ?? null,
    change: change ?? null,
    branch,
    branchLabel,
    missingDecisions,
    nextAction: missingDecisions[0] ?? verification,
    verification: {
      task: present(change?.description) ? change.description : surface.task || null,
      method: verification,
      requiredBehaviors: Array.isArray(change?.requiredBehaviors) ? change.requiredBehaviors.filter(present) : [],
      focus: ['token', 'intake'].includes(branch) ? [] : catalog[kind] ?? []
    }
  };
}
function resolve(profile) {
  if (profile?.schemaVersion !== 1 || !Array.isArray(profile.surfaces) || !profile.surfaces.length) throw Error('需要 schemaVersion:1 及至少一个交付面');
  const missing = ['name','goal','baseline'].filter(key => !present(profile[key]));
  const ids = new Set();
  const surfaces = profile.surfaces.map((s, i) => {
    if (!s || typeof s !== 'object') throw Error('交付面必须为对象');
    if (present(s.id) && ids.has(s.id)) throw Error('交付面 id 重复: '+s.id);
    if (present(s.id)) ids.add(s.id);
    for (const key of ['id','kind','audience','task','distribution']) if (!present(s[key])) missing.push('surfaces['+i+'].'+key);
    if (present(s.kind) && !Object.hasOwn(catalog,s.kind)) throw Error('未知端型: '+s.kind);
    if (s.assets?.references != null && !Array.isArray(s.assets.references)) throw Error('资产引用必须为数组');
    return {id:s.id, kind:s.kind, constraints:s.constraints ?? [], focus:catalog[s.kind] ?? [], ui:present(s.kind) && s.kind !== 'service', designPreset: s.designPreset ?? designDefaults[s.kind] ?? null, ...planSurface(s, profile.baseline)};
  });
  return {status:missing.length?'待补输入':'可进入分析', missing, surfaces, read:[...files,...(surfaces.some(s=>s.ui)?['brand-components.md']:[])].map(f=>'documents/workflow/'+f), checks:Array.isArray(profile.checks)?profile.checks:[], stages:['接入','判端','定范围','定方案','代表路径验证','交接与迭代']};
}
if (require.main === module) {
  try {
    const input = process.argv[2];
    if (!input) throw Error('用法：node scripts/resolve-project-flow.cjs --catalog 或 <项目配置文件>');
    console.log(JSON.stringify(input==='--catalog'?catalog:resolve(JSON.parse(fs.readFileSync(input,'utf8').replace(/^\uFEFF/,''))),null,2));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
module.exports = {resolve};
