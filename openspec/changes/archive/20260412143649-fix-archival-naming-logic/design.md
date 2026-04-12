# Design: Fix Archival Naming Logic

## Context
The project uses a 14-digit timestamp (ZID) for change names. The agent's archiving workflow was incorrectly adding a second date prefix (YYYY-MM-DD-) even when a ZID was already present, leading to redundant names like `2026-04-12-20260412...`.

## Goals
- Preserve ZIDs in archive directory names.
- Ensure consistent logic between CLI implementation and Agent instructions.
- Fix existing workflows and skills across all project workspaces.

## Decisions

### Decision 1: Intelligent Target Naming
We will update Agent instructions to use a conditional naming strategy:
- If name matches `^\d{14}-`, use name as-is.
- Otherwise, prefix with `YYYY-MM-DD-`.

This matches the logic already implemented in the core CLI (`src/core/archive.ts`).

### Decision 2: Source Template Refactoring
All `SkillTemplate` and `CommandTemplate` definitions in the source code will be updated to remove hardcoded `YYYY-MM-DD` strings in the instruction bodies. These will be replaced with semantic descriptions of the target naming logic.

### Decision 3: Cross-Project Synchronization
Active workspaces (`kardenwort-mpv`) will have their local `.agent/` instructions patched to ensure immediate correctness without waiting for a re-distribution of the CLI.
