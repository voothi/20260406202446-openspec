## Context

The project contains several legacy and environment-specific artifacts that are no longer useful. These include `README_OLD.md`, `error.log`, and the `scratch/` directory. Additionally, there are stagnant change proposals in the `openspec/changes/` directory that clutter the change list.

## Goals / Non-Goals

**Goals:**
- Clean up the project root of non-essential files.
- Organize architectural documentation by moving the parallel merge plan to `docs/`.
- De-clutter the OpenSpec change list by archiving or deleting stale changes.

**Non-Goals:**
- Modifying core application logic or functionality.
- Changing `package.json` or critical configuration files.
- Archiving active, in-progress changes that were touched recently.

## Decisions

- **Relocation of merge plan:** Moving `openspec-parallel-merge-plan.md` to `docs/design/` instead of deleting it, as it contains valuable historical context for future remediation.
- **Archival vs Deletion:** Changes with proposals (`add-qa-smoke-harness`, `add-artifact-regeneration-support`) will be archived to preserve the ideas. Empty stubs like `schema-alias-support` will be deleted.
- **Scratch Cleanup:** The entire contents of `scratch/` will be removed.

## Risks / Trade-offs

- **Risk:** Deleting a change that someone was planning to resume. **Mitigation:** Archiving preserves the content in `openspec/changes/archive/`.
- **Trade-off:** Losing local non-committed scratch scripts. **Mitigation:** Only the `scratch/` directory in the current project root is targeted.
