## Why

The project has undergone significant architectural changes, specifically the transition to a Zero-Dependency runtime and the adoption of the ZID (timestamped) naming convention. Current documentation is outdated, reflecting legacy patterns and missing files referenced in the `README.md`. This update ensures that users and AI agents have an accurate understanding of the system's security posture and project structure.

## What Changes

- **README.md Synchronization**: Update the main README to reflect the zero-dependency architecture, the removal of telemetry, and the new Node.js 20.19.0+ requirement.
- **Example Standard-Naming**: Update all documentation examples (`add-dark-mode`) to follow the ZID naming convention (`<YYYYMMDDHHMMSS>-<name>`).
- **Broken Link Remediation**: Resolve broken links to `commands.md`, `cli.md`, and `concepts.md` by either creating these guides or consolidating them into `opsx.md`.
- **Installation & Getting Started**: Explicitly mention the portability and security benefits of the zero-dependency core in the installation guides.

## Capabilities

### New Capabilities
- `unified-documentation-guides`: Centralizing disparate documentation into a coherent, linked guide system.

### Modified Capabilities
- `telemetry`: Reflecting the decommissioned status of anonymous usage tracking.
- `docs-agent-instructions`: Ensuring AI agent guidance accurately reflects the new zero-dependency and naming requirements.

## Impact

- Improved clarity for new users and contributors.
- Consistent AI agent behavior when proposing and implementing changes.
- Accurate representation of the project's security and privacy profile.
