## ADDED Requirements

### Requirement: Transfer distribution files
The system SHALL copy all files and directories from `reference-openspec/dist` to the project root `dist` directory, overwriting any existing files.

#### Scenario: Successful distribution transfer
- **WHEN** the transfer task is executed
- **THEN** all files present in `reference-openspec/dist` are found in the main project's `dist` folder with matching content

### Requirement: Merge archived changes
The system SHALL move all directory contents from `reference-openspec/openspec/changes/archive` to the project's `openspec/changes/archive` directory. If a change with the same name already exists in the destination, it SHALL be skipped or renamed to avoid collision.

#### Scenario: Successful archive merge
- **WHEN** the transfer task is executed
- **THEN** the `openspec/changes/archive` directory contains all change records previously found in the reference archive

### Requirement: Cross-platform path handling
The transfer process SHALL use Node.js `path` module utilities (e.g., `path.join`, `path.resolve`) to ensure compatibility across macOS, Linux, and Windows.

#### Scenario: Windows path compatibility
- **WHEN** running on Windows 11
- **THEN** source and destination paths are correctly resolved regardless of slash conventions in the input paths
