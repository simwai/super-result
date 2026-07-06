![super-result](https://raw.githubusercontent.com/simwai/super-result/refs/heads/master/assets/banner.svg)

# super-result

**Lightweight Result pattern for cleaner error handling in TypeScript.**
Minimal syntax, maximum type safety.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-20+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-00ffcc?style=flat-square)](https://github.com/simwai/super-result/blob/master/LICENSE)

---

## Install

```bash
pnpm add super-result
# or
npm install super-result
# or
yarn add super-result
```

---

## Quick Start

```ts
import { from } from 'super-result'

// Synchronous errors
const res1 = from(() => {
  if (Math.random() > 0.5) throw new Error('boom')
  return 42
})

// Asynchronous errors
const res2 = await from(async () => {
  const data = await fetch('...')
  return data.json()
})

// Type narrowing
if (res1.ok) {
  console.log(res1.value)   // number
} else {
  console.error(res1.error) // Error
}
```

---

## Why Super-Result?

### 1. Stop Lying with Your Types 🤥

A typical TypeScript signature:

```ts
function getUser(id: string): User
```

This is a **lie** – if the database is down, the function explodes instead of returning a `User`.
**The `super-result` truth:**

```ts
function getUser(id: string): Result<User, DbError>
```

Now the compiler **forces** you to handle failure. You can’t accidentally ignore it.

### 2. Shift the Cognitive Load 🧠

Traditional error handling makes you mentally track every possible exception bubbling through nested calls – an impossible burden.
With `super-result`, the load moves to the **TypeScript type system**:

- No need to remember what might throw.
- No defensive `try/catch` “just in case.”
- The return type is your single source of truth.

### 3. Design Your Errors, Don’t Just Catch Them ✨

When every failure path is typed and every check is enforced, you stop fearing your own code. You start **knowing exactly how things can fail** – and you design accordingly.

---

## Custom Factories

Define your own error‑handling rules once, and reuse them everywhere:

```ts
import { createResult } from 'super-result'

class MyError extends Error {}

const coolResult = createResult(error =>
  error instanceof MyError ? error : new MyError(String(error))
)

// Now you never need to pass an error mapper again
const result = coolResult.from(() => {
  throw new Error('raw')
})
// result.error is MyError
```

---

## License

MIT © [simwai](https://github.com/simwai)
