## MODIFIED Requirements

### Requirement: Project Structure
- **From**: The archive directory follow the `YYYY-MM-DD-[name]/` format.
- **To**: The archive directory MUST follow the standard naming convention of `<ZID>-<name>/`, where ZID is a globally unique timestamp (YYYYMMDDHHMMSS) or a provided Zero ID.
- **Reason**: To ensure global uniqueness and prevent collisions when archiving changes from different days or sources, and to align with the project's move towards ZID-based identifiers.

#### Scenario: Archiving a completed change
- **GIVEN** a completed change directory `openspec/changes/20260410121551-update-docs`
- **WHEN** the archive command is executed
- **THEN** it SHALL be moved to `openspec/changes/archive/20260410121551-update-docs/`
- **AND** the spec sync process SHALL execute as defined

### Requirement: Change Storage Convention
- **From**: Descriptive change identifier `[change-name]`.
- **To**: Change identifiers MUST be prefixed with a ZID (YYYYMMDDHHMMSS) to ensure uniqueness: `<ZID>-<name>`.
- **Reason**: Prevents ambiguous naming and enforces an chronological implementation order by default.

#### Scenario: Creating a new change
- **WHEN** running `openspec new change "update-docs"`
- **THEN** the resulting directory SHALL be `openspec/changes/20260410121551-update-docs/` (assuming current time)
