# Agent Capabilities

This document outlines the specialized skills and workflows available to the AI agents within this repository.

## Specialized Skills

These skills extend the agent's core capabilities for specific tasks:

| Skill | Description |
|-------|-------------|
| **openspec-apply-change** | Implement tasks from an OpenSpec change. Used to systematically work through a planned implementation. |
| **openspec-archive-change** | Finalize and archive a completed change, ensuring specifications are updated. |
| **openspec-explore** | A "thinking mode" for brainstorming, architecture review, and problem investigation without making code changes. |
| **openspec-propose** | Rapidly generate a full change proposal, including design and tasks, from a simple description. |

## Workflows (Slash Commands)

Use these commands in chat to trigger specific agent behaviors:

| Command | Purpose |
|---------|---------|
| `/opsx:apply` | Start or continue implementing a planned change. |
| `/opsx:archive` | Close out a completed task and archive the history. |
| `/opsx:explore` | Enter a collaborative thinking space to discuss ideas or debug issues. |
| `/opsx:propose` | Quickly turn an idea into a structured plan ready for implementation. |

### Standardized Naming
All changes SHALL be prefixed with a ZID (timestamp) in the format `YYYYMMDDHHMMSS` (e.g., `20240322174550-add-auth`).

### Cross-Platform Safety
When executing terminal commands (especially on Windows 11), agents SHALL:
- Prefer separate command calls over single-line chained commands.
- Use `;` as a statement separator if chaining is mandatory.
- Avoid Unix-only operators like `&&` or `||` unless in a confirmed compatible shell.

---
*Note: These capabilities are powered by OpenSpec and the specialized `.agent/` configurations.*
