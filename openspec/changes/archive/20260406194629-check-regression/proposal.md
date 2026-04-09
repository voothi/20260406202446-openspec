# Proposal: Auditing for Zero-Dependency Regressions

## 1. Needs and Goals

### The Problem
Since commit `33c4ee62868ca8cbe8eaac07b1f27aecd5e995f2`, this project has undergone an intense, continuous series of refactoring jobs (amounting to 7 massive internal changes). The codebase was completely migrated away from `commander`, `zod`, `ora`, `yaml`, `fast-glob`, `chalk`, and `@inquirer`. We implemented a completely native router, native `readline` polyfills, and custom YAML extraction.

Given that tests have broken due to `devDependency` mismatches, we need to comprehensively verify that the system still performs identical functional routing compared to the prior state.

### The Objective
Manually audit the primary functional commands (`status`, `instructions`, `new`, `archive`, `apply`) by invoking them interactively. Identify if any CLI parsing logic or output mechanisms have fatally regressed.

### Success Criteria
- [ ] Ensure nested commands (e.g., `new change "name"`) correctly route their arguments.
- [ ] Ensure interactive components fallback properly to our `.prompts.js` polyfill.
- [ ] Verify there are no schema parsing crashes when navigating edge-case inputs.

## 2. Approach Selection

### Considered Approaches
1. **Automated Vitest Repair:** Reconfigure Vitest to point explicitly at the `dist/` JS bundle and mock the standard stream. (Too heavy for a quick check, as the entire test ecosystem was disconnected).
2. **Manual End-to-End Walkthrough (Selected):** Manually execute the exact workflows the users perform by running edge commands like `--help` matrices, invalid arguments, and list operations to trace the execution nodes statically.

## 3. Impact Assessment
If regressions are discovered across our router or interactive layers, they must be patched immediately to ensure absolute parity with the library-driven legacy system.

## 4. Work Plan
See `design.md`.
