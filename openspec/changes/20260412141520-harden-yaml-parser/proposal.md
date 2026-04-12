## Why

The custom YAML parser incorrectly throws a syntax error when a block scalar (`|`) is terminated by a comment that doesn't contain a colon (e.g., a top-level comment immediately following an indented block). This causes project configuration loading to fail silently (falling back to hardcoded defaults) in projects where `openspec/config.yaml` contains descriptive comments.

## What Changes

- **Modify `yaml-parser.ts`**: Update the parsing loop to correctly handle lines that terminate a block scalar. If a line ends a block scalar due to reduced indentation, it must still be evaluated for whether it is a comment or an empty line before being subjected to key-value pair validation.
- **Ignore comments in syntax validation**: Ensure that any line starting with `#` is explicitly ignored during the final "Invalid YAML format" check in the parser.
- **Improve config error reporting**: Update `readProjectConfig` in `project-config.ts` to include the specific error message from the parser in its console warning, enabling easier debugging for users with malformed configurations.

## Capabilities

### New Capabilities
- (None)

### Modified Capabilities
- `config-loading`: Harden the YAML parser to support comment-terminated block scalars and improve error visibility when parsing fails.

## Impact

- `src/core/parsers/yaml-parser.ts`: Main logic fix in the parsing state machine.
- `src/core/project-config.ts`: Enhanced warning messages in `readProjectConfig`.
- `test/core/project-config.test.ts`: Added regression tests for comment scenarios.
- `openspec-fork/`: The fix will be mirrored to the local development fork for validation.
