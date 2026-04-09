# Design: Fix Optional Artifact Status Resolution

## Context
OpenSpec traditionally tracks phase completion securely through absolute validation of dependencies and matched generated file globs. When migrating to a zero-dependency architecture, all core dependencies such as `zod` and `yaml` were swapped for manual parsers and iterators. A regression occurred wherein empty or skipped checkpoints incorrectly warned `/opsx-archive` users of incomplete artifacts simply because the zero-dependency pipeline did not officially recognize an "optional" feature flag on glob matrices.

## Goals / Non-Goals
- **Goals**: Create an `optional` status attribute natively accessible by schema JSON output nodes. Retrofit the zero-dependency YAML engine to support Block Scalars without disrupting memory parsing.
- **Non-Goals**: We explicitly intend to preserve OpenSpec's tight constraint dependencies without overriding core tracking constraints structurally.

## Decisions
1. **Extend Schema Node Metadata**: By directly mapping `optional?: 'boolean'` inside `types.js`, the default `schema.yaml` logic can now strictly attach `optional: true` variables mapping them securely down to `status.json` states.
2. **Override Status JSON Flags**: By modifying `instruction-loader.js` and `graph.js` to officially bypass blockations on `.optional` endpoints, workflows cleanly read `"done"` skipping false positive warnings immediately.

## Risks / Trade-offs
- **Risk**: Optional items bypassing evaluation loops too early. → **Mitigation**: We exclusively force evaluation against `context.graph.isComplete(context.completed)` to check if the downstream pipeline (`tasks.md`) has been safely addressed before surfacing a successful bypass.

## Migration Plan
The update leverages zero-dependency patches entirely enclosed inside `dist/` libraries. None of the users' existing `.md` configuration structures are at risk.
