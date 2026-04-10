## MODIFIED Requirements

### Requirement: Project Structure
- **FROM**:
```
openspec/
├── project.md              # Project-specific context
├── AGENTS.md               # AI assistant instructions
├── specs/                  # Current deployed capabilities
...
```
- **TO**:
```
openspec/
├── config.yaml             # Manifest, context, and project rules
├── specs/                  # Current deployed capabilities (Source of Truth)
│   └── [capability]/       # Single, focused capability
│       ├── spec.md         # Behavioral contract (WHAT/WHY)
│       └── design.md       # Technical approach (HOW)
├── changes/                # Proposed and transient changes
│   ├── <ZID>-<name>/       # Active change directory
│   └── archive/            # Historical record of merged changes
└── schemas/                # Optional project-local workflow schemas
```

#### Scenario: Alignment with Zero-Dependency Architecture
- **WHEN** inspecting the project root
- **THEN** core instructions SHALL reside in the `.agent/` or `.claude/` directories as skills
- **AND** a managed `AGENTS.md` stub in the root SHALL provide the primary hand-off for AI assistants
- **AND** `openspec/config.yaml` SHALL be the single source of truth for project-level AI context and rules, replacing the legacy `project.md`
