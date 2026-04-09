## Context

Current dependencies (`commander`, `yaml`, `zod`, `fast-glob`, `zod`, etc.) provide essential services but represent an uncontrolled supply chain risk. Replacing them with internal logic ensures the code is 100% auditable and safe.

## Goals / Non-Goals

- **Goal**: REMOVE every runtime dependency in `package.json`'s `dependencies` section.
- **Goal**: SUSTAIN core functionality (`new`, `status`, `instructions`, `apply`, `archive`) using only Node.js standard libraries (`fs`, `path`, `crypto`, `readline`, `process`).
- **Non-Goal**: We will KEEP devDependencies for build and testing, as these do not impact the runtime safety of the production code.

## Decisions

### Decision 1: Built-in Command-Line Parsing (CLI Router)
- **Alternative**: Use `commander.js`. (Rejecting due to supply chain trust).
- **Rationale**: We will implement a `dist/core/router.js` that iterates over `process.argv` to match commands and extract options (e.g., `--change`, `--json`). This is a small, manageable amount of code for our current CLI complexity.

### Decision 2: Minimal YAML and JSON Parser
- **Alternative**: Use `yaml` and `json5`. (Rejecting).
- **Rationale**: We will build a simple YAML extractor that looks for `key: value` pairs using RegEx or basic string splitting. For our use case, we don't need a full-spec YAML parser.

### Decision 3: Native Recursive Directory Walking
- **Alternative**: Use `fast-glob`. (Rejecting).
- **Rationale**: `fs.readdirSync(..., { recursive: true })` in Node.js >= 18.x provides basic recursive capabilities. For older versions or more complex glob patterns, we will implement a simple recursive walk function in `dist/core/fs-utils.js`.

### Decision 4: Basic Schema Validation
- **Alternative**: Use `zod`. (Rejecting).
- **Rationale**: We'll create a lightweight `dist/core/validate.js` that checks for required properties and basic types in our internal data structures.

## Risks / Trade-offs

- [Risk] Performance loss on large file trees → Mitigation: Audit and optimize our manual glob walker.
- [Risk] YAML parsing errors on complex formats → Mitigation: Standardize our internal `.openspec.yaml` format to stay within the limits of our manual parser.
- [Risk] Maintenance overhead → Mitigation: Keep the manual implementations as small and documented as possible.

## Migration Plan

1. **Step 1**: Prune all runtime dependencies from `package.json`.
2. **Step 2**: Implement the `dist/core` zero-dependency engine.
3. **Step 3**: Rewrite `dist/index.js` and `bin/openspec.js` to point to the new engine.
4. **Step 4**: Verify all features through automated and manual tests.
5. **Step 5**: Clean `node_modules` and confirm a zero-dependency runtime state.

## Open Questions

- Should we also try to remove the Node.js requirement in favor of a standalone binary?
- How do we handle complex globbing patterns without a full `minimatch` implementation?
