## Context

The `openspec` project uses a custom, zero-dependency YAML parser (`yaml-parser.ts`) to avoid external dependencies in its core runtime. This parser uses a line-by-line state machine. Currently, the state transition for block scalars (`|`) is brittle: when a block scalar is terminated by a line with reduced indentation, the parser immediately falls through to key-value validation for that line without checking if it is a comment or empty line first.

## Goals / Non-Goals

**Goals:**
- Fix the logic error that prevents comments from safely terminating block scalars.
- Improve error reporting transparency in `readProjectConfig` by surfacing the underlying parser error message.
- Maintain the zero-dependency architecture.

**Non-Goals:**
- Implementing the full YAML 1.2 specification.
- Changing the overall architecture of the manual parser.

## Decisions

### 1. Robust Comment Handling in termination logic
When a line ends a block scalar (because `indent < blockScalarIndent`), the parser currently sets `inBlockScalar = false` and continues execution into the top-level line validation. We will modify the validation check at line 94 of `yaml-parser.ts` to explicitly ignore lines starting with `#`.

### 2. Guarding the Main Loop skips
The initial skips for empty lines and comments (lines 35-38 in `yaml-parser.js`) are currently guarded by `!inBlockScalar`. This is correct for lines *inside* a block scalar, but problematic for the line that *terminates* it. By adding a comment check to the post-termination validation, we ensure that the line which ends the block is correctly identified as a comment if it starts with `#`.

### 3. Surfacing Parser Errors
In `project-config.ts`, the `try/catch` block around `parseYaml` swallows the specific error message (e.g., "Invalid YAML format at line: ..."). We will update the `console.warn` to include `error.message` to provide users with immediate feedback on which line in `openspec/config.yaml` is causing the failure.

## Risks / Trade-offs

- **Risk**: Modifying the core parser regex or state machine could break support for existing valid configurations (e.g., nested objects or arrays).
- **Mitigation**: Implement comprehensive regression tests in `test/core/project-config.test.ts` covering simple keys, nested objects, list items, and block scalars with various termination types (EOF, new key, comment, empty line).

- **Risk**: Comment lines containing colons might be misinterpreted if the comment check isn't prioritized.
- **Mitigation**: Ensure `trimmed.startsWith('#')` is checked before any colon-based key matching.
