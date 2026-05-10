## Why

The YAML parser throws a `TypeError: Cannot use 'in' operator to search for 'context' in Project: Kardenwort-mpv (mpv configuration)` when parsing certain config.yaml files. This occurs because the parser uses the `in` operator on values that may be strings or null instead of proper objects. In JavaScript, `typeof null === 'object'` is true, so type checks like `typeof x === 'object'` don't properly exclude null values before using the `in` operator.

## What Changes

- Fix type checks in [`yaml-parser.ts`](src/core/parsers/yaml-parser.ts) to properly exclude null values before using the `in` operator
- Add explicit null checks alongside `typeof === 'object'` checks
- Ensure all uses of the `in` operator are guarded by proper type validation

## Capabilities

### New Capabilities
- `yaml-parser-type-safety`: Robust type checking for YAML parser to prevent runtime errors

### Modified Capabilities
- `config-loading`: Config loading will be more resilient to edge cases in YAML parsing

## Impact

- **Affected code**: [`src/core/parsers/yaml-parser.ts`](src/core/parsers/yaml-parser.ts)
- **Affected tests**: [`test/core/yaml-parser.test.ts`](test/core/yaml-parser.test.ts) - will need new test cases for edge cases
- **Dependencies**: None (zero-dependency parser)
- **Systems**: All projects using OpenSpec that have config.yaml files
