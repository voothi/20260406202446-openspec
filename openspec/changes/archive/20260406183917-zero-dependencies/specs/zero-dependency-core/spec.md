## ADDED Requirements

### Requirement: Zero Runtime External Dependencies
The system SHALL NOT load or execute ANY runtime code from the `node_modules` directory. All runtime logic MUST be either part of the Node.js standard library or implemented directly in the `dist/` or `src/` tree of the project.

#### Scenario: Running the CLI
- **WHEN** the user executes any `openspec` command
- **THEN** the `package.json` `dependencies` field SHALL be empty and all logic SHALL be self-contained.

### Requirement: Built-in Command Parsing
The system SHALL replace `commander` with a manual `process.argv` parser for all its command routing.

#### Scenario: Routing commands
- **WHEN** the user runs `openspec new change <name>`
- **THEN** the internal router SHALL correctly identify the `new` command, the `change` subcommand, and the `<name>` argument without external help.
