# Proposal: OpenSpec Template Consistency Check

Standardize all workflow templates in the `dist/` directory to ensure consistent ZID (timestamp) naming examples and reflect recent project-wide improvements.

## Why

As the project evolves, various workflow templates have diverged in their examples and instructions. Specifically, older templates still use `2024` timestamps and mandatory `YYYY-MM-DD` prefixes for archival, which contradicts the new "no redundant date if ZID is present" rule. Standardizing these ensures a better onboarding experience and consistent behavior for all future projects.

## What Changes

- Update all ZID placeholder examples from `2024` to `2026`.
- Standardize the instructions for deriving namespaced change IDs across `propose`, `new-change`, and `ff-change`.
- Ensure `archive-change` and `bulk-archive-change` templates correctly describe the conditional naming logic.
- Audit `onboard.js` for overall command and naming consistency.

## Capabilities

### Modified Capabilities
- `openspec-propose`: Improved example ZIDs.
- `openspec-new-change`: Improved example ZIDs and standardized instructions.
- `openspec-ff-change`: Improved example ZIDs and standardized instructions.
- `openspec-archive-change`: Standardized naming logic description.
- `openspec-onboard`: Updated tutorial text for consistency.

## Impact

- `dist/core/templates/workflows/*.js`: Core template files providing instructions and examples for all OPSX workflows.
