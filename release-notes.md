# Release Notes - v1.4.10

**Date:** 2026-05-11  
**Version:** 1.4.10

## Summary

This release focuses on hardening the core YAML parsing engine, normalizing internal specifications, and extending official support to the **RooCode** AI assistant.

## Key Changes

### 🛠️ Core & Stability
- **YAML Parser Hardening**: Implemented null-safe property existence checks in the custom zero-dependency parser. This resolves a `TypeError` that could occur when parsing complex YAML structures with unexpected types.
- **Config Loading Resilience**: Improved the configuration loader to handle parser errors gracefully. Users now receive descriptive warnings instead of runtime crashes when project configuration files contain malformed YAML.
- **Test Parity Synchronisation**: Synchronized canonical template hashes in the regression suite to match the latest implementation. Achieved 100% test pass rate across the full validation pipeline.

### 🤖 Tool Integrations
- **RooCode Support**: Added official support for RooCode. OpenSpec now automatically configures `.roo/skills/` and `.roo/commands/` directories during initialization and updates.

### 📝 Specification Normalization
- **Requirement Audit**: Completed a comprehensive audit of all core specifications in `openspec/specs/`.
- **TBD Cleanup**: Replaced all remaining `TBD` placeholders with verified purpose descriptions and finalized requirements.
- **Heading Normalization**: Standardized heading hierarchies across all spec files for better AI readability and structural consistency.

## Installation

```bash
npm install -g @fission-ai/openspec@latest
```

After updating, run `openspec update` in your projects to refresh agent instructions and tool configurations.

---

# Version History

## v1.4.6
**Date:** 2026-04-12
- **YAML Parser Hardening**: Improved robustness against block scalar edge cases and finalized state transitions.
- **Standardized Archival Naming**: Unified archival logic to preserve 14-digit ZIDs in directory names, avoiding redundant date prefixes.
- **Cross-Platform Agent Safety**: Formalized standards in `AGENTS.md` for terminal operations, optimized for Windows compatibility.
- **Template Synchronization**: Updated all core workflow templates to align with ZID preservation and safety standards.

## v1.4.2
**Date:** 2026-04-12
- **Project Hygiene**: Comprehensive cleanup of redundant files and legacy implementation artifacts.
- **Metadata Synchronization**: Updated project metadata and configuration to match the zero-dependency architecture.
- **Documentation Refinement**: Refined documentation and reference guides for ZID-based naming standards.
- **Build Synchronization**: Aligned the build process and distribution shims for the zero-dependency fork.

## v1.4.0 (Zero-Dependency Migration)
**Date:** 2026-04-10
- **Zero-Trust Supply Chain**: Full transition to a zero-dependency runtime architecture. All external npm dependencies removed from the production bundle.
- **Hardened Standard Library**: Core parsing and CLI logic rewritten to rely exclusively on Node.js built-ins.
- **Consolidated Reference Guide**: Introduced a single, comprehensive [Reference Guide](docs/reference.md).
- **ZID-Based Naming Standard**: Formalized the mandatory 14-digit ZID (timestamp) naming convention for all changes.
- **Privacy-First Commitment**: Permanent removal of all telemetry and tracking.

