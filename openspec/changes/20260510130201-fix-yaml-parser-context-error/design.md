## Context

The YAML parser in [`src/core/parsers/yaml-parser.ts`](src/core/parsers/yaml-parser.ts) is a zero-dependency parser that handles a subset of YAML features. The parser currently uses the JavaScript `in` operator to check for property existence on objects, but the type checks are insufficient. In JavaScript, `typeof null === 'object'` returns true, so checks like `typeof x === 'object'` don't properly exclude null values before using the `in` operator.

The error "Cannot use 'in' operator to search for 'context' in Project: Kardenwort-mpv (mpv configuration)" occurs when the parser attempts to use the `in` operator on a value that is either a string or null, which is not allowed in JavaScript.

## Goals / Non-Goals

**Goals:**
- Fix all instances where the `in` operator is used without proper null checking
- Ensure type safety in the YAML parser to prevent runtime TypeError
- Add test cases for edge cases that trigger the bug
- Maintain backward compatibility with existing valid YAML files

**Non-Goals:**
- Expanding the supported YAML feature set
- Changing the parser's API or output format
- Introducing external dependencies for YAML parsing

## Decisions

### Use explicit null checks alongside `typeof === 'object'`

Instead of relying solely on `typeof x === 'object'`, we will add explicit `x !== null` checks before using the `in` operator. This is the most straightforward fix that addresses the root cause without changing the parser's architecture.

**Alternative considered:** Use a type guard function like `isNonNullObject(x)` that encapsulates both checks. This would be more maintainable but adds complexity. Given the localized nature of the bug, inline checks are sufficient.

### Fix all occurrences, not just the reported one

The codebase has multiple instances of the same pattern. We will fix all of them proactively to prevent similar errors in the future.

**Locations to fix:**
- Lines 48, 52, 54 in block scalar handling (within `inBlockScalar` block)
- Lines 66, 70, 72 in block scalar handling (within `inBlockScalar` block)
- Any other instances of `in` operator usage

### Add comprehensive test cases

We will add test cases that specifically trigger the bug conditions:
- YAML with null values in nested objects
- YAML with strings that could be misinterpreted as objects
- Edge cases around block scalar handling

## Risks / Trade-offs

**Risk:** The fix might change behavior for some edge cases that were previously working (even if incorrectly).

**Mitigation:** The fix only adds more restrictive type checks, so it cannot introduce new valid behaviors. Any YAML that worked before will continue to work. The fix only prevents invalid operations that would have thrown errors anyway.

**Trade-off:** More verbose code with explicit null checks.

**Justification:** The verbosity is acceptable given the safety improvement and the localized nature of the changes.

## Migration Plan

No migration needed. This is a bug fix that only affects error cases. Valid YAML files will continue to parse identically.

## Open Questions

None. The fix is straightforward and well-understood.
