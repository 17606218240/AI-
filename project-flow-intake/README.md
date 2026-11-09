# Project Flow Intake backup

Version: v1.1
Snapshot date: 2026-11-09 (Asia/Shanghai)

This is a source snapshot of the installed project-flow-intake Skill and its referenced workflow rules, profile templates, resolver and design presets. Original files are unchanged.

- skills/project-flow-intake/SKILL.md: installed router
- workflow-workbench/documents/workflow/: maintained rules and historical records
- workflow-workbench/scripts/resolve-project-flow.cjs: read-only resolver
- workflow-workbench/src/design-presets/: resolver defaults and preset assets

The installed router currently references E:/project/Bdesign/work/project-workflow-blueprint. This backup preserves that original path; it is not a portable installer. Figma links and recorded node identities are references, not a complete Figma file backup. Business project files, credentials, node_modules and the workbench application are not included.

v1.1 includes the multi-AI parallel-development and compound-task handoff rules, isolation-preparation exit criteria, on-demand rule loading and scoped evidence reuse. Design documentation, project-specific adoptions and historical records are separated. See the root CHANGELOG for changes and verification limits. Previous version tags are not moved.
