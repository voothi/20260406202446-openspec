## 1. Environment Setup

- [x] 1.1 Add `/openspec-fork/` and `/*.tgz` entries to `.gitignore`
- [x] 1.2 Set permanent Windows User Variable `USE_OPENSPEC_FORK=true` (via System Properties)
- [x] 1.3 Restart IDE and terminal sessions to propagate the new environment variable
- [x] 1.4 Verify `USE_OPENSPEC_FORK` is visible and set to `true` in the active shell (`$env:USE_OPENSPEC_FORK`)

## 2. Core Implementation

- [x] 2.1 Create the `scripts/release-sync.js` utility script to mirror distribution files
- [x] 2.2 Add `sync:release` command to `package.json` scripts
- [x] 2.3 Create commented `openspec` templates (`.ps1` and `.cmd`) in `scripts/`
- [x] 2.4 Add `sync:shims` and `sync:all` commands for automated global deployment
- [x] 2.5 Add `--which` flag to switcher shims for path debugging

## 3. Verification & Testing

- [x] 3.1 Execute `npm run sync:release` and verify that `openspec-fork/` contains only runtime artifacts
- [x] 3.2 Verify that the `openspec-fork/` folder does not contain a `node_modules/` sub-directory
- [x] 3.3 Test the "Toggle" behavior by switching the `USE_OPENSPEC_FORK` environment variable
- [x] 3.4 Verify path resolution on Windows 11 using the local mirror

## 4. Documentation

- [x] 4.1 Update project documentation to describe the "Distribution Mirror" workflow for local development and agentic execution
