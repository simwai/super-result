![super-result](https://raw.githubusercontent.com/simwai/super-result/refs/heads/master/assets/banner.svg)

# super-result

Lightweight, enterprise-grade railway-oriented error handling for TypeScript. Minimal syntax, maximum type safety.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-20+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-00ffcc?style=flat-square)](./LICENSE)

---

## The Mission

super-result provides a robust, tree-shakeable toolkit for functional error handling in TypeScript. It is designed to be unobtrusive, explicit, and highly performant, offering multiple API styles to suit your team's preference.

- **Minimal Syntax**: Reach the same results with less code.
- **Maximum Type Safety**: Discriminated unions (ok: true/false) mean no unsafe casts.
- **Style Flexibility**: Choose between Class-based, Functional, or Neverthrow-inspired APIs.
- **Enterprise Ready**: Full TSDoc coverage and automated documentation.

---

## 📦 Installation

```bash
pnpm add super-result
```

---

## Why super-result? 🚀

If you are looking for a modern alternative to libraries like `neverthrow`, here is why `super-result` might be for you:

### 1. Choice Without Compromise
We provide three distinct API styles (Class-based, Functional, and Neverthrow-style) because every developer thinks differently. Some prefer fluent chaining, others prefer pure functions. **You only pay for what you use** — the library is fully tree-shakeable, meaning only the code for the style you choose ends up in your bundle.

### 2. No Unnecessary Complexity
Unlike other libraries that introduce a custom `ResultAsync` class with its own set of methods, `super-result` treats async results as standard **Promises**.
- **Native Interop**: Works seamlessly with `Promise.all`, `await`, and every existing async tool in the JS ecosystem.
- **Lower Cognitive Load**: No need to learn a second API for asynchronous operations.

### 3. Actively Maintained
Built with modern tooling (unbuild, vitest, biome), `super-result` is designed for performance and compatibility with the latest TypeScript features.

---

## API Styles

One library, three ways to use it. All styles share the same core engine and are fully tree-shakeable.

### 1. Default (Class-based) - `super-result`
The primary style. Provides a fluent, PromiseLike wrapper around results.

```ts
import { Result } from 'super-result'

const res = Result.ok(42).map(n => n * 2)
const value = await res.unwrap() // 84
```

### 2. Functional - `super-result/functions`
Pure functions for a composable, functional programming style.

```ts
import { ok, map, unwrap } from 'super-result/functions'

const res = ok(42)
const doubled = map(res, n => n * 2)
const value = unwrap(doubled) // 84
```

### 3. Neverthrow Style - `super-result/like-neverthrow`
A familiar API for users coming from the `neverthrow` library.

```ts
import { ok, err } from 'super-result/like-neverthrow'

const res = ok(42)
if (res.type === 'ok') {
  console.log(res.value)
}
```

---

## Quick Start (Class Style)

```ts
import { Result } from 'super-result'

// Capture synchronous errors
const parsed = Result.fromThrowable(() => JSON.parse('{ "valid": true }'))

// Capture asynchronous errors
const user = await Result.fromPromiseLike(
  fetchUser(id),
  err => new Error('Fetch failed')
)

// Fluent chaining
const name = await Result.ok({ id: 1 })
  .map(u => u.id)
  .flatMap(id => Result.fromThrowable(() => getSafeName(id)))
  .unwrapOr('Anonymous')
```

---

## API Reference

Full API documentation is available in the [docs](https://github.com/simwai/super-result/tree/master/docs) folder.

---

## License

MIT © [simwai](https://github.com/simwai)
