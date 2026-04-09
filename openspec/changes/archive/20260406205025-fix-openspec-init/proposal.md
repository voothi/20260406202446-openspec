# Proposal: Fix `openspec init` Crashes

## Why

Running `openspec init` on a fresh project crashed with two distinct errors depending on the environment:

1. **`TypeError: searchableMultiSelect is not a function`** — The interactive tool-selection prompt in `init.js` and `update.js` was broken. The patch-inquirer migration replaced static inquirer imports with a dynamic import IIFE, but the IIFE was never `await`-ed, so the destructured value was always a `Promise` object instead of the function. Additionally, the IIFE mapped to `select` (single-pick) rather than `checkbox` (multi-pick), which is what `searchableMultiSelect` semantically requires.

2. **`ReferenceError: target is not defined`** — `openspec init` loads all skill templates at startup to generate SKILL.md files. The `bulk-archive-change.js` template contains a backtick character (`` ` ``) inside its template literal instructions string that was **not escaped**, causing the JavaScript parser to terminate the outer template literal prematurely. This left the bare word `target` (from the prose `` `<target-name>` ``) as an unresolved identifier, crashing node before any user interaction occurred.

Both bugs were introduced during the zero-dependency migration and affected `openspec init` on any project that didn't already have an `openspec/` directory.

## What Changes

- **`dist/core/init.js`**: Replace the broken async IIFE with a proper `await import()` expression mapping to `checkbox` (not `select`).
- **`dist/core/update.js`**: Same fix for the identical pattern in the legacy-upgrade tool selection path.
- **`dist/core/prompts.js`**: Extend the `checkbox` polyfill to honour `preSelected` in addition to `checked`, since `init.js` uses `preSelected` to pre-tick detected tools.
- **`dist/core/templates/workflows/bulk-archive-change.js`**: Escape the two unescaped backtick occurrences (`` `<target-name>` `` → `` \`<target-name>\` ``) in both the skill template and command template string literals.

## Capabilities

No new capabilities. This is a pure regression fix — restoring `openspec init` to a functional state after the zero-dependency migration.

## Impact

- `openspec init` (all platforms, fresh and existing projects)
- `openspec update` (legacy-upgrade tool-selection path)
- All skill template generation (affected any project installing the `bulk-archive` workflow)
