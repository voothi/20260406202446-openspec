## ADDED Requirements

### Requirement: YAML parser handles only the supported subset
The custom `parseYaml` function SHALL document and enforce its supported YAML subset: flat key-value, nested objects (indented), arrays of scalars, arrays of single-key objects, and block scalars (`|`). It SHALL throw a descriptive error for unsupported constructs rather than silently misparse them.

#### Scenario: Unsupported YAML construct
- **WHEN** `parseYaml` encounters a folded scalar (`>`) or YAML anchor/alias
- **THEN** it MUST throw an error with a message identifying the unsupported construct

#### Scenario: Valid block scalar roundtrip
- **WHEN** a YAML string with a `|` block scalar is parsed and then stringified
- **THEN** the parse result's string field MUST preserve line breaks and trailing newline

#### Scenario: Line with no colon and no dash
- **WHEN** a non-empty YAML line contains neither `:` nor `-` and is not inside a block scalar
- **THEN** `parseYaml` MUST throw `Invalid YAML format at line: <line>`

### Requirement: Custom validate() schema engine has documented conventions
The `validate()` function in `src/core/validate.ts` SHALL use a documented schema DSL. The `'regex:<pattern>'` primitive, required vs. optional key (`key?`) convention, function schemas, wildcard object schemas (`{ '*': type }`), and array schemas (`[itemSchema]`) MUST be documented with examples in the source file.

#### Scenario: Required field missing
- **WHEN** an object is validated against a schema with a required field that is absent
- **THEN** `validate()` MUST return `{ success: false, errors: ['Missing required field: <key>'] }`

#### Scenario: Optional field absent
- **WHEN** an object is validated against a schema where an optional field (key ending in `?`) is absent
- **THEN** `validate()` MUST return `{ success: true, errors: [] }`

#### Scenario: Regex primitive validation
- **WHEN** a field is validated against `'regex:^\\d{4}-\\d{2}-\\d{2}$'`
- **AND** the value does not match the pattern
- **THEN** `validate()` MUST return a failure with an error message referencing the regex

### Requirement: CliRouter correctly resolves option values for all argument forms
The `CliRouter` SHALL correctly parse option values in all three forms: `--flag value`, `--flag=value`, and boolean flags; and SHALL NOT consume a positional argument as an option value.

#### Scenario: Value via space separator
- **WHEN** the argv is `['--change', 'my-change', '--json']`
- **THEN** `options.change` MUST equal `'my-change'` and `options.json` MUST be `true`

#### Scenario: Value via equals sign
- **WHEN** the argv is `['--change=my-change']`
- **THEN** `options.change` MUST equal `'my-change'`

#### Scenario: Positional not consumed as option value
- **WHEN** a subcommand expects a positional argument followed by an option
- **WHEN** the argv is `['my-name', '--json']`
- **THEN** the positional MUST be passed as the first action argument, not consumed into `options`

### Requirement: Inline polyfills are extracted to a shared module
The `chalk` and `ora` polyfills that are copy-pasted into `src/core/init.ts` and `src/core/update.ts` SHALL be extracted into a single shared module (`src/core/polyfills.ts`) and imported from that location. The two existing inline copies MUST be removed.

#### Scenario: Shared import
- **WHEN** `init.ts` and `update.ts` need to produce styled terminal output
- **THEN** both MUST import from `src/core/polyfills.ts` — no duplicated polyfill code in these files

#### Scenario: Behavioral parity
- **WHEN** `chalk.green('text')` is called via the polyfill
- **THEN** it MUST return `'text'` (pass-through, no ANSI on the polyfill)

### Requirement: ChangeSchema validation uses named constants for thresholds
The `ChangeSchema` validator in `src/core/schemas/change.schema.ts` SHALL reference the named constants `MIN_WHY_SECTION_LENGTH` and `MAX_DELTAS_PER_CHANGE` from `src/core/validation/constants.ts` instead of hardcoding numeric literals (currently `50` and `10`).

#### Scenario: Why section threshold
- **WHEN** the `why` field length is exactly `MIN_WHY_SECTION_LENGTH - 1`
- **THEN** validation MUST fail with `CHANGE_WHY_TOO_SHORT`

#### Scenario: Delta count threshold
- **WHEN** the `deltas` array length is exactly `MAX_DELTAS_PER_CHANGE + 1`
- **THEN** validation MUST fail with `CHANGE_TOO_MANY_DELTAS`

### Requirement: Test assertions validate specific error messages after schema migration
Tests for `ScenarioSchema`, `RequirementSchema`, `SpecSchema`, and `ChangeSchema` MUST assert on specific error message text (not just `success: false`) to detect regressions in error messaging.

#### Scenario: Scenario empty text
- **WHEN** `ScenarioSchema` is used to validate `{ rawText: '' }`
- **THEN** the result MUST include an error containing `'Scenario text cannot be empty'`

#### Scenario: Requirement missing SHALL
- **WHEN** `RequirementSchema` validates a requirement whose text lacks SHALL/MUST
- **THEN** the result MUST include an error containing `'Requirement must contain SHALL or MUST keyword'`
