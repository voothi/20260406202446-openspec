## ADDED Requirements

### Requirement: Minimal YAML Parser
The system SHALL replace the `yaml` dependency with a basic, manually-vetted YAML parser for reading `.openspec.yaml` and other configuration files.

#### Scenario: Reading configuration
- **WHEN** the CLI reads `openspec/config.yaml`
- **THEN** it SHALL extract the `schema` name and other top-level keys correctly without external libraries.
