![super-result](./assets/banner.svg)

# super-result

> ⚠️ **Experimental** — API is unstable and may change without notice. Not recommended for production use yet.

> Lightweight railway-oriented error handling for TypeScript — discriminated `Result<T,E>`, typed async, zero unsafe casts.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-20+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-00ffcc?style=flat-square)](./LICENSE)

---

## API Reference

**Full API documentation is available in [API.md](./docs/README.md).**

---

## Philosophy

- **One execution model per return type.** Sync functions return `Result<T,E>`. Async functions return `ResultAsync<T,E>` (`Promise<Result<T,E>>`). No auto-lifting that lies about the return type.
- **Discriminated union, not optional fields.** `Ok<T>` and `Err<E>` are structurally separate — TypeScript narrows them for free, no `!` operators, no `as unknown as` casts.
- **Typed errors by default.** `createResult(mapError)` binds your error mapper once so every capture in that context produces `Result<T, YourError>` — not `Result<T, unknown>`.

---

## Installation

```bash
# pnpm (preferred)
pnpm add super-result

# npm
npm install super-result
```

---

## Quick Start

```ts
import { createResult } from 'super-result';

class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

const Result = createResult(
  error => error instanceof AppError
    ? error
    : new AppError(String(error), 'UNKNOWN'),
);

// Sync capture
const parsed = Result.from(() => JSON.parse(rawInput));

if (Result.isOk(parsed)) {
  console.log(parsed.value); // ✅ fully typed
} else {
  console.error(parsed.error.code); // ✅ AppError, not unknown
}

// Async capture
const user = await Result.fromPromise(fetchUser(id));

const name = Result.match(
  user,
  u => u.name,
  e => `error: ${e.message}`,
);

// Transform without unwrapping
const username = Result.map(parsed, data => data.name);
const safe = Result.flatMap(parsed, data => validate(data));
const remapped = Result.mapErr(parsed, e => `[${e.code}] ${e.message}`);

// Finally support (with error mapping)
const withCleanup = Result.from(
  () => performTask(),
  {
    finally: (res) => cleanup(res),
    mapFinallyError: (e) => new AppError('Cleanup failed', 'CLEANUP')
  }
);
```

---

## Core Types

```ts
type Ok<T>  = { readonly type: 'ok';  readonly value: T };
type Err<E> = { readonly type: 'err'; readonly error: E };
type Result<T, E>      = Ok<T> | Err<E>;
type ResultAsync<T, E> = Promise<Result<T, E>>;
```

---

## License

MIT © [simwai](https://github.com/simwai)
