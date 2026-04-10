# ai-tool-paths Specification

## Purpose
Define AI tool path metadata used to generate OpenSpec skills and commands in tool-specific directories.
## Requirements
### Requirement: AIToolOption skillsDir field
The `AIToolOption` interface SHALL include scope support metadata in addition to path metadata.

#### Scenario: Scope support metadata present
- **WHEN** a tool entry is defined in `AI_TOOLS`
- **THEN** it MAY declare supported install scopes for skills and commands
- **AND** this metadata SHALL be used for effective scope resolution

#### Scenario: Scope support metadata absent
- **WHEN** a tool entry in `AI_TOOLS` omits scope support metadata for a surface
- **THEN** resolver behavior SHALL default that surface to project-only support
- **AND** effective scope resolution SHALL apply normal preferred/fallback rules against that default

### Requirement: Path configuration for supported tools
Path metadata SHALL support both project and global install targets via resolver logic.

#### Scenario: Project scope path
- **WHEN** effective scope is `project` for skills
- **THEN** `skillsDir` SHALL be treated as a tool-specific container path under project root
- **AND** managed skill artifacts SHALL be written under `<projectRoot>/<skillsDir>/skills/`
- **AND** tool definitions SHALL set `skillsDir` accordingly (for example `.openspec` -> `.openspec/skills/`)

#### Scenario: Global scope path
- **WHEN** effective scope is `global` for a supported tool/surface
- **THEN** paths SHALL resolve to tool-specific global directories
- **AND** environment overrides (for example `CODEX_HOME`) SHALL be respected where applicable

#### Scenario: Windows global path resolution for Codex commands
- **WHEN** effective scope is `global`
- **AND** tool is Codex
- **AND** platform is Windows
- **THEN** command targets SHALL resolve to `%CODEX_HOME%\prompts` when `CODEX_HOME` is set
- **AND** SHALL otherwise resolve to `%USERPROFILE%\.codex\prompts`

### Requirement: Cross-platform path handling

The system SHALL handle paths correctly across operating systems.

#### Scenario: Path construction on Windows

- **WHEN** constructing skill paths on Windows
- **THEN** the system SHALL use `path.join()` for all path construction
- **AND** SHALL NOT hardcode forward slashes

#### Scenario: Path construction on Unix

- **WHEN** constructing skill paths on macOS or Linux
- **THEN** the system SHALL use `path.join()` for consistency

