## Why

OpenSpec has undergone significant architectural shifts, including the OPSX (1.0.0) release and the transition to a zero-dependency runtime. This change finalizes the cleanup of stale documentation and legacy artifacts that no longer reflect the modern system, while synchronizing project configuration with the actual environment (npm).

## What Changes

- **Documentation Cleanup**: Remove `docs/cli.md`, `docs/commands.md`, and `docs/concepts.md` which have been consolidated into `docs/reference.md`.
- **Change Archive Cleanup**: Remove the stale `openspec/changes/IMPLEMENTATION_ORDER.md` which references long-completed foundation changes.
- **Configuration Synchronization**: Update `openspec/config.yaml` and `README.md` to consistently specify `npm` as the package manager, aligning with the existing `package-lock.json`.
- **Build Verification**: Ensure a clean reinstall and build cycle executes successfully after the cleanup.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `legacy-cleanup`: Enhance to manage the removal of these specific stale documents and implementation guides.
- `openspec-conventions`: Synchronize documentation and config with the actual npm-based project state.

## Impact

- **Documentation**: Improved accuracy and reduced confusion for users by removing fragmented, outdated guides.
- **Maintenance**: Reduced noise in the `openspec/` directory.
- **Onboarding**: Consistent instructions in `README.md` and `config.yaml` for new contributors.
