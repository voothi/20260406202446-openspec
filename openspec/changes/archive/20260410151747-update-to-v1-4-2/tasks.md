## 1. Update Versioning

- [x] 1.1 Update `version` to `1.4.2` in `package.json`
- [x] 1.2 Update `version` to `1.4.2` in `openspec-fork/package.json`

## 2. Update Changelog

- [x] 2.1 Add `## 1.4.2` section to `CHANGELOG.md`
- [x] 2.2 Summarize archived changes in `CHANGELOG.md`:
    - `20260410115353-project-hygiene-cleanup`
    - `20260410121551-update-docs`
    - `20260410124445-cleanup-and-synchronize`
    - `20260410131911-release-sync`

## 3. Build and Sync

- [x] 3.1 Run `npm run build` to update distribution
- [x] 3.2 Run `npm run sync:all` to synchronize shims and fork distribution
- [x] 3.3 Verify version via `node bin/openspec.js --version`
