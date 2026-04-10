## 1. README & Global Docs

- [x] 1.1 Update `README.md` architecture section to highlight Zero-Dependency runtime.
- [x] 1.2 Remove/Update Telemetry section in `README.md` (decommissioned).
- [x] 1.3 Update all `README.md` examples to use the ZID (timestamp) naming convention.
- [x] 1.4 Audit and fix all broken internal links in `README.md` (pointing to missing cli/commands/concepts docs).
- [x] 1.5 Update `AGENTS.md` to ensure AI agent guidance aligns with the new naming standards.

## 2. Docs Folder Refactor

- [x] 2.1 Update `docs/getting-started.md` walkthrough with ZID-compliant examples.
- [x] 2.2 Update `docs/installation.md` with explicit Node.js 20.19.0+ requirements and zero-dependency security notes.
- [x] 2.3 Update `docs/opsx.md` examples and clarify the move away from legacy linear workflows.
- [x] 2.4 Create `docs/reference.md` (consolidating content intended for `cli.md` and `commands.md`) and update redirects.
- [x] 2.5 Audit all other `docs/*.md` files for outdated naming or environment references.

## 3. Verification & Cleanup

- [x] 3.1 Verify all generated skill instructions in `.claude/skills` (or equivalent) use ZID naming.
- [x] 3.2 Run a full link-check on the `docs/` folder.
- [x] 3.3 Ensure the `openspec-conventions` spec sync correctly reflects the new ZID archival path.
