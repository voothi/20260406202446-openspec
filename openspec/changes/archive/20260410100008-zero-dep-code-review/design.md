## Context

The zero-dependency rewrite replaced all npm runtime packages (`commander`, `chalk`, `ora`, `zod`, `@inquirer/prompts`, `posthog-node`) with hand-written TypeScript implementations. The implementation spans 5 new core modules (`yaml-parser.ts`, `validate.ts`, `cli-router.ts`, `prompts.ts`, `fs-utils.ts`) plus inline polyfills in `init.ts` and `update.ts`. The goal of the audit is to verify these replacements are semantically equivalent (or intentionally different) and consistent in style and approach.

All 1329 tests pass on the current build. However, passing tests does not guarantee the absence of subtle regressions — especially since many test assertions were weakened during the rewrite (e.g., removing `expect(result.error.issues[0].message)` checks after migrating from zod).

## Goals / Non-Goals

**Goals:**
- Identify logical errors, coverage gaps, and regressions introduced in the rewrite
- Identify style inconsistencies and code duplication introduced by the polyfill strategy
- Identify spec drift (existing specs now out of sync with implemented behavior)
- Produce a prioritized remediation task list ready for implementation

**Non-Goals:**
- Re-introducing any removed external dependency
- Changing public CLI API surface or command signatures
- Refactoring modules not touched by the zero-dep rewrite

## Decisions

### D1: Audit scope follows file-level diff

The review scope is bounded by the `git diff 64d476f8..91c1a0dd` — only files changed in that range are audited. This prevents scope creep while ensuring comprehensive coverage within the rewrite.

### D2: Severity ratings guide task priority

Findings are classified as:
- **Critical** — incorrect behavior, data loss, security issue
- **High** — behavioral regression vs. previous version, missing validation
- **Medium** — code duplication, style inconsistency, weakened test coverage
- **Low** — cosmetic, minor style drift, optional improvements

### D3: Inline polyfills are a tech debt item, not a blocker

The inline `chalk`/`ora` polyfills duplicated across `init.ts` and `update.ts` are flagged as Medium severity. They should be extracted to a single shared module but do not cause functional regressions.

### D4: Weakened test assertions are a Medium-severity finding

Tests that previously validated specific error messages (e.g., `REQUIREMENT_NO_SHALL`) and had those assertions removed during the rewrite lose their ability to detect regression in error text. These are tracked but not treated as Critical since the happy/sad path split is still tested.

### D5: Telemetry spec must be updated to match reality

The existing `openspec/specs/telemetry/spec.md` specifies opt-out behavior and PostHog integration that no longer exists. The MODIFIED spec delta will replace the requirements with the permanently-disabled stub contract.

## Risks / Trade-offs

- [Risk] `parseYaml` handles only a subset of YAML — complex nested objects, multi-key inline objects in array items, folded scalars (`>`), anchor/alias, multi-document YAML are not supported → Mitigation: document the supported YAML subset in the spec; throw clearly on unsupported input
- [Risk] `CliRouter` option resolution uses a greedy "next arg that doesn't start with `-`" heuristic for values — this can misparse positional args as option values → Mitigation: flag in audit spec; add test cases for ambiguous input
- [Risk] `validate()` uses `'regex:...'` string as a schema primitive — this is a non-obvious convention that isn't documented and could confuse contributors → Mitigation: add inline documentation and a dedicated test suite
- [Risk] Inline `chalk`/`ora` polyfills differ between `init.ts` and `update.ts` (different Proxy approach) → Mitigation: extract to shared `src/core/polyfills.ts`
- [Risk] `ChangeSchema` hardcodes `min why length = 50` but the old zod schema used `MIN_WHY_SECTION_LENGTH` constant → Mitigation: restore constant reference

## Open Questions

- Should `stringifyYaml` support quoting strings that contain `: ` to prevent round-trip parse errors? (Currently it does not, which means `stringifyYaml(parseYaml(s)) !== s` for some inputs.)
- Should the `CliRouter` support `--flag=value` syntax for subcommands, not just the root command? (Currently not exercised in tests.)
