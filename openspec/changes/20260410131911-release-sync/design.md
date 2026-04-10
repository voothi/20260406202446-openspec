## Context

Currently, developers and agents who dogfood OpenSpec from a local fork are often running it directly from the project root via `npm link`. This root directory contains `@types`, `eslint`, `vitest`, and other development-only dependencies. For secure agentic workflows and to maintain the "Zero-Dependency" runtime promise, we need a "Distribution Mirror" that isolates just the production artifacts.

## Goals / Non-Goals

**Goals:**
- Provide a clean, runtime-only directory (`dist-release/`) for execution.
- Automate the mirroring of essential files (`dist`, `bin`, `schemas`, `package.json`).
- Enable live development via junctions while maintaining isolation.

**Non-Goals:**
- Removing development dependencies from the root `node_modules`.
- Automating the `mklink` (junction) creation (this remains a manual system setup step).

## Decisions

### 1. Mirroring Strategy: Selective Copying
We will use a Node.js script (`scripts/release-sync.js`) to selectively copy only the files defined in the `files` field of `package.json`.
- **Rationale**: This ensures the mirror directory exactly matches what would be included in an `npm pack` or `npm publish` operation, without the overhead of creating a `.tgz` file.
- **Tools**: `fs.cpSync` with `recursive: true`.

### 2. Integration: NPM Script
A new script `npm run sync:release` will be added.
- **Rationale**: Standardizes the build-and-mirror workflow for developers. It will chain `npm run build` with the sync script.

### 3. Dynamic Version Switching (Proxy Script)
Instead of replacing the global binary, we will implement a "Smart Switcher" script.
- **Mechanism**: A `.ps1` or `.cmd` wrapper script placed in the global path that checks for the `USE_OPENSPEC_FORK` environment variable.
- **Persistence**: For cross-session reliability (especially for AI agents), the variable should be set as a **Permanent Windows User Variable** (via System Properties > Environment Variables).
- **Logic**: 
  - If `USE_OPENSPEC_FORK` is `"true"`, it launches the binary from the `dist-release` folder.
  - Otherwise, it launches the binary from a "Stable Backup" folder (`openspec-stable`).
- **Rationale**: This allows agents to use the fixed command name `openspec` while providing the developer with an instant "Toggle" without manual file copying.

### 4. Git Exclusion
The `dist-release/` folder will be added to `.gitignore`.
- **Rationale**: Prevents accidental commits of built artifacts and ensures the mirror is ephemeral and local to the developer's machine.

## Risks / Trade-offs

- **Risk: Out-of-Sync Mirror** → Mitigation: Developers should be encouraged to use `npm run dev` or a watcher that triggers the sync script.
- **Risk: Permissions on Junction** → Mitigation: Document that `mklink /J` might require Administrative privileges on Windows.
- **Trade-off: Disk Space** → The mirror duplicates the `dist` folder, but given the small size of the OpenSpec distribution (< 2MB), this is negligible.
