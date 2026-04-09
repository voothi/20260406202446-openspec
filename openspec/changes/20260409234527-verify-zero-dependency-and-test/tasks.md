## 1. Audit and Sanitation

- [ ] 1.1 Verify that the `dependencies` section in `package.json` is empty.
- [ ] 1.2 Remove any non-essential lockfiles (e.g., `package-lock.json` if using pnpm, or vice versa).
- [ ] 1.3 Delete the `node_modules` directory recursively (use PowerShell `Remove-Item -Recurse -Force`).

## 2. Environment Re-initialization

- [ ] 2.1 Run `npm install` (or `pnpm install`) to recreate `node_modules` with `devDependencies` only.
- [ ] 2.2 Verify that no runtime-only dependencies have been inadvertently re-introduced to the configuration.

## 3. Rebuild and Validation

- [ ] 3.1 Run `npm run build` to verify the TypeScript compilation and zero-dependency core build.
- [ ] 3.2 Verify the CLI version and basic command execution using `node dist/cli/index.js status`.

## 4. Test Suite Execution

- [ ] 4.1 Run the full test suite using `npm test`.
- [ ] 4.2 Verify that all tests pass on Windows 11.
