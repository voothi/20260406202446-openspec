## ADDED Requirements

### Requirement: Release initialization
The system SHALL support creating a dedicated release mirror directory for clean execution.

#### Scenario: Missing release directory
- **WHEN** the `sync:release` command is executed and `openspec-fork/` does not exist
- **THEN** the system SHALL create the directory before mirroring files.

### Requirement: Selective artifact mirroring
The system SHALL mirror only the files necessary for runtime execution to the release directory.

#### Scenario: Mirroring essential files
- **WHEN** mirroring occurs
- **THEN** the system SHALL copy `dist/`, `bin/`, `schemas/`, and `package.json` to the release directory
- **AND** SHALL NOT copy `src/`, `test/`, or `node_modules/`.

### Requirement: Cross-platform path resolution
The mirroring system SHALL resolve paths correctly on Windows, macOS, and Linux.

#### Scenario: Running on Windows
- **WHEN** mirroring occurs on a Windows 11 environment
- **THEN** the system SHALL use `path.join()` or `fs.cpSync` to handle backslashes correctly
- **AND** SHALL NOT produce corrupted paths in the release directory.

### Requirement: Dynamic version switching
The system SHALL provide a mechanism to switch between stable and fork versions without modifying the global installation path.

#### Scenario: Switching to fork mode
- **WHEN** the environment variable `USE_OPENSPEC_FORK` is set to `"true"`
- **THEN** the global `openspec` command SHALL execute the binary from the local `openspec-fork` directory.

#### Scenario: Falling back to stable mode
- **WHEN** the environment variable `USE_OPENSPEC_FORK` is NOT set or NOT `"true"`
- **THEN** the global `openspec` command SHALL execute the binary from the stable installation backup.
