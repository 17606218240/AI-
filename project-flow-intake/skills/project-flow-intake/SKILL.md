---
name: project-flow-intake
description: Route new projects, project handoffs, delivery surfaces and compound requests spanning workflow stages through the shared workflow workbench. Also use for design-spec documentation, reference-website reconstruction, style-token extraction and Figma component expansion. Excludes ordinary implementation in an already selected branch.
---

# Project flow intake

Shared workbench: E:/project/Bdesign/work/project-workflow-blueprint. If moved, locate scripts/resolve-project-flow.cjs and documents/workflow/project-start.md. All paths below are relative to that root.

Read the project's instructions, current task and adopted baseline first. Apply documents/workflow/framework-architecture.md and common-redlines.md for scope and authorization; reuse already-read rules within the task only while unchanged. Only implement explicitly requested or adopted outcomes; a reference link or target adjustment does not authorize changing source templates, components, variables or specifications.

1. For a new project, handoff or changed surface/scope, read project-start.md and resolve the per-surface profile with scripts/resolve-project-flow.cjs. For an established task, read only the changed baseline and relevant branch; do not rerun intake or the resolver without relevant changes. If the resolver is unavailable, state manual checks. Suggestions do not adopt a stack or start development.
2. Return the selected branch, evidence, blocking decisions and representative verification path once. Reuse known answers and existing records; ask only for decisions needed now.
3. Load only matching guidance below and its professional completion criteria. A skill switch is not independent review. Use project-start.md's "按需读取与增量验证" to reuse applicable evidence, refresh changed dependencies and recheck mutable multi-window state.

| Task | Read when applicable |
| --- | --- |
| Business analysis, competitors, PRD, pages, MVP and business handoff | documents/workflow/business.md; preserve evidence, assumptions and adoption states |
| Development preparation, existing engineering baseline and implementation handoff | documents/workflow/development.md |
| Compound outcomes or stages | project-start.md: "复合任务拆解与阶段交接"; order dependencies, preserve meaning, report per-task and combined results; keep small edits direct |
| Parallel AI windows or agents | development.md: "多AI窗口并行开发"; isolate workspaces, coordinate shared changes, hand off once baseline/workspace/scope/instructions are ready; no automatic dispatch or extra agent authorization |
| Brand direction, component gap, base replacement or preset choice | documents/workflow/brand-components.md; a local color change uses the adopted Token without reopening selection |
| Missing design Tokens, existing-Token layout adaptation, style-feature mapping, component/code contracts, responsive scope or reference motion | relevant named branch in documents/workflow/design.md; use available Figma/browser/code skills for actual operations, distinguish mappings from verified implementation |
| Design-spec documents, Token-library draft or packaging | documents/workflow/design-spec-documentation.md; read presentation contract, adopted template identities and applicable acceptance before writing. Product values and document presentation remain separate; ordinary parameter specs do not imply Token generation or semantic mapping |
| Reference website to editable Figma samples and reusable style rules | documents/workflow/website-style-extraction.md; observe, calibrate, extract, extend and validate only the requested scope |
| Icon safety-frame structure | design-spec-documentation.md: "图标安全框" only |

Historical design evidence and project-specific exceptions are linked from design.md; read them only for the matching project or trace question. The capability overview is a human index, not required task input. Preserve source identities and deduplicate actual assets. Keep rule updates, design writes, code changes, visual/behavior acceptance, publication and cross-file verification separate; record untested limits instead of claiming completion.
