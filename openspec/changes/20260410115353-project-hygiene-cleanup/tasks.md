## 1. Project Root Deletion

- [x] 1.1 Delete `README_OLD.md` from the project root.
- [x] 1.2 Delete `error.log` from the project root.
- [x] 1.3 Clean contents of `scratch/` directory.

## 2. Architectural Doc Relocation

- [x] 2.1 Create `docs/design/` directory if it doesn't exist.
- [x] 2.2 Move `openspec-parallel-merge-plan.md` to `docs/design/parallel-merge-remediation.md`.

## 3. Change Management Cleanup

- [x] 3.1 Archive completed changes:
    - `simplify-skill-installation`
    - `graceful-status-no-changes`
    - `fix-opencode-commands-directory`
- [x] 3.2 Archive stagnant in-progress changes:
    - `unify-template-generation-pipeline`
    - `add-global-install-scope`
    - `add-change-stacking-awareness`
    - `add-tool-command-surface-capabilities`
- [x] 3.3 Archive stagnant no-tasks changes:
    - `add-artifact-regeneration-support`
    - `add-qa-smoke-harness`
- [x] 3.4 Delete empty change stubs:
    - `schema-alias-support`

## 4. Verification

- [x] 4.1 Run `openspec list` to confirm clean change list.
- [x] 4.2 Run `ls` to confirm project root is clean.
