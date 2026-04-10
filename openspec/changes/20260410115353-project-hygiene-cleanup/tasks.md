## 1. Project Root Deletion

- [ ] 1.1 Delete `README_OLD.md` from the project root.
- [ ] 1.2 Delete `error.log` from the project root.
- [ ] 1.3 Clean contents of `scratch/` directory.

## 2. Architectural Doc Relocation

- [ ] 2.1 Create `docs/design/` directory if it doesn't exist.
- [ ] 2.2 Move `openspec-parallel-merge-plan.md` to `docs/design/parallel-merge-remediation.md`.

## 3. Change Management Cleanup

- [ ] 3.1 Archive change `add-qa-smoke-harness` using `openspec archive add-qa-smoke-harness --yes`.
- [ ] 3.2 Archive change `add-artifact-regeneration-support` using `openspec archive add-artifact-regeneration-support --yes`.
- [ ] 3.3 Delete change directory `openspec/changes/schema-alias-support`.

## 4. Verification

- [ ] 4.1 Run `openspec list` to confirm clean change list.
- [ ] 4.2 Run `ls` to confirm project root is clean.
