# config-loading Specification (Delta)

## Purpose
Define changes to config loading behavior to handle YAML parser type safety improvements.

## MODIFIED Requirements

### Requirement: Config file has invalid YAML syntax

The system SHALL read and parse the project configuration file located at `openspec/config.yaml` relative to the project root. When the YAML parser encounters type-related errors (such as attempting to use the `in` operator on non-object values), the system SHALL log a warning message INCLUDING the specific parsing error details and return null.

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

#### Scenario: Config file triggers parser type error
- **WHEN** `openspec/config.yaml` contains YAML that would cause the parser to use the `in` operator on a non-object value
- **THEN** parser handles the type check gracefully without throwing TypeError
- **AND** system logs a warning message with the parsing error details and returns null
