![super-result](https://raw.githubusercontent.com/simwai/super-result/refs/heads/master/assets/banner.svg)

# super-result

Lightweight Result pattern for neater error handling written in TypeScript. Minimal syntax, maximum type safety.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-20+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-00ffcc?style=flat-square)](https://github.com/simwai/super-result/blob/master/LICENSE)

---

## 📖 Philosophy

`super-result` is follows the Result pattern approach some know as Rust-inspired error handling. Read our [Philosophy](https://github.com/simwai/super-result/blob/master/PHILOSOPHY.md) to learn more about it.

---

## 📦 Installation

```bash
pnpm add super-result
```

---

## Quick Start

```ts
import { from } from 'super-result'

// Capture synchronous errors
const res1 = from(() => {
  if (Math.random() > 0.5) throw new Error('boom')
  return 42
})

// Capture asynchronous errors
const res2 = await from(async () => {
  const data = await fetch('...')
  return data.json()
})

// Type narrowing
if (res1.ok) {
  console.log(res1.value)
} else {
  console.error(res1.error.message)
}
```

---

## Custom Factories

```ts
import { createResult } from 'super-result'

class MyError extends Error {}

const coolResult = createResult(error =>
  error instanceof MyError ? error : new MyError(String(error))
)

const result = coolResult.from(() => { throw new Error('raw') }) // no need to provide the error mapper anymore
// result.error is MyError
```

---

## API Reference

Full API documentation is available in the [docs](https://github.com/simwai/super-result/blob/master/docs/README.md) folder.

---

## License

MIT © [simwai](https://github.com/simwai)
