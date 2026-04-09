## 1. Preparation and Backup

- [x] 1.1 Create a backup of the current `dist/` directory at `dist_backup/` to allow rollback.
- [x] 1.2 Verify that `reference-openspec/dist` and `reference-openspec/openspec/changes/archive` exist and are accessible.

## 2. Transfer Built Distribution

- [x] 2.1 Copy all contents from `reference-openspec/dist` to `./dist/`, ensuring complete replacement of the existing distribution.
- [x] 2.2 Verify the transfer by checking for critical files (e.g., `dist/cli/index.js`, `dist/core/parsers/yaml-parser.js`).

## 3. Merge Archived Changes

- [x] 3.1 Copy all subdirectory contents from `reference-openspec/openspec/changes/archive` to `./openspec/changes/archive/`.
- [x] 3.2 Ensure that the file permissions and ownership are maintained during the move (if applicable on Windows).

## 4. Verification

- [x] 4.1 Run `node dist/cli/index.js --version` to verify the active CLI version.
- [x] 4.2 Run `node dist/cli/index.js list` to verify that the merged archives appear in the change history.
- [x] 4.3 Verify that the project scripts (npm scripts) continue to function correctly with the new distribution.
