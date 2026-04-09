## ADDED Requirements

### Requirement: Zero runtime dependency audit
The system SHALL verify that the `dependencies` object in `package.json` is either empty or entirely absent. Only `devDependencies` SHALL be permitted.

#### Scenario: Verify empty dependencies
- **WHEN** the audit is performed on a compliant `package.json`
- **THEN** it succeeds without finding any production dependencies

### Requirement: Removal of obsolete lockfiles
The system SHALL ensure that any lockfiles associated with removed package managers (e.g., `package-lock.json`, `pnpm-lock.yaml`) are removed from the root directory.

#### Scenario: Clean root directory
- **WHEN** the environment sanitation is performed
- **THEN** only the `package.json` and preferred lockfile (if any) remain
