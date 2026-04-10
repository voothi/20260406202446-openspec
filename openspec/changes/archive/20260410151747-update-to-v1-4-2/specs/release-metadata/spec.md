## ADDED Requirements

### Requirement: Unified Versioning
The system SHALL maintain a consistent version number across all core project packages.

#### Scenario: Version update
- **WHEN** the project version is updated to v1.4.2
- **THEN** both `package.json` and `openspec-fork/package.json` MUST reflect the version `1.4.2`

### Requirement: Archived Change Audit
The project changelog SHALL provide a consolidated record of all archived change activities.

#### Scenario: Aggregating archived changes
- **WHEN** multiple changes are archived
- **THEN** the `CHANGELOG.md` MUST be updated with a section for the new release that summarizes or links to these changes

### Requirement: Build Synchronization
The project build distribution SHALL be synchronized and verified across the local environment.

#### Scenario: Verifying build shims
- **WHEN** the project is built and synchronized
- **THEN** the distribution shims MUST reflect the current project state and version
