# Specification: Dependency Pinning

## ADDED Requirements

### Requirement: Exact Production Dependencies
The system SHALL ensure all production `dependencies` in `package.json` are specified as exact versions, without any range prefixes like `^` or `~`.

#### Scenario: Pinning a production dependency
- **WHEN** a new dependency is added or an existing one is updated
- **THEN** it MUST be recorded in `package.json` with an exact version string (e.g., "1.2.3")

### Requirement: Exact Development Dependencies
The system SHALL ensure all `devDependencies` in `package.json` are specified as exact versions.

#### Scenario: Pinning a dev dependency
- **WHEN** a devDependency is added
- **THEN** it MUST be recorded in `package.json` without version ranges
