# Project Flow Intake backup

Version: v1.0
Snapshot date: 2026-11-09 (Asia/Shanghai)

This is a source snapshot of the installed project-flow-intake Skill and its referenced workflow rules, profile templates, resolver and design presets. Original files are unchanged.

- skills/project-flow-intake/SKILL.md: installed router
- workflow-workbench/documents/workflow/: maintained rules and historical records
- workflow-workbench/scripts/resolve-project-flow.cjs: read-only resolver
- workflow-workbench/src/design-presets/: resolver defaults and preset assets

The installed router currently references E:/project/Bdesign/work/project-workflow-blueprint. This backup preserves that original path; it is not a portable installer. Figma links and recorded node identities are references, not a complete Figma file backup. Business project files, credentials, node_modules and the workbench application are not included.

v1.0 includes the multi-AI parallel-development rules. The proposed compound-task decomposition rules have not been implemented and are not included. Future snapshots should record explicit changes and new version tags without moving previous tags.
