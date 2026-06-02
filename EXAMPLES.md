# super-result Examples

This document provides pragmatic, real-world examples of how to use `super-result` in enterprise TypeScript applications.

`super-result` offers three distinct API styles to match your team's preference. Each style is fully tree-shakeable and shares the same core logic.

## 📖 Choose Your Style

Detailed examples for each API style:

1.  [**Class-based API**](./docs/examples/class.md) (Default) - Fluent, chainable interface similar to Promises.
2.  [**Functional API**](./docs/examples/functional.md) - Pure functions for composable, functional programming.
3.  [**Neverthrow-style API**](./docs/examples/neverthrow.md) - Familiar API for users of the `neverthrow` library.

---

## 🚀 Common Scenarios

Each of the links above includes:

*   **Beginner:** Safe JSON parsing and data validation without `try/catch` bloat.
*   **Advanced:** Creating a standardized "Enterprise Result" factory using `createResult` to enforce consistent error structures and correlation IDs across services.
*   **Complex:** Orchestrating multi-step asynchronous business flows (like Order Processing) with manual rollback logic for partial failures.

## 💡 Quick Comparison

### Class Style
```ts
const res = Result.ok(42);
if (res.isOkSync()) {
  console.log(res.value); // 42
}
```

### Functional Style
```ts
const res = ok(42);
if (isOk(res)) {
  console.log(res.value); // 42
}
```

### Neverthrow Style
```ts
const res = ok(42);
if (isOk(res)) {
  console.log(res.value); // 42
}
```
