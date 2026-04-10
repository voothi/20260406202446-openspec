# command-generation Specification

## Purpose
Define tool-agnostic command content and adapter contracts for generating tool-specific OpenSpec command files.
## Requirements
### Requirement: CommandContent interface

The system SHALL define a tool-agnostic `CommandContent` interface for command data.

#### Scenario: CommandContent structure

- **WHEN** defining a command to generate
- **THEN** `CommandContent` SHALL include:
  - `id`: string identifier (e.g., 'explore', 'apply')
  - `name`: human-readable name (e.g., 'OpenSpec Explore')
  - `description`: brief description of command purpose
  - `category`: grouping category (e.g., 'OpenSpec')
  - `tags`: array of tag strings
  - `body`: the command instruction content

### Requirement: ToolCommandAdapter interface
The system SHALL provide install-context-aware command path resolution.

#### Scenario: Adapter interface structure
- **WHEN** implementing a tool adapter
- **THEN** command file path resolution SHALL receive install context (including effective scope and environment context)
- **AND** SHALL return the effective command output path for that context

#### Scenario: Codex global path remains supported
- **WHEN** resolving Codex command paths in global scope
- **THEN** the adapter SHALL target `$CODEX_HOME/prompts` when `CODEX_HOME` is set
- **AND** SHALL otherwise target `~/.codex/prompts`

### Requirement: Command generator function
The command generator SHALL pass install context into adapter path resolution for all generated commands.

#### Scenario: Scoped command generation
- **WHEN** generating commands for a tool with a resolved effective scope
- **THEN** generated command paths SHALL match that effective scope
- **AND** the formatted command body/frontmatter behavior SHALL remain tool-specific and unchanged

### Requirement: CommandAdapterRegistry

The system SHALL provide a registry for looking up tool adapters.

#### Scenario: Get adapter by tool ID

- **WHEN** calling `CommandAdapterRegistry.get('cursor')`
- **THEN** it SHALL return the Cursor adapter or undefined if not registered

#### Scenario: Get all adapters

- **WHEN** calling `CommandAdapterRegistry.getAll()`
- **THEN** it SHALL return array of all registered adapters

#### Scenario: Adapter not found

- **WHEN** looking up an adapter for unregistered tool
- **THEN** `CommandAdapterRegistry.get()` SHALL return undefined
- **AND** caller SHALL handle missing adapter appropriately

### Requirement: Shared command body content

The body content of commands SHALL be shared across all tools.

#### Scenario: Same instructions across tools

- **WHEN** generating the 'explore' command for Claude and Cursor
- **THEN** both SHALL use the same `body` content
- **AND** only the frontmatter and file path SHALL differ

### Requirement: Legacy cleanup for renamed OpenCode command directory

The legacy cleanup module SHALL detect and remove old OpenCode command files from the previous singular `.opencode/command/` directory path.

#### Scenario: Detect old singular-path OpenCode command files

- **WHEN** running legacy artifact detection on a project with files matching `.opencode/command/opsx-*.md` or `.opencode/command/openspec-*.md`
- **THEN** the system SHALL include those files in the legacy slash command files list via `LEGACY_SLASH_COMMAND_PATHS`
- **AND** `LegacySlashCommandPattern.pattern` SHALL accept `string | string[]` to support multiple glob patterns per tool

#### Scenario: Clean up old OpenCode command files on init

- **WHEN** a user runs `openspec init` in a project with old `.opencode/command/` artifacts
- **THEN** the system SHALL remove the old files
- **AND** generate new command files at `.opencode/commands/`

#### Scenario: Auto-cleanup legacy artifacts in non-interactive mode

- **WHEN** a user runs `openspec init` in non-interactive mode (e.g., CI) and legacy artifacts are detected
- **THEN** the system SHALL auto-cleanup legacy artifacts without requiring `--force`
- **AND** legacy slash command files (100% OpenSpec-managed) SHALL be removed
- **AND** config file cleanup SHALL only remove OpenSpec markers (never delete user files)

