# Getting Started

## Installation

Install `super-result` using your favorite package manager:

```bash
pnpm add super-result
# or
npm install super-result
# or
yarn add super-result
```

## Quick Start

The core of `super-result` is the `from` function, which captures both synchronous and asynchronous operations into a `Result` type.

```ts
import { from } from 'super-result'

// 1. Wrap synchronous operations
const res = from(() => JSON.parse('{"foo": "bar"}'))

if (res.ok) {
  console.log(res.value) // { foo: 'bar' }
} else {
  console.error(res.error) // Error if JSON was invalid
}

// 2. Wrap asynchronous operations
const asyncRes = await from(fetch('/api/data').then(r => r.json()))

if (asyncRes.ok) {
  // asyncRes.value is typed to the resolved promise value
}
```

## Why super-result?

Most error handling in TypeScript relies on `try/catch`, which is:
- **Unsafe**: Errors are `unknown` and easy to forget.
- **Verbose**: Nesting try/catch blocks leads to "Pyramid of Doom".
- **Implicit**: You don't know if a function can fail just by looking at its signature.

`super-result` makes errors **explicit**, **typed**, and **composable**.
