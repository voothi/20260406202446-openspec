# Design: Clean Node Modules

## 1. Context and Scope

We have recently finalized the transition to a Zero-Dependency runtime architecture. With this complete, there is no longer a need to maintain the legacy external libraries within our workspace. The goal here is strict subtraction.

## 2. Selected Architecture / Approach

- Run targeted uninstall commands via npm:
  `npm uninstall commander fast-glob ora posthog-node yaml zod`
- This ensures safety by allowing npm to simultaneously adjust internal package lockfiles and cleanly tear out directories from `node_modules` without leaving orphaned files.

## 3. Data and State Changes

N/A - purely configuration and dependency cleanup.
