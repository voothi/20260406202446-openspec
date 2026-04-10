## 1. Environment Setup

- [ ] 1.1 Add `/dist-release/` and `/*.tgz` entries to `.gitignore`
- [x] 1.2 Set permanent Windows User Variable `USE_OPENSPEC_FORK=true` (via System Properties)
- [x] 1.3 Restart IDE and terminal sessions to propagate the new environment variable

## 2. Core Implementation

- [ ] 2.1 Create the `scripts/release-sync.js` utility script to mirror distribution files
- [ ] 2.2 Add `sync:release` command to `package.json` scripts
- [ ] 2.3 Create the `openspec` switcher/proxy script template for global installation

## 3. Verification & Testing

- [ ] 3.1 Execute `npm run sync:release` and verify that `dist-release/` contains only runtime artifacts
- [ ] 3.2 Verify that the `dist-release/` folder does not contain a `node_modules/` sub-directory
- [ ] 3.3 Test the "Toggle" behavior by switching the `USE_OPENSPEC_FORK` environment variable
- [ ] 3.4 Verify path resolution on Windows 11 using the local mirror

## 4. Documentation

- [ ] 4.1 Update project documentation to describe the "Distribution Mirror" workflow for local development and agentic execution
