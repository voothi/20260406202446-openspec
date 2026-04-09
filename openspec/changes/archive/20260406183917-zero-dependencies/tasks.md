## 1. Dependency Pruning

- [x] 1.1 Clear the `dependencies` section in `package.json`
- [x] 1.2 Remove `node_modules` entirely
- [x] 1.3 Update the lockfile to reflect zero runtime dependencies

## 2. Core Zero-Dependency Engine Implementation

- [x] 2.1 Create `dist/core/cli-router.js` (Manual `process.argv` parsing)
- [x] 2.2 Create `dist/core/yaml-parser.js` (Manual `key: value` extraction)
- [x] 2.3 Create `dist/core/fs-utils.js` (Manual recursive file walker)
- [x] 2.4 Create `dist/core/validate.js` (Manual schema checking)

## 3. Codebase Transition

- [x] 3.1 Redirect `bin/openspec.js` to the new `cli-router`
- [x] 3.2 Refactor all artifacts logic to use `yaml-parser`
- [x] 3.3 Replace `fast-glob` calls with `fs-utils` walker
- [x] 3.4 Replace `zod` schema checks with `validate` logic

## 4. Final Cleanup and Verification

- [x] 4.1 Delete all remaining references to third-party runtime code (telemetry, commander, etc.)
- [x] 4.2 Verify core CLI commands (`status`, `instructions`, etc.)
- [x] 4.3 Final audit of runtime logic to ensure zero external code is loaded
- [ ] 4.4 Update `README.md` to reflect the zero-dependency status as a security feature
