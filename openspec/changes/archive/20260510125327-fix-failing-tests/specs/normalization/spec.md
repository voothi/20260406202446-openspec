## ADDED Requirements

### Requirement: Unified Spec Purpose Standard
All specification files in the repository MUST include a non-placeholder `## Purpose` section and a `# title`.

#### Scenario: Archival without purpose update
- **WHEN** a change is archived and produces a new spec file
- **THEN** the system SHALL NOT allow `TBD` placeholder text to persist in the source-of-truth `openspec/specs/` directory indefinitely.
- **AND** normalization tests SHALL enforce this baseline.
