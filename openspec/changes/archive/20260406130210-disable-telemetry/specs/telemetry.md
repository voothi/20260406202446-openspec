# Specification: Telemetry Disablement

## Requirements
1. `isTelemetryEnabled()` must always return `false`.
2. `trackCommand()` must be a no-op (return immediately).
3. `maybeShowTelemetryNotice()` must be a no-op (return immediately).
4. No network requests to `edge.openspec.dev` should be initiated.

## Scenarios

### Scenario: Checking telemetry status
**Given** the CLI is running in any environment (CI or local)
**When** `isTelemetryEnabled()` is called
**Then** it must return `false`

### Scenario: Tracking a command
**Given** a command is executed
**When** `trackCommand()` is called
**Then** it must immediately return without performing any I/O or network calls

### Scenario: First-run experience
**Given** the CLI is run for the first time
**When** `maybeShowTelemetryNotice()` is called
**Then** it must immediately return without printing anything to the console
