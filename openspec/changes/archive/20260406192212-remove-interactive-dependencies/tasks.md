## 1. Eliminate Runtime Leaks
- [x] 1.1 Rip out the `@inquirer/prompts`, `@inquirer/core`, and `chalk` dynamic imports from `dist/commands/config.js`, `dist/core/init.js`, and any other dynamic import calls.
- [x] 1.2 Implement a small zero-dependency Node.js `readline` polyfill for prompt interactions in `dist/core/prompts.js`.

## 2. Refactor Codebase Interactions
- [x] 2.1 Refactor all `.action` callbacks that rely on `@inquirer` to use the custom native implementation.
- [x] 2.2 Execute `npm uninstall @inquirer/prompts @inquirer/core chalk` to safely purge them.
