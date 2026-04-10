# Reference Guide

This guide provides a comprehensive reference for OpenSpec slash commands and the CLI.

## Slash Commands (Agent Workflows)

Slash commands are the primary way to interact with OpenSpec through your AI coding assistant.

| Command | Purpose | When to use |
|:--- | :--- | :--- |
| `/opsx:propose` | Create a new change | When you have a new idea or requirement to implement. |
| `/opsx:apply` | Implement tasks | When planning is done and you're ready to write code. |
| `/opsx:explore` | Think & investigate | When you're unsure about requirements or architecture. |
| `/opsx:archive` | Close a change | When implementation is verified and you're ready to sync specs. |
| `/opsx:new` | Scaffold only | Expanded workflow: just creates the directory. |
| `/opsx:continue` | Next artifact | Expanded workflow: build planning artifacts one by one. |
| `/opsx:ff` | Fast-forward | Expanded workflow: generate all planning artifacts at once. |
| `/opsx:verify` | Validate code | Expanded workflow: check implementation against specs. |
| `/opsx:sync` | Sync specs | Expanded workflow: manual sync of delta specs to main. |

## CLI Reference

The `openspec` CLI manages the lifecycle of specifications and changes.

### Core Commands

| Command | Description |
| :--- | :--- |
| `openspec init` | Initialize OpenSpec in a project. |
| `openspec update` | Refresh agent instructions and sync configuration. |
| `openspec list` | List all active and archived changes. |
| `openspec status` | Show the status of current artifacts for a change. |
| `openspec show <name>` | Display detailed information about a specific change. |
| `openspec validate` | Validate the structure and integrity of a change. |

### Schema & Workflow Tuning

| Command | Description |
| :--- | :--- |
| `openspec config` | Configure project settings or user profiles. |
| `openspec schemas` | List available workflow schemas. |
| `openspec schema fork` | Customize an existing schema for your project. |

## Core Concepts

### Specifications (Specs)
Specs are markdown files that document the **required behavior** of your system. They use a structured format (`Requirement` / `Scenario`) that is both human-readable and machine-parseable.

### Changes
Every modification to your system starts as a **Change**. A change has its own lifecycle and directory, containing a `proposal.md`, `design.md`, and `tasks.md`.

### Delta Specs
Instead of editing main specs directly, you write **Delta Specs** inside your change folder. These define exactly what is being `ADDED`, `MODIFIED`, or `REMOVED`. When you archive a change, these deltas are automatically merged into the main specs.

## Conventions

### Naming (ZID)
All changes are prefixed with a **ZID (Zero ID)**, which is a timestamp in `YYYYMMDDHHMMSS` format.
Example: `20260410121551-update-docs`

### Directory Structure
- `openspec/specs/`: The source of truth for your system's current behavior.
- `openspec/changes/`: Ongoing work, organized by ZID-prefixed folders.
- `openspec/changes/archive/`: Historical record of all completed changes.

## Security & Privacy
- **Zero-Dependency**: OpenSpec runs with zero runtime dependencies.
- **Privacy-First**: Telemetry is entirely removed. No data ever leaves your machine.
