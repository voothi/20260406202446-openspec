# Proposal: Fix Optional Artifact Status Resolution

## Why
When closing out experimental changes that involved primarily runtime testing with no spec modifications, the `opsx-archive` workflow warned that an artifact (`specs`) was incomplete. This occurred because `specs/**/*.md` was strictly evaluated for matches on disk. However, the changes contained no added capabilities or modified requirements. The toolchain did not officially support identifying workflow states like `specs` or `design` as structurally optional, which forced `opsx-archive` and future agent workflows to incorrectly conclude the user failed to complete the implementation logic.

## What Changes
- Add internal OpenSpec configuration flags natively extending the `ArtifactSchema` to accept `optional?: boolean`.
- Retrofit the zero-dependency YAML parsing AST builder (`yaml-parser.js`) to support deep property block-scalars and root keys explicitly mapping to nested artifacts accurately.
- Upgrade `graph.js` and `state.js` evaluators to accurately ignore skipped components when evaluating overarching `.isComplete(...)` loops.
- Alter the core `spec-driven` workflow YAML definitions marking both `specs` and `design` checkpoints as natively optional by default.

## Capabilities
No new capabilities are associated with these changes; this is entirely internal to the architecture routing pipeline configuration.

## Impact
This change resolves `/opsx-archive` false-positive warnings without introducing dependencies or structurally redefining how strict required tracking works for `tasks.md` and downstream generation.
