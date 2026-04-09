## 1. Fix `searchableMultiSelect` in init.js

- [x] 1.1 Replace the async IIFE with `const { checkbox: searchableMultiSelect } = await import('../core/prompts.js')` in `dist/core/init.js`.

## 2. Fix `searchableMultiSelect` in update.js

- [x] 2.1 Apply the same fix to the legacy-upgrade tool selection path in `dist/core/update.js`.

## 3. Fix `checkbox` polyfill to support `preSelected`

- [x] 3.1 Update `dist/core/prompts.js`'s `checkbox` function to check `c.checked || c.preSelected` for both the display tick and the default selection return value.

## 4. Fix backtick escaping in bulk-archive-change.js

- [x] 4.1 Escape the two occurrences of `` `<target-name>` `` as `` \`<target-name>\` `` in `dist/core/templates/workflows/bulk-archive-change.js` (lines 238 and 484).

## 5. Verify

- [x] 5.1 Confirm `openspec init --tools none` exits with `OpenSpec Setup Complete` and no errors.
