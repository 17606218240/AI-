# 工作台技术实现约定

生效：2026-11-02。仅适用project-workflow-blueprint工作台，不能自动套给健身、智运或其他新项目。通用红线见common-redlines.md，视觉参数见workbench-design.md；总入口framework-architecture.md。

## 已采用的技术基线

React + TypeScript + Ant Design 6.6.6。交互组件通过 src/components/ui/index.tsx 接入，根 ConfigProvider 消费 src/styles/workbenchTheme.ts。

流程进度使用 Ant Design Steps。全部节点可见，未满足前置条件的步骤锁定；推进走节点操作区及服务端确认门禁。

## 实际位置与维护职责

src/components/ui/index.tsx 是工作台组件适配入口。旧 shadcn 与社区组件源码及许可作为历史保留，构建检查禁止它们进入当前运行包。

src/styles/workbench.css负责工作台布局与覆盖；src/styles/tailwind.css负责主题映射。设计文档是视觉参数依据，代码是运行事实，两者不一致时登记差异，不能靠改文档冒充代码完成。

layouts负责框架，pages组装页面，features维护文档/版本/评阅/任务状态，services只封装数据，routing负责Hash定位与未保存保护，types严格TypeScript。不要修改被引用的其他项目组件库。

## 流程与数据约定

proposal.json为三个五节点现行定义；workflow.json保留参考。文档存储、历史、并发检查、确认快照、前置门槛、任务/命令记录由既有服务维护。

当前节点评阅只适用于通用工作台流程配置，项目级确认尚未接入。项目资料可经登记在工作台查看/编辑，但不把通用配置确认当项目确认；workspace-state.json无活动项目不等于没有通过对话编写项目资料。

页面原生工具支持读取任务和回写结果，不自动执行命令或唤醒当前对话。通用流程说明仍是草案，尚未安装为Skill。文档编辑不会自动重写结构化流程或切换采用版本。

## 构建与验证入口

npm run typecheck、npm run build、npm run check、npm test；官方源码差异核对用node check-shadcn-sources.cjs。依赖以package.json及实际安装为准，现有脚本支持本机工具链回退；不是对所有机器已验证的可复现承诺。

旧实现位于archive，仅作追溯，不参与当前运行。UI修改检查代表页面/弹窗、空数据/错误/禁用及键盘行为；业务变更另按实际影响选检查，不以截图或指纹替代功能验收。

数据表通过共享 DataTable 接入 Ant Design Table 6.6.6，表头、行、选择控件、加载与空态使用 Ant 默认外观。页面继续传入列定义、行键和受控选择，文档正文中的 Markdown 表格使用阅读区样式。
