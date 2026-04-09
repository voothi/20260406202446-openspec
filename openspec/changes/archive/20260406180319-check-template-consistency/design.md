# Design: OpenSpec Template Consistency

Standardize ZID placeholders and instruction wording across all core `dist/` templates.

## Goals

- Consistent ZID date prefixes (`2014` → `2026`).
- Identical namespaced-ID-derivation instructions in `propose`, `new-change`, and `ff-change`.
- Alignment with the "skip redundant date" rule for archival operations.
- Correct OPSX command list in the onboarding tutorial.

## Decisions

### Decision 1: Consistent ZID Placeholder
All "derivation" steps will use `20260406181113` as the example ZID. This makes all creative workflows feel like they belong to the same project era.

### Decision 2: Archive Naming Rule
All "archive" related templates will not specify a static `YYYY-MM-DD` prefix. Instead, they will describe the rule: "generate target name using <change-name> (if ZID present) OR YYYY-MM-DD-<change-name>".

### Decision 3: Command List Accuracy
The `onboard.js` command reference will be audited one last time to ensure it lists all current OPSX commands (`propose`, `explore`, `apply`, `archive`, `new`, `continue`, `ff`, `verify`).
