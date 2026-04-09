## Why

The current implementation collects anonymous usage statistics (commands executed, version). The user has requested to disable this telemetry collection entirely, likely for privacy or compliance reasons.

## What Changes

- **Modify `isTelemetryEnabled()`**: Change the implementation to always return `false`. This ensures telemetry is inactive regardless of environment settings.
- **Stub `trackCommand()`**: Ensure the command tracking logic is completely bypassed.
- **Disable `maybeShowTelemetryNotice()`**: Stop showing the telemetry notice to users since data is no longer being collected.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- None

## Impact

- **Telemetry**: All data collection is terminated. No network requests will be made to the telemetry backend.
- **User Interface**: The first-run telemetry notice will be removed.
- **Dependencies**: The `posthog-node` client will no longer be initialized or used.
