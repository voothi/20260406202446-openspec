## Why

The zero-dependency rewrite (commits `64d476f8` → `91c1a0dd`) replaced all external runtime packages with hand-written polyfills and rewrote the YAML parser, schema validator, CLI router, and prompts layer from scratch. Before this code can be considered stable, it must be audited for correctness, logical consistency, regressions, and style drift introduced during the rewrite — especially since the approach of inlining polyfills instead of extracting them to shared utilities created duplication and potential inconsistency across files.

## What Changes

- **New spec**: `zero-dep-audit` — documents findings, patterns, and required remediations from the audit
- Review and document the correctness of the custom `parseYaml` / `stringifyYaml` implementation
- Review and document the correctness of the custom `validate()` schema engine and its usage in `base.schema.ts`, `change.schema.ts`, `artifact-graph/types.ts`, and `config-schema.ts`  
- Review and document the `CliRouter` replacement for `commander` — argument parsing edge cases, subcommand delegation, option resolution
- Review and document the inline `chalk`/`ora` polyfills duplicated across `init.ts` and `update.ts`
- Review and document the `prompts.ts` replacement for `@inquirer/prompts`
- Review and document the telemetry stub in `telemetry/index.ts`
- Review and document the `cli/index.ts` migration from `commander` to `CliRouter`
- Identify and classify any regressions, functional differences, style inconsistencies, or logic errors
- Produce a tasks list of remediations ranked by severity

## Capabilities

### New Capabilities

- `zero-dep-audit`: A structured audit of the zero-dependency rewrite — findings per module, severity ratings, and remediation recommendations

### Modified Capabilities

- `telemetry`: Requirements change — telemetry is now permanently disabled (not opt-out), the spec must reflect this new state

## Impact

- `src/core/parsers/yaml-parser.ts` — audit target
- `src/core/validate.ts` — audit target
- `src/core/cli-router.ts` — audit target
- `src/core/prompts.ts` — audit target
- `src/core/init.ts`, `src/core/update.ts` — inline polyfill duplication
- `src/cli/index.ts` — commander → CliRouter migration
- `src/telemetry/index.ts` — stub correctness and spec alignment
- `src/core/schemas/base.schema.ts`, `change.schema.ts` — zod → custom validator
- All tests that were adapted (not deleted) to use the new validation API surface
