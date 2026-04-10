## MODIFIED Requirements

### Requirement: Legacy structure cleanup
- **FROM**: The system SHALL check for:
  - `openspec/AGENTS.md`
  - `openspec/project.md` (for migration messaging only, not deleted)
  - Root `AGENTS.md` with OpenSpec markers
- **TO**: The system SHALL check for and facilitate disposal of stale documentation and structural artifacts:
  - `openspec/AGENTS.md`
  - `openspec/project.md`
  - `openspec/changes/IMPLEMENTATION_ORDER.md`
  - Consolidated documentation fragments: `docs/cli.md`, `docs/commands.md`, `docs/concepts.md`

#### Scenario: Detecting consolidated documentation fragments
- **WHEN** running `openspec update` or `openspec validate`
- **THEN** the system SHALL identify `docs/cli.md`, `docs/commands.md`, and `docs/concepts.md` as redundant if `docs/reference.md` exists
- **AND** suggest their removal to the user if they contain no custom segments outside the consolidated reference

#### Scenario: Detecting stale implementation guides
- **WHEN** running `openspec update`
- **THEN** the system SHALL check for `openspec/changes/IMPLEMENTATION_ORDER.md`
- **AND** flag it as stale if all changes mentioned within it are already present in the archive
