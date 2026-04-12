# Capability: cli-archive

## ADDED Requirements

### Requirement: ZID Preservation
The archiver SHALL detect if a change directory name starts with a 14-digit timestamp (ZID). If so, it SHALL NOT add an additional date prefix during archival.

#### Scenario: Archiving change with ZID
- **WHEN** archiving a change named `20260412131945-smooth-nav-repeat`
- **THEN** the archive directory target SHALL be `openspec/changes/archive/20260412131945-smooth-nav-repeat/`

#### Scenario: Archiving change without ZID
- **WHEN** archiving a change named `fix-startup-nav-latency` (lacks ZID)
- **THEN** the archive directory target SHALL be `openspec/changes/archive/2026-04-12-fix-startup-nav-latency/` (using current date prefix)
