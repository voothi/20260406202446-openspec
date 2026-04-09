## 1. Schema Updating
- [x] 1.1 Insert `optional?` property into `ArtifactSchema` definitions inside `types.js`.
- [x] 1.2 Enable `optional: true` mappings for `specs` and `design` checkpoints in `schemas\spec-driven\schema.yaml`.

## 2. Graph Pipeline Upgrades
- [x] 2.1 Refactor the `yaml-parser.js` custom AST reader to accurately support deep scalar nested arrays.
- [x] 2.2 Incorporate Block Scalar `|` parsing mechanics handling recursive values natively.
- [x] 2.3 Modify runtime JSON formatting properties inside `instruction-loader.js` to replace evaluated `"ready"` bypass mappings with securely resolved `"done"` statuses safely ignoring false LLM archiving warnings entirely.
