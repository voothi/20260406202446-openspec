## Why

The project has accumulated several redundant and environment-specific files that clutter the workspace and make it harder for new contributors and AI agents to understand the project structure. This includes old README versions, transient logs, temporary scratch scripts, and stale OpenSpec changes that are no longer being worked on.

## What Changes

- Delete `README_OLD.md` (Redundant history).
- Delete `error.log` (Leftover crash log).
- Delete `scratch/` directory contents (Temporary artifacts).
- Relocate `openspec-parallel-merge-plan.md` to `docs/design/parallel-merge-remediation.md` for historical reference.
- Clean up stagnant OpenSpec changes:
    - `add-qa-smoke-harness` (Archive)
    - `add-artifact-regeneration-support` (Archive)
    - `schema-alias-support` (Delete)

## Capabilities

### New Capabilities
- `project-hygiene`: Automated cleanup of project artifacts and stagnant changes.

### Modified Capabilities
- None

## Impact

- Cleaner workspace.
- Reduced noise in file search and AI context.
- Organized historical design documents.
