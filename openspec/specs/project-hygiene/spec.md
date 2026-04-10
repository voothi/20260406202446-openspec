# project-hygiene Specification

## Purpose
TBD - created by archiving change 20260410115353-project-hygiene-cleanup. Update Purpose after archive.
## Requirements
### Requirement: Workspace Cleanup
The system SHALL remove redundant and temporary files from the project root to maintain code quality and developer focus.

#### Scenario: Redundant README removal
- **WHEN** the `README_OLD.md` file exists in the project root
- **THEN** it SHALL be deleted

#### Scenario: Log file cleanup
- **WHEN** the `error.log` file exists in the project root
- **THEN** it SHALL be deleted

#### Scenario: Scratch directory cleanup
- **WHEN** the `scratch/` directory contains files
- **THEN** its contents SHALL be deleted

### Requirement: Document Relocation
The system SHALL relocate architectural decision records from the project root to the `docs/` directory for better organization.

#### Scenario: Move parallel merge plan
- **WHEN** `openspec-parallel-merge-plan.md` exists in the project root
- **THEN** it SHALL be moved to `docs/design/parallel-merge-remediation.md`

### Requirement: Change Management Hygiene
The system SHALL maintain a clean list of active changes by archiving or deleting stagnant proposals.

#### Scenario: Archive changes with content
- **WHEN** a change is stagnant or completed but contains valuable design history (e.g., `simplify-skill-installation`, `unify-template-generation-pipeline`)
- **THEN** it SHALL be archived to preserve history

#### Scenario: Delete empty stubs
- **WHEN** a change like `schema-alias-support` is stagnant and contains no meaningful content
- **THEN** its directory SHALL be removed

