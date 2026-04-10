## Context

The project has recently completed several internal improvements focused on hygiene, documentation, and build synchronization. These changes are archived but not yet reflected in the project version or a consolidated changelog entry. This design outlines the steps to finalize these updates into a v1.4.2 release.

## Goals / Non-Goals

**Goals:**
- Consolidate recently archived changes into the official project changelog.
- Standardize the project version at `1.4.2` across main and fork packages.
- Ensure the build distribution is synchronized and verified.

**Non-Goals:**
- Introducing new functional capabilities or CLI commands.
- Modifying existing core specifications.

## Decisions

- **Simultaneous Version Bump**: Both `package.json` and `openspec-fork/package.json` will be updated to `1.4.2` in a single change to ensure environment consistency.
- **Changelog Aggregation**: The `CHANGELOG.md` will be updated with a new `1.4.2` section. It will link to or summarize the four archived changes (`20260410115353`, `20260410121551`, `20260410124445`, `20260410131911`) to maintain a clean history.
- **Post-Update Verification**: Run `npm run build` and `npm run sync:all` (if applicable) to ensure the `dist` and shims are aligned with the new version.

## Risks / Trade-offs

- **Risk**: Version drift between the development environment and the fork.
- **Mitigation**: Update both `package.json` files and verify with a full build/sync cycle.
