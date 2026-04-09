# Proposal: Clean Up Unnecessary Node Modules

## 1. Needs and Goals

### The Problem
During the Zero-Dependency architecture rollout, many external dependencies (`zod`, `commander`, `yaml`, `fast-glob`, `ora`, `posthog-node`) were decoupled from the OpenSpec runtime engine. However, they were simply moved to `devDependencies`. These packages are still clogging up the `node_modules` directory.

### The Objective
To completely remove packages that are no longer used by the codebase from `package.json` and purge their associated files from the `node_modules` directory.

### Success Criteria
- [ ] `zod`, `commander`, `yaml`, `fast-glob`, `ora`, and `posthog-node` are explicitly uninstalled.
- [ ] `package.json` reflects a much smaller dependency footprint.
- [ ] `node_modules` total size is explicitly reduced.
