## Context

The OpenSpec project has recently undergone a major architecture shift to a zero-dependency model. To ensure that this transition is fully stabilized, several critical bugs were fixed in the core utilities and the build environment was synchronized. This design documents the methodology for the final verification of these changes.

## Goals / Non-Goals

**Goals:**
- Execute a complete, clean run of the entire OpenSpec test suite.
- Confirm that all 1,320 tests pass without regression.
- Validate that the project-wide configuration (`tsconfig.json` and `package-lock.json`) is in a minimal and functional state.

**Non-Goals:**
- Introducing new features or modifications outside of stabilization.
- Refactoring existing stable code.

## Decisions

- **Test Framework**: Utilize the existing `vitest` infrastructure configured in the project.
- **Verification Level**: A project-wide test run (`npm test`) instead of isolated unit tests to capture integration issues.
- **Environment State**: Perform verification on a clean `node_modules` state (already established in the previous phase).

## Risks / Trade-offs

- **Risk**: Potential for flaky tests in certain environments.
- **Mitigation**: Standardized the environment through version pinning and dependency re-installation.
