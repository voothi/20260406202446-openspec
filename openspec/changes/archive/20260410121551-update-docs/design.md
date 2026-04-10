## Context

The current documentation is a mix of high-level guides in the root and detailed guides in `docs/`. Essential files referenced in the `README.md` (e.g., `commands.md`, `cli.md`) are currently missing. Furthermore, the codebase has transitioned to a zero-dependency architecture and a mandatory timestamped (ZID) naming convention for changes, neither of which are adequately reflected in the existing documentation.

## Goals / Non-Goals

**Goals:**
- Synchronize all public documentation with the zero-dependency architecture.
- Update all examples to follow the ZID naming standard.
- Fix broken internal documentation links.
- Highlight the security and portability benefits of the new core.

**Non-Goals:**
- A complete rewrite of all documentation content.
- Changing the documentation format or structure beyond necessary updates.
- Implementing new documentation generation tools.

## Decisions

- **Consolidation Strategy**: The missing `commands.md` and `cli.md` will be consolidated into the existing `opsx.md` or a new `docs/reference.md` to reduce file sprawl while ensuring all links remain functional.
- **Example Standard-Prefix**: Use a dummy ZID (`20240322174550`) in all documentation examples to demonstrate the mandatory timestamp format for changes.
- **Privacy Update**: Explicitly state that telemetry has been decommissioned and removed from the codebase.
- **Prerequisite Standardization**: Standardize on **Node.js 20.19.0+** across all guides to align with the core's technical requirements.

## Risks / Trade-offs

- **Risk**: Consolidating files may break existing external deep-links if not handled with redirects or clear headers.
- **Trade-off**: Favoring consolidation into fewer files (like `opsx.md`) increases file size but simplifies maintenance and search.
