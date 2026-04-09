## Context

The `reference-openspec` directory serves as a staging ground where modifications were made to the core logic and build distribution. To unify the codebase, these assets need to be moved into the primary project structure.

## Goals / Non-Goals

**Goals:**
- Unify the `dist/` directory with the latest stable versions from the reference project.
- Consolidate all archived change records into a single location.
- Maintain script and test compatibility.

**Non-Goals:**
- Merging active (non-archived) changes from `reference-openspec`.
- Modifying the build process itself during this transfer.

## Decisions

### 1. Manual/Scripted Transfer
**Decision**: Use a temporary Node.js script or shell commands (controlled via `opsx-apply`) to perform the move.
**Rationale**: This ensures that file operations are logged and verifiable within the OpenSpec task workflow.

### 2. Overwrite Strategy for `dist/`
**Decision**: Overwrite `dist/` entirely.
**Rationale**: The reference `dist` is considered the target "deployed" version the user wants to keep.

## Risks / Trade-offs

- **Risk**: Overwriting `dist/` might break the current CLI if the reference version is buggy.
  - **Mitigation**: Create a backup of the current `dist/` before proceeding.
- **Risk**: Archive collisions if change ZIDs overlap.
  - **Mitigation**: Change-metadata logic should detect existing folders and skip or prompt.

## Migration Plan

1. Backup current `dist/`.
2. Sync `reference-openspec/dist` to `./dist`.
3. Sync `reference-openspec/openspec/changes/archive` to `./openspec/changes/archive`.
4. Verify CLI version and basic commands.
