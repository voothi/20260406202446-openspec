# Design: Regression Audit

## 1. Context and Scope
Since the target commit, the OpenSpec repository underwent a massive migration strategy resulting in:
- `dist/core/cli-router.js` completely superseding `commander`.
- `dist/core/yaml-parser.js` superseding `yaml`.
- All subcommands and dependencies converting to zero-dependency equivalents.
- Polyfills replacing `chalk` and `inquirer`.

## 2. Selected Architecture / Approach
1. **Interactive Shell Tests:** Run sequences of commands such as `openspec list`, `openspec config` (which hits the prompt polyfill), and `openspec status` to trace execution logic.
2. **Flag Resolution:** Since `commander` typically parses complex flags like `--json` and `--skip-specs`, verify the custom `cli-router` correctly parses those string matrices and routes them.

## 3. Data and State Changes
N/A - Auditing phase exclusively.
