## Why

The user has been working in a separate `reference-openspec` project and wants to merge those changes (specifically the built distribution and archived changes) into the main OpenSpec repository. This consolidation allows using the main project's scripts and tests with the modified code.

## What Changes

- **Transfer built distribution**: Copy files from `reference-openspec/dist` to the project root or a dedicated directory.
- **Transfer archived changes**: Move completed change records from `reference-openspec/openspec/changes/archive` to the main project's archive.
- **Update references**: Ensure that the main project's CLI or deployment scripts point to the updated distribution.

## Capabilities

### New Capabilities
- `transfer-reference-assets`: Capability to safely synchronize built assets and archived records from a reference project into the active workspace.

### Modified Capabilities
- None

## Impact

- Overwrites existing `dist/` content (or creates a branch/backup).
- Merges archived change history.
- Improves developer workflow by centralizing the source of truth.
