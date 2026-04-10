## 1. Project Hygiene Cleanup

- [ ] 1.1 Delete redundant documentation files: `docs/cli.md`, `docs/commands.md`, and `docs/concepts.md`
- [ ] 1.2 Delete stale movement guide: `openspec/changes/IMPLEMENTATION_ORDER.md`
- [ ] 1.3 Verify that `reference.md` is the primary source of truth for CLI/Concepts

## 2. Configuration Synchronization

- [ ] 2.1 Update `openspec/config.yaml` to specify `Package manager: npm`
- [ ] 2.2 Update `README.md` development section to use `npm` commands instead of `pnpm`
- [ ] 2.3 Verify `package-lock.json` matches the freshly installed `node_modules`

## 3. Verification & Build

- [ ] 3.1 Run `npm install` and verify zero errors
- [ ] 3.2 Run `npm run build` and verify `dist/` is correctly regenerated
- [ ] 3.3 Run `node bin/openspec.js status` to ensure CLI is operational
- [ ] 3.4 Verify that Windows-specific paths are handled correctly during deletion (using `path.join` principles)
