## Why

Developing OpenSpec involves heavy development dependencies (TypeScript, ESLint, Vitest) that are not needed at runtime. Currently, running the local fork globally (via `npm link` to the project root) exposes these dev dependencies in the execution path, expanding the attack perimeter for agents and violating the "Zero-Dependency" philosophy of the production distribution. We need a way to develop locally while launching from a clean, "mirror" directory that contains only the essential runtime artifacts.

## What Changes

- **Release Mirror Script**: Implement a `scripts/release-sync.js` script that builds the project and mirrors only essential runtime files (`dist`, `bin`, `schemas`, `package.json`) to a local, git-ignored directory (`dist-release/`).
- **Dynamic Switcher**: Provide a PowerShell/CMD wrapper script that allows toggling between the stable global OpenSpec and the local fork mirror via environment variables.
- **NPM Integration**: Add `npm run sync:release` to automate the build-and-mirror process.
- **Git Hygiene**: Explicitly ignore the `dist-release/` directory to prevent accidental inclusion of build artifacts in the source control.

## Capabilities

### New Capabilities
- `release-mirroring`: Automated synchronization and isolation of runtime-only artifacts for clean execution and development.
- `version-switching`: Dynamic toggling between multiple OpenSpec installations using a single command name.

### Modified Capabilities
- `openspec-conventions`: Update conventions to include the release-mirroring workflow as the standard for local development and dogfooding.

## Impact

The primary impact is on the development workflow and package structure. No production CLI behavior changes, but the `package.json` will gain new scripts, and the `.gitignore` will be updated. This improves the security posture for AI agents running OpenSpec from a development fork.
