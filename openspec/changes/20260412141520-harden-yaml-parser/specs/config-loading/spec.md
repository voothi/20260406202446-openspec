## MODIFIED Requirements

### Requirement: Load project config from openspec/config.yaml

The system SHALL read and parse the project configuration file located at `openspec/config.yaml` relative to the project root. The parser MUST support standard YAML features including comments and block scalars, specifically ensuring that comments can safely terminate block scalars without causing syntax errors.

#### Scenario: Valid config file exists
- **WHEN** `openspec/config.yaml` exists with valid YAML content
- **THEN** system parses the file and returns a ProjectConfig object

#### Scenario: Config file does not exist
- **WHEN** `openspec/config.yaml` does not exist
- **THEN** system returns null without error

#### Scenario: Config file has invalid YAML syntax
- **WHEN** `openspec/config.yaml` contains malformed YAML
- **THEN** system logs a warning message INCLUDING the specific parsing error details and returns null

#### Scenario: Config file has valid YAML but invalid schema
- **WHEN** `openspec/config.yaml` contains valid YAML that fails validation
- **THEN** system logs a warning message with validation details and returns null

#### Scenario: Block scalar followed by comment
- **WHEN** config contains a block scalar (`|`) followed by a less-indented comment line
- **THEN** system correctly terminates the block scalar and ignores the comment without throwing a syntax error

### Requirement: Gracefully handle config errors without halting

The system SHALL continue operation with default values when config loading or parsing fails. Whenever possible, parse errors MUST be surfaced with sufficient detail to identify the problematic line in the configuration file.

#### Scenario: Config parse failure during command execution
- **WHEN** config file has syntax errors and user runs any command
- **THEN** command executes using default values (e.g., schema "spec-driven")

#### Scenario: Warning is visible to user
- **WHEN** config loading fails
- **THEN** system outputs a detailed warning message to stderr including the specific reason for the parsing failure
