## Why

Trust in the software supply chain is at an all-time low. Each external dependency, however small, represents a potential attack vector from malicious actors or compromised maintainers. To ensure the highest level of safety for OpenSpec users and the AI agents that operate it, we will transition the project to have **ZERO** external runtime dependencies. This move eliminates entire classes of supply chain attacks.

## What Changes

This is a fundamental shift in the project's architecture. We will:
1. **Remove ALL third-party dependencies** from `package.json` (except for dev-only tools).
2. **Re-implement essential logic** (YAML parsing, command routing, globbing, schema validation) using native Node.js APIs or single-file, manually-vetted implementations.
3. **Adopt a "Zero-Trust Supply Chain" policy**: No external code will be executed at runtime unless it is part of the Node.js standard library.

## Capabilities

### New Capabilities
- `zero-dependency-core`: A core engine that performs all specification management without external libraries.
- `manual-yaml-parser`: A minimal, safe YAML parser for reading `.openspec.yaml` and other spec files.
- `manual-cli-router`: A basic command-line argument parser for managing and routing OpenSpec commands.
- `manual-glob-engine`: A minimal glob implementation for locating change files and specs.

### Modified Capabilities
- `dependency-safety`: Upgrading from "minimizing" to "eliminating" external dependencies entirely.

## Impact

The project will move to an extremely lean footprint. Transitive dependency count will drop to zero. The build process may become simpler, but the maintenance burden for core utilities will increase as they are now part of the internal codebase. This establishes OpenSpec as a uniquely secure tool for high-trust environments.
