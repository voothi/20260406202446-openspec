# telemetry Specification

## Purpose

This spec defines the permanent no-op status of the telemetry module. Following the zero-dependency and privacy hardening initiative, all analytics collection, external tracking libraries (e.g. PostHog), and user identification mechanisms have been permanently removed. The module exists only as a stub to maintain API compatibility for existing callers.

## Requirements

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
