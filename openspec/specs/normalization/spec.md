# normalization Specification

## Purpose
This specification defines and enforces standard normalization rules for all specification files in the repository. It ensures that every specification file follows a unified structural format, includes non-placeholder Title and Purpose sections, and bans raw delta headers or unarchived placeholders in the source-of-truth directory.
## Requirements
### Requirement: Unified Spec Purpose Standard
All specification files in the repository MUST include a non-placeholder `## Purpose` section and a `# title`.

#### Scenario: Archival without purpose update
- **WHEN** a change is archived and produces a new spec file
- **THEN** the system SHALL NOT allow `TBD` placeholder text to persist in the source-of-truth `openspec/specs/` directory indefinitely.
- **AND** normalization tests SHALL enforce this baseline.

