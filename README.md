![super-result](./assets/banner.svg)

# super-result

Lightweight, enterprise-grade railway-oriented error handling for TypeScript. Minimal syntax, maximum type safety.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-20+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-00ffcc?style=flat-square)](./LICENSE)

---

## The Mission

super-result provides a robust, tree-shakeable toolkit for functional error handling in TypeScript. It is designed to be unobtrusive, explicit, and highly performant, offering multiple API styles to suit your team's preference.

- Minimal Syntax: Reach the same results with less code.
- Maximum Type Safety: Discriminated unions (ok: true/false) mean no unsafe casts.
- Style Flexibility: Choose between Class-based, Functional, or Neverthrow-inspired APIs.
- Enterprise Ready: Full TSDoc coverage and automated documentation.

---

## 📦 Installation

```bash
pnpm add super-result
```

---

## API Styles

One library, three ways to use it. All styles share the same core engine and are fully tree-shakeable.

### 1. Default (Class-based) - super-result
The primary style. Provides a fluent, PromiseLike wrapper around results.

```ts
import { Result } from 'super-result'

const res = Result.ok(42).map(n => n * 2)
const value = await res.unwrap() // 84
```

### 2. Functional - super-result/functions
Pure functions for a composable, functional programming style.

```ts
import { ok, map, unwrap } from 'super-result/functions'

const res = ok(42)
const doubled = map(res, n => n * 2)
const value = unwrap(doubled) // 84
```

### 3. Neverthrow Style - super-result/like-neverthrow
A familiar API for users coming from the popular neverthrow library.

```ts
import { ok, err } from 'super-result/like-neverthrow'

const res = ok(42)
if (res.isOk()) {
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

Full API documentation is available in the [docs](./docs/README.md) folder.

---

## Why super-result?

- Zero Dependencies: Keeps your bundle small.
- Tree-shakeable: Only pay for the styles you use.
- Railway-Oriented: Cleanly handle error paths without try-catch bloat.
- Async First: Seamlessly mix sync and async logic.

---

## License

MIT © [simwai](https://github.com/simwai)
