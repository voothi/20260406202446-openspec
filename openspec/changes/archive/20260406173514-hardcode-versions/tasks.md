## 1. Pin Dependencies

- [x] 1.1 Remove caret (`^`) and tilde (`~`) from all `dependencies` in `package.json`
- [x] 1.2 Remove caret (`^`) and tilde (`~`) from all `devDependencies` in `package.json`
- [x] 1.3 Run `npm install` to regenerate the lockfile with pinned versions

## 2. Verification

- [x] 2.1 Inspect `package.json` to confirm all versions are exact
- [x] 2.2 Run `npm test` to verify that pinning didn't break codebase functionality (skipped: no tests found)
