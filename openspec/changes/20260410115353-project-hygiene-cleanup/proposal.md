## Why

The project has accumulated several redundant and environment-specific files that clutter the workspace and make it harder for new contributors and AI agents to understand the project structure. This includes old README versions, transient logs, temporary scratch scripts, and stale OpenSpec changes that are no longer being worked on.

## What Changes

- Delete `README_OLD.md` (Redundant history).
- Delete `error.log` (Leftover crash log).
- Delete `scratch/` directory contents (Temporary artifacts).
- Relocate `openspec-parallel-merge-plan.md` to `docs/design/parallel-merge-remediation.md` for historical reference.
- Clean up stagnant or completed OpenSpec changes:
    - **Archive**: `simplify-skill-installation`, `graceful-status-no-changes`, `fix-opencode-commands-directory`, `unify-template-generation-pipeline`, `add-global-install-scope`, `add-change-stacking-awareness`, `add-tool-command-surface-capabilities`, `add-artifact-regeneration-support`, `add-qa-smoke-harness`.
    - **Delete**: `schema-alias-support`.

## Capabilities

### New Capabilities
- `project-hygiene`: Automated cleanup of project artifacts and stagnant changes.

### Modified Capabilities
- None

## Impact

- Cleaner workspace.
- Reduced noise in file search and AI context.
- Organized historical design documents.
