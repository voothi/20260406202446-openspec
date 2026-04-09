# Proposal: Fix OpenSpec Templates for Namespaced ZID

## Goal
The goal is to ensure that when a new project is initialized with `openspec` (or a new change is started using the experimental workflows), it already includes the fixes for namespaced change IDs (using a ZID prefix). This avoids the need for manual updates to `.agent` files in every new project.

## Why
Currently, the templates for `.agent` workflows in the `openspec` tool use a simple kebab-case naming scheme. However, best practices (and the recently implemented fixes in this repository) require a namespaced ZID prefix for change directories to avoid collisions and provide better organization. By updating the templates, we ensure all future projects benefit from this change without manual intervention.

## What
We will update the following template files in the `openspec` tool:
- `dist/core/templates/workflows/propose.js`
- `dist/core/templates/workflows/new-change.js`
- `dist/core/templates/workflows/ff-change.js`

In each of these templates, the instruction for deriving a change name will be updated from:
`From their description, derive a kebab-case name`
to:
`From their description, derive a namespaced name: <ZID>-<kebab-case-name>, where ZID is the current timestamp in YYYYMMDDHHMMSS format` (and similar placeholders as appropriate).
