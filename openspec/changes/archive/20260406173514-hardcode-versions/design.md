## Context

Currently, the project specifies dependencies in `package.json` using the caret (`^`) prefix. This allows for automatic minor and patch version updates during installation. While this facilitates keeping dependencies up-to-date, it introduces a security risk where a compromised or "spoofed" package version could be automatically pulled into the project without explicit review.

## Goals / Non-Goals

**Goals:**
- Eliminate automatic dependency updates by pinning exact versions in `package.json`.
- Provide a clear, immutable record of the dependency tree in the source manifest.
- Protect against automated dependency confusion/spoofing attacks.

**Non-Goals:**
- This change does not address the underlying security of the upstream packages themselves, only the mechanism by which they are updated.
- Automated dependency auditing (e.g., `npm audit`) is out of scope for this specific change but remains a recommended practice.

## Decisions

### Pin both Production and Development Dependencies
**Decision**: We will remove ranges from both `dependencies` and `devDependencies`.
**Rationale**: Malicious code in a dev dependency (e.g., a test runner or linter) can be just as damaging as in a production dependency, often having access to local environment variables and filesystem during build/test phases.

### Use Exact Versioning
**Decision**: We will use the exact version currently specified in `package.json` but without the prefix (e.g., `^1.2.3` becomes `1.2.3`).
**Alternatives Considered**: 
- **npm-shrinkwrap.json**: More complex to manage than standard lockfiles.
- **Yarn/Pnpm lockfiles**: Already in use/implicitly handled, but `package.json` pinning adds a "source of truth" layer that is more visible to developers.

## Risks / Trade-offs

- **[Risk] Stale Dependencies** → **Mitigation**: Scheduled manual dependency updates and regular use of tools like `npm audit` or automated PR generators (like Dependabot) configured for exact versioning.
- **[Risk] Merge Conflicts** → **Mitigation**: Standard practice of resolving conflicts in `package.json` and regenerating the lockfile.
