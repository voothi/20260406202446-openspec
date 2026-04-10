## MODIFIED Requirements

### Requirement: Telemetry is permanently disabled
The `src/telemetry/index.ts` module SHALL be a zero-dependency stub where `isTelemetryEnabled()` always returns `false`, `trackCommand()` is a no-op, `maybeShowTelemetryNotice()` is a no-op, and `shutdown()` is a no-op. No analytics library SHALL be imported or called at any time.

#### Scenario: isTelemetryEnabled always returns false
- **WHEN** `isTelemetryEnabled()` is called with any combination of environment variables
- **THEN** it MUST return `false`

#### Scenario: trackCommand is a no-op
- **WHEN** `trackCommand('init', '1.0.0')` is called
- **THEN** no network request is made and no external library is invoked

#### Scenario: maybeShowTelemetryNotice is a no-op
- **WHEN** `maybeShowTelemetryNotice()` is called
- **THEN** nothing is printed to stdout and no config file is read or written

#### Scenario: shutdown is a no-op
- **WHEN** `shutdown()` is called before CLI exit
- **THEN** it resolves immediately without error

### Requirement: No anonymous ID is generated or persisted
The system SHALL NOT generate, store, or return a real anonymous ID. `getOrCreateAnonymousId()` SHALL return the string `'disabled'` without reading or writing any config file.

#### Scenario: getOrCreateAnonymousId returns disabled
- **WHEN** `getOrCreateAnonymousId()` is called
- **THEN** it MUST return the string `'disabled'`

#### Scenario: No config write
- **WHEN** `getOrCreateAnonymousId()` is called on a fresh install
- **THEN** no telemetry config file is created or modified

## REMOVED Requirements

### Requirement: Command execution tracking
**Reason**: All analytics collection has been removed as part of the zero-dependency and privacy hardening initiative. PostHog integration has been fully removed.
**Migration**: N/A — this is a server-side analytics removal. No client migration required.

### Requirement: Privacy-preserving event design
**Reason**: No events are sent at all; privacy-by-default is achieved by complete removal.
**Migration**: N/A

### Requirement: Environment variable opt-out
**Reason**: Telemetry is permanently disabled; opt-out env vars are no longer checked.
**Migration**: Scripts or CI configs that set `OPENSPEC_TELEMETRY=0` can remove that variable without effect.

### Requirement: CI environment auto-disable
**Reason**: Telemetry is permanently disabled; CI detection is no longer needed.
**Migration**: N/A

### Requirement: First-run telemetry notice
**Reason**: No telemetry is collected, so no notice is required.
**Migration**: N/A

### Requirement: Anonymous user identification
**Reason**: No events are sent so no ID is needed or generated.
**Migration**: Existing `anonymousId` values in global config are inert and can be ignored.

### Requirement: Immediate event sending
**Reason**: No events are sent.
**Migration**: N/A

### Requirement: Graceful shutdown
**Reason**: No PostHog client is initialized, so no shutdown flush is needed.
**Migration**: Callers of `shutdown()` do not need to be updated — the stub is a no-op.

### Requirement: Silent failure handling
**Reason**: No network calls are made, so there is nothing to fail silently.
**Migration**: N/A
