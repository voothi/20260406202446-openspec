<p align="center">
  <a href="https://github.com/voothi/20260406202446-openspec">
    <picture>
      <source srcset="assets/openspec_bg.png">
      <img src="assets/openspec_bg.png" alt="OpenSpec logo">
    </picture>
  </a>
</p>

# OpenSpec (Zero-Dependency Fork)

[![Version](https://img.shields.io/badge/version-v1.4.10-blue)](https://github.com/voothi/20260406202446-openspec/releases) 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 
[![CI](https://github.com/voothi/20260406202446-openspec/actions/workflows/ci.yml/badge.svg)](https://github.com/voothi/20260406202446-openspec/actions/workflows/ci.yml)
[![Discord](https://img.shields.io/discord/1411657095639601154?style=flat-square&logo=discord&logoColor=white&label=Discord&suffix=%20online)](https://discord.gg/YctCnvvshC)

This fork of OpenSpec represents a high-security, high-traceability evolution of the spec-driven development framework, specifically optimized for agentic coding.

### 🛡️ Remarkable Features

- **Zero-Dependency Runtime** — A "Zero-Trust Supply Chain" architecture with **zero** external npm dependencies in production for maximum security and portability.
- **ZID-Based Traceability** — Deep timeline integration using 14-digit timestamps (ZIDs), linking every action across Git commits, conversation logs, and activity streams.
- **Windows 11 & Agent Safety** — Formalized operation standards in `AGENTS.md` specifically optimized for modern Windows development and cross-platform reliability.
- **Privacy-First** — Permanent removal of all telemetry and tracking. Your code and data stay entirely within your local environment.
- **Hardened YAML Engine** — A custom, zero-dependency YAML parser designed for resilience and strict type safety against complex edge cases.
- **Base Foundation** — Evolved from the original OpenSpec **v1.2.0** (commit `1e94443`), modernizing the core for zero-dependency portability.

Our philosophy:

```text
→ fluid not rigid
→ iterative not waterfall
→ easy not complex
→ built for brownfield not just greenfield
→ scalable from personal projects to enterprises
```

> [!TIP]
> **New workflow now available!** We've rebuilt OpenSpec with a new artifact-guided workflow.
>
> Run `/opsx:propose "your idea"` to get started. → [Learn more here](docs/opsx.md)

<p align="center">
  Follow <a href="https://x.com/0xTab">@0xTab on X</a> for updates · Join the <a href="https://discord.gg/YctCnvvshC">OpenSpec Discord</a> for help and questions.
</p>

### Teams

Using OpenSpec in a team? [Email here](mailto:teams@openspec.dev) for access to our Slack channel.

<!-- TODO: Add GIF demo of /opsx:propose → /opsx:archive workflow -->

## See it in action

```text
You: /opsx:propose 20240322174550-add-dark-mode
AI:  Created openspec/changes/20240322174550-add-dark-mode/
     ✓ proposal.md — why we're doing this, what's changing
     ✓ specs/       — requirements and scenarios
     ✓ design.md    — technical approach
     ✓ tasks.md     — implementation checklist
     Ready for implementation!

You: /opsx:apply
AI:  Implementing tasks...
     ✓ 1.1 Add theme context provider
     ✓ 1.2 Create toggle component
     ✓ 2.1 Add CSS variables
     ✓ 2.2 Wire up localStorage
     All tasks complete!

You: /opsx:archive
AI:  Archived to openspec/changes/archive/20240322174550-add-dark-mode/
     Specs updated. Ready for the next feature.
```

<details>
<summary><strong>OpenSpec Dashboard</strong></summary>

<p align="center">
  <img src="assets/openspec_dashboard.png" alt="OpenSpec dashboard preview" width="90%">
</p>

</details>

## Installation & Setup

### 1. Standard Installation (Global)

Requires **Node.js 20.19.0** or higher.

```bash
npm install -g @fission-ai/openspec@latest
```

### 2. Fork Development & Mirroring

This fork uses a **Distribution Mirror** workflow to isolate production artifacts from development dependencies, ensuring a pure zero-dependency runtime.

1.  **Clone and Build**:
    ```bash
    git clone https://github.com/voothi/20260406202446-openspec.git
    cd 20260406202446-openspec
    npm install
    ```

2.  **Assemble the Distribution**:
    Run the synchronization pipeline to build the project, create the mirror, and install system shims:
    ```bash
    # Assembles everything into ./openspec-fork and deploys shims
    npm run sync:all
    ```

3.  **Dynamic Switching (Environment Variables)**:
    The system shims act as smart proxies. You can toggle between your global stable version and this local fork mirror by setting the `USE_OPENSPEC_FORK` variable.

    **Windows PowerShell**:
    ```powershell
    $env:USE_OPENSPEC_FORK = "true"   # Use local zero-dep fork
    $env:USE_OPENSPEC_FORK = "false"  # Use global stable
    ```

    **Windows CMD**:
    ```cmd
    set USE_OPENSPEC_FORK=true
    ```

### 3. Initialize OpenSpec

Navigate to your project directory and initialize:

```bash
cd your-project
openspec init
```

Now tell your AI: `/opsx:propose <what-you-want-to-build>`

> [!TIP]
> To verify which version you are running, use `openspec --version`. If the fork is active, it will reflect the latest fork version (currently **1.4.10**).

> [!NOTE]
> Not sure if your tool is supported? [View the full list](docs/supported-tools.md) – we support 24+ tools and growing.
>
> Also works with pnpm, yarn, bun, and nix. [See installation options](docs/installation.md).

## Docs

→ **[Getting Started](docs/getting-started.md)**: first steps<br>
→ **[Workflows](docs/workflows.md)**: combos and patterns<br>
→ **[Reference](docs/reference.md)**: CLI and command reference<br>
→ **[Supported Tools](docs/supported-tools.md)**: tool integrations & install paths<br>
→ **[Multi-Language](docs/multi-language.md)**: multi-language support<br>
→ **[Customization](docs/customization.md)**: make it yours


## Why OpenSpec?

AI coding assistants are powerful but unpredictable when requirements live only in chat history. OpenSpec adds a lightweight spec layer so you agree on what to build before any code is written.

- **Agree before you build** — human and AI align on specs before code gets written
- **Zero-Trust Supply Chain** — zero runtime dependencies for maximum security and portability
- **Stay organized** — each change gets its own folder with ZID-prefixed proposal, specs, design, and tasks
- **Work fluidly** — update any artifact anytime, no rigid phase gates
- **Use your tools** — works with 24+ AI assistants via slash commands

### How we compare

**vs. [Spec Kit](https://github.com/github/spec-kit)** (GitHub) — Thorough but heavyweight. Rigid phase gates, lots of Markdown, Python setup. OpenSpec is lighter and lets you iterate freely.

**vs. [Kiro](https://kiro.dev)** (AWS) — Powerful but you're locked into their IDE and limited to Claude models. OpenSpec works with the tools you already use.

**vs. nothing** — AI coding without specs means vague prompts and unpredictable results. OpenSpec brings predictability without the ceremony.

## Updating OpenSpec

**Upgrade the package**

```bash
npm install -g @fission-ai/openspec@latest
```

**Refresh agent instructions**

Run this inside each project to regenerate AI guidance and ensure the latest slash commands are active:

```bash
openspec update
```

## Usage Notes

**Model selection**: OpenSpec works best with high-reasoning models. We recommend Opus 4.5 and GPT 5.2 for both planning and implementation.

**Context hygiene**: OpenSpec benefits from a clean context window. Clear your context before starting implementation and maintain good context hygiene throughout your session.

## Contributing

**Small fixes** — Bug fixes, typo corrections, and minor improvements can be submitted directly as PRs.

**Larger changes** — For new features, significant refactors, or architectural changes, please submit an OpenSpec change proposal first so we can align on intent and goals before implementation begins.

When writing proposals, keep the OpenSpec philosophy in mind: we serve a wide variety of users across different coding agents, models, and use cases. Changes should work well for everyone.

**AI-generated code is welcome** — as long as it's been tested and verified. PRs containing AI-generated code should mention the coding agent and model used (e.g., "Generated with Claude Code using claude-opus-4-5-20251101").

### Development

- Install dependencies: `npm install`
- Build: `npm run build`
- Test: `npm test`
- Develop CLI locally: `npm run dev` or `npm run dev:cli`
- Conventional commits (one-line): `type(scope): subject`

### Distribution Mirror & Security

To maintain a secure, "Zero-Dependency" runtime when developing from a local fork, use the **Distribution Mirror** workflow. This isolates runtime artifacts from development dependencies.

1.  **Prepare the Mirror**:
    ```bash
    # Rebuilds and copies essential files to ./dist-release/
    npm run sync:release
    ```

2.  **Dynamic Switching**:
    Users can toggle between their stable global OpenSpec and the local fork mirror using a **Switcher Script**. Set the following environment variable in your terminal (or permanently in Windows):
    ```bash
    # Windows PowerShell
    $env:USE_OPENSPEC_FORK = "true"
    ```

3.  **Deploy System Shims**:
    To automatically install/update your global switcher scripts from the project templates:
    ```bash
    npm run sync:shims
    ```
    
    To update everything (build, mirror, and shims) in one go:
    ```bash
    npm run sync:all
    ```

3.  **Global Installation**:
    To update your global stable installation directly from your fork (for a clean, non-linked install):
    ```bash
    npm run sync:global
    ```

## Other

<details>
<summary><strong>Telemetry</strong></summary>

OpenSpec does **not** collect any usage stats or anonymous telemetry.

Following our zero-dependency and privacy hardening initiative, all analytics collection, external tracking libraries, and user identification mechanisms have been permanently removed from the codebase.

</details>

<details>
<summary><strong>Maintainers & Advisors</strong></summary>

See [MAINTAINERS.md](MAINTAINERS.md) for the list of core maintainers and advisors who help guide the project.

</details>



## License

MIT
