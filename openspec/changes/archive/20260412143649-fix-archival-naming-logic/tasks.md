# Tasks: Fix Archival Naming Logic

## 1. Core Template Refactoring

- [x] 1.1 Update `src/core/templates/workflows/archive-change.ts` to preserve ZIDs.
- [x] 1.2 Update `src/core/templates/workflows/bulk-archive-change.ts` to preserve ZIDs.
- [x] 1.3 Update `src/core/templates/workflows/onboard.ts` narration to match ZID logic.

## 2. Active Project Patching

- [x] 2.1 Update `.agent/skills/openspec-archive-change/SKILL.md` in `openspec` (current project).
- [x] 2.2 Update `.agent/skills/openspec-archive-change/SKILL.md` in `kardenwort-mpv`.
- [x] 2.3 Update `.agent/workflows/opsx-archive.md` in `kardenwort-mpv`.

## 3. Verification

- [x] 3.1 Review all workflow templates in `src/core/templates/workflows/` for hardcoded date logic.
- [x] 3.2 Verify that `openspec archive` CLI command (already correct) matches Agent behavior.
