# Proposal: Eliminate Dynamic Runtime Leaks

## 1. Needs and Goals

### The Problem
While we successfully eliminated core run-time dependencies from the main execution path, two dynamic runtime dependencies remain: `@inquirer/prompts` (and `@inquirer/core`) and `chalk`. These are lazily loaded whenever interactive console output is required. Leaving these libraries behind means our absolute zero-dependency mandate is incomplete and exposes an unnecessary runtime footprint for CLI usage.

### The Objective
To completely remove the remaining dynamic imports for `@inquirer/*` and `chalk`. We will replace these libraries with native Node.js `readline` interfaces for prompts. 

We will leave developer-only build tools like `typescript`, `eslint`, and `vitest` intact. These run purely during the CI/CD build phase and are totally inactive during normal operations or CLI agent workflow usage (`/opsx-apply`, `/opsx-propose`).

### Success Criteria
- [ ] `chalk` and `@inquirer` packages are completely uninstalled from `package.json`.
- [ ] Dynamic import requests within the codebase are swapped for a zero-dependency `readline` polyfill.
- [ ] Interactive prompts function gracefully using standard streams.
