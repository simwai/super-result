# super-result Examples

This directory provides pragmatic, real-world examples of how to use **super-result** in enterprise TypeScript applications.

## 📖 Choose Your API Style

Detailed examples for each available style:

1. [**Class-based API**](./class.md) (Default) - Fluent, chainable interface similar to Promises.
2. [**Functional API**](./functional.md) - Pure functions for composable, functional programming.
3. [**Neverthrow-style API**](./neverthrow.md) - Familiar API for users of the `neverthrow` library.

---

## 🚀 Common Scenarios

Each guide covers scenarios including:

- **Beginner**: Safe JSON parsing and basic validation.
- **Advanced**: Using `createResult` to build standardized error handlers.
- **Complex**: Orchestrating multi-step asynchronous business flows with manual rollback.

---

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
if (res.isOk()) {
  console.log(res.value); // 42
}
```
