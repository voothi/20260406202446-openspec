# Design: Disable Telemetry

## Overview
This change aims to completely disable telemetry collection in the OpenSpec CLI. Telemetry is currently used for anonymous usage statistics (command names, versions).

## Scope
Modified functions in `dist/telemetry/index.js`:
- `isTelemetryEnabled()`: Forced to `false`.
- `trackCommand()`: Stubbed to do nothing.
- `maybeShowTelemetryNotice()`: Stubbed to do nothing.

## Security & Privacy
This change enhances privacy by ensuring no data is sent to external services (PostHog). No network requests will be initiated for telemetry.

## Performance
Minor performance improvement by avoiding UUID generation and network overhead.
