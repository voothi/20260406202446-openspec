## 1. Regression Testing

- [ ] 1.1 Create reproduction test cases in `test/core/project-config.test.ts` for comment-terminated block scalars.
- [ ] 1.2 Add tests for complex comment scenarios (e.g., comments with colons) inside and after block scalars.
- [ ] 1.3 Add test cases for multi-line block scalars followed by various non-indented elements (keys, lists, comments, empty lines).

## 2. YAML Parser Fix

- [ ] 2.1 Modify `src/core/parsers/yaml-parser.ts` to ignore lines starting with `#` in the top-level syntax validation check.
- [ ] 2.2 Refine block scalar state machine to correctly transition out of block mode when encountering a comment or empty line with reduced indentation.

## 3. Config Loading Improvement

- [ ] 3.1 Update `readProjectConfig` in `src/core/project-config.ts` to surface the specific `error.message` from the parser.
- [ ] 3.2 Ensure the warning message remains descriptive and doesn't pollute the output during normal operation.

## 4. Verification and Sync

- [ ] 4.1 Run all tests using `npm test` to confirm codebase stability.
- [ ] 4.2 Execute `npm run build` to update the distribution.
- [ ] 4.3 Manually verify the fix using the scratch script `scratch/test_parser.js` updated with the failing case.
- [ ] 4.4 Build and verify the local fork in `openspec-fork/` to ensure the fix is correctly mirrored for development agents.
