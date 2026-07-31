![super-result](https://raw.githubusercontent.com/simwai/super-result/refs/heads/master/assets/banner.svg)

# super-result

**Lightweight Result pattern for cleaner error handling in TypeScript.**
Minimal syntax, maximum type safety.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-20+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-00ffcc?style=flat-square)](https://github.com/simwai/super-result/blob/master/LICENSE)

A small Result utility for codebases that prefer normal TypeScript control flow over fluent chaining.

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

Wrap unsafe external calls once. The rest of your application receives a typed `Result`.

```ts
import { from, type Result } from 'super-result'

async function safeFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Result<Response, Error>> {
  const result = await from(async () => await fetch(input, init))

  // Narrow the unsafe boundary here.
  if (!result.ok) return result

  console.log('Fetched successfully', result.value)
  return result
}

const result = await safeFetch('https://api.example.com/health')

if (!result.ok) {
  console.error(result.error.message)
} else {
  console.log(result.value.status)
}
```

Keep `from()` at unsafe boundaries: external libraries, HTTP clients,
filesystem calls, subprocesses, database drivers, and parsers.

Do not scatter `from()` through application code:

```ts
// ❌ Every consumer should not wrap the same unsafe dependency.
async function showUser(id: string) {
  const result = await from(() => fetch(`/users/${id}`))
  // ...
}

// ✅ One wrapper owns the unsafe dependency.
async function safeFetchUser(
  id: string,
): Promise<Result<Response, Error>> {
  return from(() => fetch(`/users/${id}`))
}

async function showUser(id: string): Promise<Result<void, Error>> {
  const result = await safeFetchUser(id)
  if (!result.ok) return result

  console.log(result.value)
  return { ok: true, value: undefined }
}
```

---

## Core API

| Function | Use when |
|---|---|
| `ok(value)` | Construct a successful `Ok<T>` |
| `err(error)` | Construct a new `Err<E>` |
| `from(fn)` | Capture a throwing sync callback, async callback, or rejecting Promise as `Error` |
| `fromUnknown(fn)` | Capture a thrown value without converting it; the error remains `unknown` |
| `createResult(mapError)` | Create a scoped `from()` with one shared error-mapping rule |

```ts
type Result<T, E> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E }
```

For async functions, use `Promise<Result<T, E>>`.

```ts
async function readConfig(): Promise<Result<Config, Error>> {
  // ...
}
```

`ResultAsync<T, E>` is available as a deprecated alias for `Promise<Result<T, E>>`.

---

## Philosophy

### Control flow, not pipelines

`super-result` is for straightforward TypeScript:

- Narrow with `if (result.ok)` or `if (!result.ok)`
- Return early when a function cannot continue
- Access `.value` in the success branch
- Access `.error` in the failure branch

There are no fluent combinators such as `.map()`, `.andThen()`, or `.orElse()`.

If you prefer a chaining-heavy API, use a library built for that.
If you prefer `if` statements and early returns with typed failures, this is the small option.

---

## Patterns

### Propagate compatible Results directly

If the Result failure already matches your function’s error contract, return it unchanged:

```ts
import { ok, type Result } from 'super-result'

async function main(): Promise<Result<void, Error>> {
  const configResult = loadConfig(configFilePath)

  // Result<Config, Error> is compatible with Result<void, Error>
  // in this failure branch.
  if (!configResult.ok) return configResult

  const setupResult = await ensureAutoSetupRemote()
  if (!setupResult.ok) return setupResult

  const startResult = await startApplication(configResult.value)
  if (!startResult.ok) return startResult

  return ok(undefined)
}
```

This is the main Result pattern: a function either handles a failure, adds useful context, or forwards it.

---

### `err()` is for a new error

Do not wrap an existing `Result` in `err()`:

```ts
import { err, type Result } from 'super-result'

declare const result: Result<number, Error>

// ❌ Err<Result<number, Error>> — almost never useful
const nestedResult = err(result)
```

When the error type is already compatible, return the existing Result:

```ts
if (!result.ok) {
  return result
}
```

`err(result.error)` is valid but normally redundant because it recreates the same `Err<Error>`:

```ts
// ⚠️ Valid, but adds no information
if (!result.ok) {
  return err(result.error)
}
```

Use `err()` when you construct, map, redact, or enrich an error:

```ts
if (!result.ok) {
  return err(
    new Error(`Could not load config: ${result.error.message}`),
  )
}
```

---

### Wrap built-in or third-party libraries

Node.js and third-party APIs often throw implicitly. Wrap them in a safe function returning a `Result`:

```ts
import * as fs from 'node:fs/promises'
import { err, from, type Result } from 'super-result'

async function safeReadFile(
  path: string,
): Promise<Result<string, NodeJS.ErrnoException | Error>> {
  const result = await from(async () => await fs.readFile(path, 'utf8'))

  if (!result.ok) return result

  if (result.value.trim() === '') {
    return err(new Error('File is empty'))
  }

  return result
}
```

The caller no longer has to guess what `safeReadFile` might throw:

```ts
const fileResult = await safeReadFile('./config.json')

if (!fileResult.ok) {
  console.error('Failed to read config:', fileResult.error.message)
} else {
  console.log('Config loaded', fileResult.value)
}
```

---

### Handle HTTP status explicitly

`from(fetch(...))` captures rejected requests, such as network failures. It does not automatically turn a non-2xx HTTP response into an `Err`, because `fetch()` resolves with a `Response` for those statuses. Check `response.ok` in your wrapper when that is your API policy.

```ts
import { err, from, type Result } from 'super-result'

async function fetchJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Result<T, Error>> {
  const responseResult = await from(async () => await fetch(input, init))
  if (!responseResult.ok) return responseResult

  const response = responseResult.value

  if (!response.ok) {
    return err(new Error(`Request failed: ${response.status}`))
  }

  return from(async () => await response.json() as T)
}
```

---

### Preserve unknown thrown values

JavaScript allows throwing values that are not `Error` instances. Use `fromUnknown()` when that distinction matters:

```ts
import { fromUnknown } from 'super-result'

const result = fromUnknown(() => {
  throw { code: 'RATE_LIMITED', retryAfterMs: 1_000 }
})

if (!result.ok) {
  // result.error is unknown
  console.log(result.error)
}
```

The default `from()` normalizes non-`Error` values into `Error`:

```ts
import { from } from 'super-result'

const result = from(() => {
  throw 'connection lost'
})

if (!result.ok) {
  // result.error is Error
  console.log(result.error.message) // "connection lost"
}
```

---

### Custom error mapping

Use `createResult()` when one part of your application needs a consistent error type:

```ts
import { createResult, type Result } from 'super-result'

class AppError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message)
  }
}

const appResult = createResult((error) =>
  error instanceof AppError
    ? error
    : new AppError(String(error), error),
)

function parseSettings(
  input: string,
): Result<{ port: number }, AppError> {
  return appResult.from(() => JSON.parse(input))
}

const result = parseSettings('{ invalid json }')

if (!result.ok) {
  // result.error is AppError
  console.error(result.error.message)
}
```

The factory scopes only `from()`. Use the normal exported `ok()` and `err()` functions to construct Results yourself.

---

### Validate external data with Zod

Use a schema validator for unknown input, then return a typed value or a Result error:

```ts
import { err, ok, type Result } from 'super-result'
import { z } from 'zod'

const RemoteSchema = z.object({
  name: z.string(),
  refs: z.object({
    fetch: z.string(),
    push: z.string(),
  }),
})

const RemotesSchema = z.array(RemoteSchema)

function parseRemotes(
  input: unknown,
): Result<z.infer<typeof RemotesSchema>, Error> {
  const parsed = RemotesSchema.safeParse(input)

  if (!parsed.success) {
    return err(new Error(`Invalid remotes shape: ${parsed.error.message}`))
  }

  return ok(parsed.data)
}
```

---

### Continue after item failures

A failed item does not always need to abort a batch:

```ts
let total = 0
let succeeded = 0
let failed = 0

for await (const repoPath of repoPaths) {
  total++

  const result = await migrateRepo(repoPath, destinations, dryRun)

  if (!result.ok) {
    console.warn(`Skipping ${repoPath}: ${result.error.message}`)
    failed++
    continue
  }

  const platformFailed = result.value.results.some(
    (platform) => !platform.success,
  )

  if (platformFailed) failed++
  else succeeded++
}

console.log({ total, succeeded, failed })
```

Use `return result` to propagate a failure. Use `continue` when the next item can still be processed.

---

## FAQ

### Is this just Promises?

No. A `Promise<T>` represents a value that arrives asynchronously. A `Result<T, E>` represents a value that either succeeds or fails.

Use both when needed:

```ts
Promise<Result<User, Error>>
```

### Should every function return a Result?

No. Use Results at boundaries where failures are expected and callers need to decide what happens next: network calls, filesystem work, subprocesses, parsing, database access, and third-party libraries.

Do not introduce Results where nothing can recover, handle, or add context to the failure.

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

## License

MIT © [simwai](https://github.com/simwai)