![super-result](./assets/banner.svg)

# super-result

> Lightweight railway-oriented error handling for TypeScript — discriminated `Result<T,E>`, typed async, zero unsafe casts.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-20+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-00ffcc?style=flat-square)](./LICENSE)

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

## API Reference

### Standalone constructors & guards

```ts
import { ok, err, okAsync, errAsync, isOk, isErr } from 'super-result';

ok(42)              // Ok<number>
err('oops')         // Err<string>
okAsync(42)         // Promise<Ok<number>>
errAsync('oops')    // Promise<Err<string>>

isOk(result)        // result is Ok<T>
isErr(result)       // result is Err<E>
```

### `createResult(mapError)` — typed factory

Creates a `ResultInterface<E>` with your error type bound. All captures in this instance produce `Result<T, E>` or `ResultAsync<T, E>`.

```ts
const Result = createResult(e => toAppError(e));
```

#### Sync capture

| Method | Description |
|---|---|
| `Result.from(fn)` | Wraps a sync function; errors mapped to `E` |
| `Result.fromThrowable(fn)` | Same as `from(fn)` for explicit intent |

#### Async capture

| Method | Description |
|---|---|
| `Result.from(fn)` | Auto-detected async — fn returns `PromiseLike<T>` |
| `Result.from(promise)` | Wraps a `PromiseLike<T>` directly |
| `Result.fromPromise(promise)` | Explicit promise wrapping |
| `Result.fromAsyncThrowable(fn)` | Async fn, errors mapped to `E` |
| `Result.fromAsyncResult(result)` | Lifts a sync `Result` into async |

#### Constructors (bound)

```ts
Result.ok(value)        // Ok<T>
Result.err(error)       // Err<E>
Result.okAsync(value)   // ResultAsync<T, never>
Result.errAsync(error)  // ResultAsync<never, E>
```

#### Pattern matching

```ts
// Sync
const label = Result.match(result, v => `ok:${v}`, e => `err:${e.code}`);

// Async
const label = await Result.matchAsync(resultPromise, v => v.name, e => 'fallback');
```

#### Unwrap

| Method | Throws on Err? | Returns |
|---|---|---|
| `unwrap(result)` | ✅ throws | `T` |
| `unwrapOr(result, default)` | ❌ | `T \| D` |
| `unwrapOrElse(result, fn)` | ❌ | `T \| U` |
| `unwrapAsync(promise)` | ✅ throws | `Promise<T>` |
| `unwrapOrAsync(promise, default)` | ❌ | `Promise<T \| D>` |
| `unwrapOrElseAsync(promise, fn)` | ❌ | `Promise<T \| U>` |

> `unwrap` throws the original `Error` if it is one, or wraps it in `NonErrorThrown` otherwise.

---

## Utility Types

```ts
import type { ResultOk, ResultErr, ResultAsyncOk, ResultAsyncErr } from 'super-result';

type A = ResultOk<Result<number, AppError>>;       // number
type B = ResultErr<Result<number, AppError>>;      // AppError
type C = ResultAsyncOk<ResultAsync<string, AppError>>;  // string
type D = ResultAsyncErr<ResultAsync<string, AppError>>; // AppError
```

---

## `NonErrorThrown`

When `unwrap` is called on an `Err<E>` where `E` is not an `Error` instance, it wraps the value in `NonErrorThrown` instead of throwing a raw non-error:

```ts
class NonErrorThrown extends TypeError {
  readonly value: unknown; // the original thrown value
}
```

---

## Design Decisions

| Decision | Rationale |
|---|---|
| `Result<T,E> = Ok<T> \| Err<E>` over class hierarchy | Discriminated unions narrow without type predicates; composable with `satisfies` |
| `ResultAsync<T,E> = Promise<Result<T,E>>` | No wrapper class — works with any `await` site and `Promise.all` out of the box |
| `mapError` in factory | Caller controls the error shape; library never swallows unknown errors silently |
| No `andThen`/`orElse` on `Result` | Sync chain returning `ResultAsync` breaks the return type contract — use `matchAsync` or `fromAsyncResult` instead |

---

## License

MIT © [simwai](https://github.com/simwai)
