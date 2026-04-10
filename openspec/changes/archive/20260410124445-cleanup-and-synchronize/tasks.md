## 1. Project Hygiene Cleanup

- [x] 1.1 Delete redundant documentation files: `docs/cli.md`, `docs/commands.md`, and `docs/concepts.md`
- [x] 1.2 Delete stale movement guide: `openspec/changes/IMPLEMENTATION_ORDER.md`
- [x] 1.3 Verify that `reference.md` is the primary source of truth for CLI/Concepts

## 2. Configuration Synchronization

- [x] 2.1 Update `openspec/config.yaml` to specify `Package manager: npm`
- [x] 2.2 Update `README.md` development section to use `npm` commands instead of `pnpm`
- [x] 2.3 Verify `package-lock.json` matches the freshly installed `node_modules`

## 3. Verification & Build

- [x] 3.1 Run `npm install` and verify zero errors
- [x] 3.2 Run `npm run build` and verify `dist/` is correctly regenerated
- [x] 3.3 Run `node bin/openspec.js status` to ensure CLI is operational
- [x] 3.4 Verify that Windows-specific paths are handled correctly during deletion (using `path.join` principles)
