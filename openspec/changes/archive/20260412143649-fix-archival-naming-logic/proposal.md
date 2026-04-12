# Proposal: Fix Archival Naming Logic

## Why
Archived changes were sometimes prefixed with a redundant `YYYY-MM-DD` date even when they already had a `YYYYMMDDHHMMSS` (ZID) timestamp. This was caused by hardcoded logic in the agent's workflow and skill templates that did not match the project's ZID naming convention.

## What Changes
We are updating the archiving logic across all templates to correctly handle ZIDs. If a change name already starts with a 14-digit timestamp, it will be preserved as-is during archival. If it does not have a ZID, a date-based prefix will be added to ensure uniqueness.

## Capabilities

### Modified Capabilities
- **cli-archive**: Updated the archival workflow to preserve ZIDs.

## Impact
- **src/core/templates/workflows/archive-change.ts**: Main archival template fixed.
- **src/core/templates/workflows/bulk-archive-change.ts**: Batch archival logic fixed.
- **src/core/templates/workflows/onboard.ts**: Workflow tutorial narration fixed.
- **Project Workspaces**: Local skill files in active projects updated to reflect the consensus logic.
