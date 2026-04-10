## 1. Critical — Hardcoded Thresholds in ChangeSchema

- [ ] 1.1 Replace hardcoded `50` with `MIN_WHY_SECTION_LENGTH` constant in `src/core/schemas/change.schema.ts`
- [ ] 1.2 Replace hardcoded `10` with `MAX_DELTAS_PER_CHANGE` constant in `src/core/schemas/change.schema.ts`
- [ ] 1.3 Add regression tests asserting `why.length === MIN_WHY_SECTION_LENGTH - 1` fails with `CHANGE_WHY_TOO_SHORT`
- [ ] 1.4 Add regression tests asserting `deltas.length === MAX_DELTAS_PER_CHANGE + 1` fails with `CHANGE_TOO_MANY_DELTAS`

## 2. High — Weakened Test Assertions After Schema Migration

- [ ] 2.1 Restore `ScenarioSchema` test assertion: check error message equals `'Scenario text cannot be empty'`
- [ ] 2.2 Restore `RequirementSchema` test assertion: check error message contains `'Requirement must contain SHALL or MUST keyword'`
- [ ] 2.3 Restore `RequirementSchema` test assertion: check error message contains `'Requirement must have at least one scenario'`
- [ ] 2.4 Restore `SpecSchema` test assertion: check error message contains `'Spec must have at least one requirement'`
- [ ] 2.5 Restore `ChangeSchema` test assertion: check error message contains `'Why section must be at least 50 characters'`
- [ ] 2.6 Restore `ChangeSchema` test assertion: check error message contains `'Consider splitting changes'`

## 3. High — CliRouter Option Parsing Edge Cases

- [ ] 3.1 Write a test: `['my-name', '--json']` on a subcommand with one positional argument — verify positional is passed as first arg, not consumed into `options`
- [ ] 3.2 Write a test: `['--change=my-change', '--json']` — verify `options.change === 'my-change'` via equals-sign syntax
- [ ] 3.3 Write a test: verify `--no-<flag>` sets `options[flag] = false` correctly
- [ ] 3.4 Document the "greedy next token as value" behavior in `CliRouter` source with an inline comment explaining the limitation

## 4. Medium — Extract Inline Polyfills to Shared Module

- [ ] 4.1 Create `src/core/polyfills.ts` exporting `chalk` and `ora` polyfill objects
- [ ] 4.2 Remove inline `makeChalk`/`ora` definitions from `src/core/init.ts` and import from `polyfills.ts`
- [ ] 4.3 Remove inline `makeChalk`/`ora` definitions from `src/core/update.ts` and import from `polyfills.ts`
- [ ] 4.4 Verify tests still pass after polyfill extraction

## 5. Medium — Document the validate() Schema DSL

- [ ] 5.1 Add a JSDoc block at the top of `src/core/validate.ts` documenting: primitive strings (`'string'`, `'number'`, `'boolean'`, `'array'`), `'regex:<pattern>'`, optional keys (`key?`), array schemas `[itemSchema]`, wildcard schemas `{ '*': type }`, and function schemas
- [ ] 5.2 Add a dedicated `test/core/validate.test.ts` with at least one test per schema primitive type
- [ ] 5.3 Add a test for the wildcard schema `{ '*': 'string' }` pattern

## 6. Medium — YAML Parser: Document Supported Subset and Add Edge Case Tests

- [ ] 6.1 Add a header comment in `src/core/parsers/yaml-parser.ts` listing supported YAML constructs and explicitly excluded constructs (folded scalars, anchors, multi-document, inline block objects)
- [ ] 6.2 Add a test: block scalar (`|`) value preserves internal line breaks and ends with `\n`
- [ ] 6.3 Add a test: `parseYaml` throws on a line with no `:` and no `-` (outside block scalar)
- [ ] 6.4 Add a test: `stringifyYaml(parseYaml(input)) === input` for a representative roundtrip (document known deviation cases if full roundtrip is not achievable)

## 7. Low — Telemetry Spec Sync

- [ ] 7.1 Verify the `specs/telemetry/spec.md` delta in this change correctly archives after apply (covering all REMOVED requirements with reason + migration)
- [ ] 7.2 Update `test/telemetry/index.test.ts` to remove any remaining mock of `PostHog` that is now unreachable (since the import is gone from production code)
