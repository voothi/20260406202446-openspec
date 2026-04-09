## ADDED Requirements

### Requirement: Full cleanup of node_modules
The system SHALL support the complete removal of the `node_modules` directory and its contents without affecting the project's source code or configuration.

#### Scenario: Delete node_modules on Windows
- **WHEN** the deletion task is executed on a Windows 11 system
- **THEN** the `node_modules` directory is recursively and force-deleted

### Requirement: Successful development setup
The system SHALL be able to reinstall development-only dependencies (e.g., TypeScript) from a clean state and successfully execute the `npm run build` script.

#### Scenario: Rebuild in clean environment
- **WHEN** `npm install` is run followed by `npm run build`
- **THEN** the `dist/` directory is correctly generated and the CLI is functional

### Requirement: Test suite execution
The system SHALL successfully execute all project tests (e.g., using `npm test` or equivalent) in the freshly initialized environment.

#### Scenario: Run all tests
- **WHEN** the test command is executed
- **THEN** all test cases pass and a summary is reported
