![super-result](https://raw.githubusercontent.com/simwai/super-result/refs/heads/master/assets/banner.svg)

# super-result

Lightweight Result pattern for cleaner error handling in TypeScript.
Minimal syntax, maximum type safety.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-20+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-00ffcc?style=flat-square)](https://github.com/simwai/super-result/blob/master/LICENSE)

---

## Philosophy

Stop pretending errors don't exist.
`super-result` replaces hidden, unpredictable exceptions with **honest types** – forcing callers to face failure explicitly. It’s not just a utility; it’s a deliberate shift toward fearless, maintainable code.

### 1. Stop Lying with Your Types 🤥

A typical TypeScript signature:

```ts
function getUser(id: string): User
```

This is a lie. If the database is down, the function doesn’t return a `User` – it explodes. Most TS functions are **partial functions** masquerading as total ones.

**The `super-result` way:**

```ts
function getUser(id: string): Result<User, DbError>
```

This type tells the truth: *“I’ll try to give you a User, but you might get a DbError.”*
Now the compiler **forces** you to handle failure. You can’t accidentally ignore it.

### 2. Shift the Cognitive Load 🧠

Traditional error handling makes you mentally map every possible exception bubbling up through nested calls. That’s an impossible burden.

With `super-result`, the load moves to the **TypeScript type system**:

- No need to remember what might throw.
- No defensive `try/catch` “just in case.”
- The return type is your single source of truth.

This frees your brain to focus on **business logic**.

### 3. Design Your Errors, Don’t Just Catch Them ✨

When every failure path is typed and every check is enforced, you stop being afraid of your own code. You stop hoping things won’t break and start **knowing exactly how they can fail**.

---

## Installation

```bash
pnpm add super-result
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

## Custom Factories

Define your own error handling rules once, reuse everywhere:

```ts
import { createResult } from 'super-result'

class MyError extends Error {}

const coolResult = createResult(error =>
  error instanceof MyError ? error : new MyError(String(error))
)

// No need to pass an error mapper every time
const result = coolResult.from(() => {
  throw new Error('raw')
})
// result.error is MyError
```

---

## License

MIT © [simwai](https://github.com/simwai)
