## Context

The OpenSpec project has undergone several major transitions (OPSX, Zero-Dependency). While the code has been updated, several documentation fragments and configuration settings have drifted from the current reality. Specifically, several 20KB+ markdown files in `docs/` have been superseded by `reference.md`, and the project's package manager configuration in `config.yaml` and `README.md` incorrectly specifies `pnpm` while `npm` is the active tool in use.

## Goals / Non-Goals

**Goals:**
- Eliminate 70KB+ of redundant documentation.
- Remove stale implementation guides that reference archived changes.
- Synchronize `config.yaml` and `README.md` with the current `npm` environment.
- Verify system integrity via full reinstall and build cycle.

**Non-Goals:**
- Modifying core CLI logic or parsers.
- Changing the zero-dependency runtime architecture.
- Migrating from `npm` to `pnpm` (we are staying with `npm` as per the existing lockfile).

## Decisions

### 1. Explicit File Purge
We will explicitly delete the following files which are confirmed to be stale or redundant:
- `docs/cli.md`
- `docs/commands.md`
- `docs/concepts.md`
- `openspec/changes/IMPLEMENTATION_ORDER.md`

### 2. Standardize on npm
The `config.yaml` file currently specifies `pnpm`. This will be updated to:
```yaml
Package manager: npm
```
All references to `pnpm` in the development section of `README.md` will be replaced with `npm`.

### 3. Verification Protocol
Post-cleanup, we will execute:
1. `npm install` (to verify dependency resolution)
2. `npm run build` (to verify compilation from source)
3. `node bin/openspec.js status` (to verify CLI functionality)

## Risks / Trade-offs

- **Risk**: Users who preferred `pnpm` might be confused by the switch to `npm`. 
- **Mitigation**: The project already has a `package-lock.json`, so the switch has effectively already happened. This design simply formalizes it in the documentation and configuration.
- **Risk**: Deleting "concepts" or "commands" might hide detailed info not present in the summary.
- **Mitigation**: `reference.md` is intended to be the comprehensive guide. If specific content is missing, it should be added to `reference.md` rather than maintaining fragmented legacy files.
