# Design: Fix `openspec init` Crashes

## Context

During the zero-dependency migration, the inquirer package was removed and replaced with a custom `dist/core/prompts.js` polyfill. A patch script (`patch-inquirer.js`) mechanically replaced static import statements with dynamic import IIFEs. The migration introduced two separate bugs:

1. The IIFE replacement was syntactically incorrect — it returns a `Promise`, not the resolved module.
2. It mapped to the wrong exported function (`select` = single, `checkbox` = multi).

Separately, the `bulk-archive-change.js` workflow template file contains inline documentation text that uses backtick-delimited code spans (e.g., `` `<target-name>` ``). When this text was placed inside a JavaScript template literal string without escaping the inner backticks, the JS parser terminated the outer template literal early, corrupting the entire module.

## Goals / Non-Goals

- **Goals**: Restore `openspec init` and `openspec update` to full functionality. Ensure the `checkbox` polyfill correctly picks up `preSelected` items for first-time setup.
- **Non-Goals**: Not redesigning the prompts system or migrating to a richer TUI library.

## Decisions

1. **Direct `await import()` instead of IIFE wrapper**: The correct pattern for a top-level async context is `const { checkbox } = await import(...)`. The IIFE pattern is unnecessarily complex and was never going to work without `await` at the call site.

2. **`checkbox` not `select`**: `searchableMultiSelect` must return `string[]`. The `select` polyfill returns a single `string`. The `checkbox` polyfill returns `string[]` — it is the correct semantic replacement.

3. **`preSelected` support in `checkbox`**: The `init.js` tool selection passes `preSelected: true` on choices to indicate auto-detected tools. The old `searchable-multi-select.js` component honoured this field. The polyfill's `checkbox` now checks `c.checked || c.preSelected` for both display and default return.

4. **Backtick escaping in template strings**: Any backtick character appearing inside a JS template literal must be escaped as `\``. The fix is surgical — only the two lines with `` `<target-name>` `` in `bulk-archive-change.js` needed escaping.

## Risks / Trade-offs

- **Risk**: Other template files may have the same unescaped backtick issue. → **Mitigation**: A targeted grep across all template files for unescaped backtick patterns should be run as follow-up.
- **Risk**: The `checkbox` polyfill's numbered-list UX is less ergonomic than inquirer's fullscreen checkbox. → **Mitigation**: Acceptable for the zero-dependency mandate; can be improved later.

## Migration Plan

All fixes are in `dist/` directly — no build step required. Changes take effect immediately on the next CLI invocation.
