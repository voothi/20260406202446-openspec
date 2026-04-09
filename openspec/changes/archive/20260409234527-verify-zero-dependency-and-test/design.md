## Context

The OpenSpec project recently transitioned to a zero-dependency architecture. This design outlines the strategy for verifying this transition and testing the system in a clean environment to ensure no hidden dependencies remain.

## Goals / Non-Goals

**Goals:**
- Provide a clear, scripted procedure to verify the absence of runtime dependencies.
- Re-initialize the development environment from scratch to ensure reproducibility.
- Validate the internal YAML parser and other zero-dependency core modules.

**Non-Goals:**
- Modifying the core logic (unless a regression is found).
- Re-introducing any external runtime libraries.

## Decisions

### 1. Manual Audit vs. Automated Tooling
**Decision**: Use `npm list` and `npm test` alongside manual inspection of `package.json`.
**Rationale**: In a zero-dependency project, the simplest way to verify the tree is to inspect it directly. Complex auditing tools are themselves dependencies.

### 2. Deletion Strategy
**Decision**: Use native PowerShell `Remove-Item` for Windows 11 compatibility.
**Rationale**: Ensures reliable deletion of the `node_modules` tree, which can often be problematic on Windows due to deep paths.

## Risks / Trade-offs

- [Risk]: Deleting `node_modules` might fail if files are in use.
  - [Mitigation]: Advise closing any running processes (like the dev server) before execution.
- [Risk]: `npm install` might take a long time on slow connections.
  - [Mitigation]: Document this in the tasks list so the user is aware of the wait time.

## Migration Plan

1. **Phase 1: Audit**: Inspect `package.json`.
2. **Phase 2: Sanitation**: Delete `node_modules` and obsolete lockfiles.
3. **Phase 3: Re-initialization**: Run `npm install` (dev deps only).
4. **Phase 4: Validation**: Rebuild and run tests.
