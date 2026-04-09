# Design: Zero-Dependency Prompts

## 1. Context and Scope
The `node_modules` directory still hosts dynamic dependencies for CLI interaction (`inquirer` and `chalk`). While heavily utilized during setup scripts and interactive sessions, they present a runtime code footprint we wish to eliminate. The rest of the developer toolchain (e.g. TypeScript, ESLint) safely stays inactive during standard commands and requires no removal.

## 2. Selected Architecture / Approach
1. **Targeted Extinction:** Uninstall `@inquirer/core`, `@inquirer/prompts`, and `chalk` from the repository using `npm uninstall`.
2. **Native Polyfill:** Implement a custom, lightweight user prompt module utilizing the native Node.js `readline` library.
3. **Module Interception:** Alter dynamic import paths inside files such as `dist/commands/config.js` and `dist/core/init.js` to point towards our internal prompter instead of the third-party inquirer interface.

## 3. Data and State Changes
- Replace third-party terminal styling and prompting interfaces with standard `readline` logic.
