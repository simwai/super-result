![super-result](https://gitlab.com/simwai/super-result/-/raw/master/assets/banner.svg)

# super-result

**Lightweight Result pattern for cleaner error handling in TypeScript.**

Minimal syntax, explicit failures.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-260b28?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-20+-260b28?style=flat-square&logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-260b28?style=flat-square)](https://gitlab.com/simwai/super-result/-/blob/master/LICENSE)

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

### Running the examples

Examples assume Node.js 20+, TypeScript with strict checking, and `super-result` installed.

To run the standalone examples:

```bash
pnpm add -D typescript tsx @types/node
```

Examples that use Zod also require:

```bash
pnpm add zod
```

For examples using top-level `await`, use an ESM project with `"type": "module"` in `package.json`.

Run an example with:

```bash
npx tsx example.ts
```

`tsx` executes TypeScript without type-checking it. Check your examples separately with your project's TypeScript configuration.

HTTP examples use placeholder URLs. Replace them with a real endpoint before running them.

---

## Quick Start

Wrap an unsafe external call once. Callers receive a Result and decide what happens next.

```ts
import { from, type Result } from 'super-result'

async function safeFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Result<Response, Error>> {
  return from(() => fetch(input, init))
}

async function main() {
  const result = await safeFetch('[https://api.example.com/health](https://api.example.com/health)')

  if (!result.ok) {
    console.error('Request failed:', result.error.message)
    return
  }

  const response = result.value

  if (!response.ok) {
    console.error('HTTP error:', response.status)
    return
  }

  console.log('Received successful HTTP response:', response.status)
}

await main()
```

`fetch()` does not reject merely because the server returns an HTTP error status. Check `response.ok` when HTTP status matters.

Wrapping a call captures failures from that call. It does not make unrelated operations exception-free.

---

## Core API

| Function | Use when |
| --- | --- |
| `ok(value)` | Construct a successful `Ok<T>` |
| `err(error)` | Construct a failure `Err<E>` |
| `from(fn)` | Capture a throwing callback or a rejected Promise, normalizing the failure to `Error` |
| `fromUnknown(fn)` | Capture a thrown or rejected value without converting it; the error remains `unknown` |
| `createResult(mapError)` | Create a scoped factory with a shared error-mapping rule |

`from()` supports synchronous callbacks, asynchronous callbacks, and Promise inputs.

A Result has this shape:

```ts
type Result<T, E> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E }
```

For asynchronous functions, use:

```ts
Promise<Result<T, E>>
```

For example:

```ts
import { ok, type Result } from 'super-result'

interface Config {
  port: number
}

async function readConfig(): Promise<Result<Config, Error>> {
  return ok({ port: 3000 })
}
```

`ResultAsync<T, E>` is available as a deprecated alias for `Promise<Result<T, E>>`.

### Prefer callbacks at unsafe boundaries

Both forms can capture Promise rejection:

```ts
await from(fetch(url))
await from(() => fetch(url))
```

The callback form also puts invocation inside the wrapper. Prefer it when invoking the dependency might throw synchronously.

### Do not automatically wrap Result-returning functions

If a function already returns a Result, handle that Result directly:

```ts
const result = await resultReturningFunction()
```

A returned `Err` is a normal returned value, not a thrown exception. Do not assume that `from()` automatically flattens a Result returned by its callback.

---

## Philosophy

### Control flow, not pipelines

`super-result` is for straightforward TypeScript:

- Narrow with `if (result.ok)` or `if (!result.ok)`.
- Return early when a function cannot continue.
- Access `.value` in the success branch.
- Access `.error` in the failure branch.
- Propagate compatible failure Results directly.

There are no fluent combinators such as `.map()`, `.andThen()`, or `.orElse()`.

If you prefer a chaining-heavy API, use a library built for that.

If you prefer `if` statements and early returns with typed failures, this is the small option.

### What the types guarantee

The discriminated union makes success and failure explicit. TypeScript requires narrowing before accessing variant-specific properties.

It does not require callers to consume every Result, and a Result return annotation does not prevent a function from throwing.

---

## Patterns

### 1. Wrap External Boundaries with `from()`

Use a boundary wrapper when a dependency can throw or reject and callers need a Result instead.

Typical boundaries include:

- HTTP clients
- Filesystem operations
- Subprocesses
- Database drivers
- Parsers
- Third-party libraries

Keep the operations that can fail inside the wrapper.

#### Synchronous parsing

```ts
// Run: npx tsx safe-json.ts
import { from, type Result } from 'super-result'
import { z } from 'zod'

export function safeJsonParse(
  input: string,
): Result<unknown, Error> {
  return from(() => {
    const value: unknown = JSON.parse(input)
    return value
  })
}

const UserSchema = z.object({
  name: z.string().min(1),
  age: z.number().int().positive(),
})

type User = z.infer<typeof UserSchema>

function parseUser(input: unknown): Result<User, Error> {
  return from(() => UserSchema.parse(input))
}

console.log(safeJsonParse('{"name":"Alice"}'))
// Success containing an unvalidated value.

console.log(safeJsonParse('not json'))
// Failure containing a parsing error.

console.log(parseUser({ name: 'Alice', age: 30 }))
// { ok: true, value: { name: 'Alice', age: 30 } }

console.log(parseUser({ name: '', age: -5 }))
// Failure containing a validation error.
```

Parsing JSON establishes that the input is valid JSON. It does not establish that the result matches an application-specific type.

Use runtime validation before treating external data as a particular shape.

#### Fetch and HTTP body parsing

```ts
// Run: npx tsx fetch-json.ts
import { from, err, type Result } from 'super-result'

async function fetchJson(
  url: string,
): Promise<Result<unknown, Error>> {
  const responseResult = await from(() => fetch(url))
  if (!responseResult.ok) return responseResult

  const response = responseResult.value

  if (!response.ok) {
    return err(new Error(`HTTP ${response.status}`))
  }

  return from(async () => {
    const data: unknown = await response.json()
    return data
  })
}

const result = await fetchJson('[https://api.example.com/health](https://api.example.com/health)')

if (!result.ok) {
  console.error('Request failed:', result.error.message)
} else {
  console.log('Parsed JSON:', result.value)
}
```

This captures network and body-parsing failures, and explicitly converts unsuccessful HTTP status into an `Err`.

#### Child processes with separate arguments

```ts
// Run: npx tsx exec-sync.ts
import { from, err, type Result } from 'super-result'
import { execFileSync } from 'node:child_process'

const ALLOWED_EXECUTABLES = new Set(['echo', 'ls'])

export function runAllowedSync(
  executable: string,
  args: readonly string[] = [],
): Result<string, Error> {
  if (!ALLOWED_EXECUTABLES.has(executable)) {
    return err(new Error(`Executable not allowed: ${executable}`))
  }

  return from(() =>
    execFileSync(executable, [...args], {
      encoding: 'utf8',
      shell: false,
    }),
  )
}

console.log(runAllowedSync('echo', ['hello']))
// On a system with an echo executable:
// { ok: true, value: 'hello\n' }

console.log(runAllowedSync('rm', ['-rf', '/']))
// Failure: executable not allowed.
```

The executable and arguments are separate, and the shell is disabled.

This allowlist is not a sandbox. Real applications may also need trusted absolute executable paths, command-specific argument validation, resource restrictions, and timeouts.

`execFileSync()` blocks the event loop. Use an asynchronous subprocess API when blocking is unsuitable.

#### Filesystem helpers

```ts
// Run: npx tsx safe-fs.ts
import { from } from 'super-result'
import * as fs from 'node:fs'

export const safeReadFileSync = (
  path: string,
  encoding: BufferEncoding = 'utf8',
) => from(() => fs.readFileSync(path, encoding))

export const safeWriteFileSync = (
  path: string,
  data: string,
) => from(() => fs.writeFileSync(path, data))

export const safeReaddirSync = (
  path: string,
) => from(() => fs.readdirSync(path))

export const safeStatSync = (
  path: string,
) => from(() => fs.statSync(path))

console.log(safeWriteFileSync('./demo.txt', 'hello'))
// { ok: true, value: undefined }

console.log(safeReadFileSync('./demo.txt'))
// { ok: true, value: 'hello' }

console.log(safeReadFileSync('./missing.txt'))
// Failure if the file does not exist.
```

These helpers are synchronous. For request-handling paths or substantial I/O, consider asynchronous filesystem APIs.

---

### 2. Construct Results Directly with `ok()` / `err()`

Use `ok()` and `err()` when the success value or failure is already known.

This works well for domain failures, such as missing records, invalid input, or conflicting state.

#### Domain failures with string discriminators

```ts
// Run: npx tsx reservation.ts
import { err, ok, type Result } from 'super-result'

interface Reservation {
  username: string
}

type ReservationError =
  | 'INVALID_USERNAME'
  | 'USERNAME_TAKEN'

const reservedUsernames = new Set<string>()

function reserveUsername(
  input: string,
): Result<Reservation, ReservationError> {
  const username = input.trim()

  if (username.length === 0) {
    return err('INVALID_USERNAME')
  }

  if (reservedUsernames.has(username)) {
    return err('USERNAME_TAKEN')
  }

  reservedUsernames.add(username)
  return ok({ username })
}

console.log(reserveUsername('alice'))
// { ok: true, value: { username: 'alice' } }

console.log(reserveUsername('alice'))
// { ok: false, error: 'USERNAME_TAKEN' }

console.log(reserveUsername(''))
// { ok: false, error: 'INVALID_USERNAME' }
```

#### Typed custom errors

```ts
// Run: npx tsx typed-errors.ts
import { err, ok, type Result } from 'super-result'

class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    cause?: unknown,
  ) {
    super(message, { cause })
    this.name = 'AppError'
  }
}

function riskyOperation(
  shouldFail: boolean,
): Result<string, AppError> {
  if (shouldFail) {
    return err(
      new AppError(
        'Operation failed',
        'OPERATION_FAILED',
        new Error('Root cause'),
      ),
    )
  }

  return ok('success')
}

const result = riskyOperation(true)

if (!result.ok) {
  console.log('Code:', result.error.code)
  console.log('Cause:', result.error.cause)
} else {
  console.log('Value:', result.value)
}
```

#### External clients that return Results

```ts
// Run: npx tsx external-api.ts
import { err, ok, type Result } from 'super-result'

interface Message {
  message_id: number
}

// A deterministic mock, not a real messaging client.
const bot = {
  api: {
    async sendMessage(
      _chatId: number,
      text: string,
    ): Promise<Result<Message, Error>> {
      if (text.length > 4096) {
        return err(new Error('Message too long'))
      }

      return ok({ message_id: 123 })
    },
  },
}

type Bot = typeof bot

async function sendMessageSafe(
  client: Bot,
  chatId: number,
  text: string,
): Promise<boolean> {
  const result = await client.api.sendMessage(chatId, text)

  if (!result.ok) {
    console.error('Failed to send:', result.error.message)
    return false
  }

  console.log('Sent:', result.value)
  return true
}

await sendMessageSafe(bot, 123, 'Hello!')
// Sent: { message_id: 123 }

await sendMessageSafe(bot, 123, 'x'.repeat(5000))
// Failed to send: Message too long
```

The mock already returns a Result, so the caller handles it directly.

This handles the returned failure. It does not catch unexpected exceptions or rejected Promises from a real client.

#### Simulated repository with typed domain errors

```ts
// Run: npx tsx repository.ts
import { randomUUID } from 'node:crypto'
import { err, ok, type Result } from 'super-result'

type DbErrorCode =
  | 'NOT_FOUND'
  | 'UNIQUE_VIOLATION'

class DbError extends Error {
  constructor(
    message: string,
    public readonly code: DbErrorCode,
  ) {
    super(message)
    this.name = 'DbError'
  }
}

interface User {
  id: string
  email: string
}

const users = new Map<string, User>()

async function findUserByEmail(
  email: string,
): Promise<Result<User, DbError>> {
  const user = users.get(email)

  if (!user) {
    return err(new DbError('User not found', 'NOT_FOUND'))
  }

  return ok(user)
}

async function createUser(
  email: string,
): Promise<Result<User, DbError>> {
  if (users.has(email)) {
    return err(
      new DbError('Duplicate entry', 'UNIQUE_VIOLATION'),
    )
  }

  const user: User = {
    id: randomUUID(),
    email,
  }

  users.set(email, user)
  return ok(user)
}

console.log(await createUser('alice@example.com'))
// Success containing the new user.

console.log(await createUser('alice@example.com'))
// Failure with code UNIQUE_VIOLATION.

console.log(await findUserByEmail('bob@example.com'))
// Failure with code NOT_FOUND.
```

This is an in-memory control-flow example, not a database driver adapter.

#### Deterministic test mocks

```ts
// Run: npx tsx test-mocks.ts
import { err, ok, type Result } from 'super-result'

interface Task {
  id: string
  description: string
}

const task: Task = {
  id: '1',
  description: 'Fix bug',
}

const getTaskById = async (
  _id: string,
): Promise<Result<Task, string>> => ok(task)

const getMissingTask = async (
  _id: string,
): Promise<Result<Task, string>> => err('NOT_FOUND')

console.log(await getTaskById('1'))
// { ok: true, value: { id: '1', description: 'Fix bug' } }

console.log(await getMissingTask('999'))
// { ok: false, error: 'NOT_FOUND' }
```

---

### 3. Domain Error Factories with `createResult()`

Use `createResult()` when a boundary needs a shared rule for converting thrown or rejected values into a domain error type.

#### Fetch with custom error mapping and runtime validation

```ts
// Run: npx tsx api-fetch.ts
import {
  createResult,
  type Result,
  type ResultFactory,
} from 'super-result'
import { z } from 'zod'

type ApiErrorCode =
  | 'HTTP_ERROR'
  | 'INVALID_RESPONSE'
  | 'UNKNOWN'

class ApiError extends Error {
  constructor(
    message: string,
    public readonly code: ApiErrorCode,
    public readonly status: number | undefined = undefined,
    cause?: unknown,
  ) {
    super(message, { cause })
    this.name = 'ApiError'
  }
}

const ApiResult: ResultFactory<ApiError> = createResult((error) => {
  if (error instanceof ApiError) {
    return error
  }

  if (error instanceof Error) {
    return new ApiError(
      error.message,
      'UNKNOWN',
      undefined,
      error,
    )
  }

  return new ApiError(
    'Unexpected thrown value',
    'UNKNOWN',
    undefined,
    error,
  )
})

async function fetchValidatedJson<T>(
  url: string,
  parse: (input: unknown) => T,
): Promise<Result<T, ApiError>> {
  return ApiResult.from(async () => {
    const response = await fetch(url)

    if (!response.ok) {
      throw new ApiError(
        `HTTP ${response.status}`,
        'HTTP_ERROR',
        response.status,
      )
    }

    let data: unknown

    try {
      data = await response.json()
    } catch (cause) {
      throw new ApiError(
        'Failed to parse response JSON',
        'INVALID_RESPONSE',
        response.status,
        cause,
      )
    }

    try {
      return parse(data)
    } catch (cause) {
      throw new ApiError(
        'Response validation failed',
        'INVALID_RESPONSE',
        response.status,
        cause,
      )
    }
  })
}

const HealthSchema = z.object({
  status: z.string(),
})

const result = await fetchValidatedJson(
  '[https://api.example.com/health](https://api.example.com/health)',
  input => HealthSchema.parse(input),
)

if (!result.ok) {
  console.error('Code:', result.error.code)
  console.error('Status:', result.error.status)
  console.error('Message:', result.error.message)
} else {
  console.log('Status:', result.value.status)
}
```

The parser supplies the application type through runtime validation.

The factory maps exceptions and rejections. It does not infer HTTP failure from a fulfilled `Response`, so the callback explicitly checks the status.

---

### 4. Caller-Handled Narrowing

Narrow the Result, return early, then work with the successful value.

#### Propagate compatible failures directly

```ts
// Run: npx tsx propagate.ts
import { ok, type Result } from 'super-result'

interface Config {
  port: number
}

function loadConfig(): Result<Config, Error> {
  return ok({ port: 3000 })
}

function startServer(
  config: Config,
): Result<void, Error> {
  console.log(`Starting server on port ${config.port}`)
  return ok(undefined)
}

function main(): Result<void, Error> {
  const configResult = loadConfig()

  if (!configResult.ok) {
    return configResult
  }

  return startServer(configResult.value)
}

console.log(main())
// { ok: true, value: undefined }
```

Once narrowed to the failure branch, the failure Result can be returned directly when its error type is compatible with the caller's return type.

#### HTTP status and body parsing

```ts
// Run: npx tsx http-narrowing.ts
import { err, from, ok, type Result } from 'super-result'

interface ApiResponse<T> {
  status: number
  data: T
}

async function callApi(
  url: string,
): Promise<Result<ApiResponse<unknown>, Error>> {
  const responseResult = await from(() => fetch(url))
  if (!responseResult.ok) return responseResult

  const response = responseResult.value

  if (!response.ok) {
    return err(new Error(`HTTP ${response.status}`))
  }

  const dataResult = await from(async () => {
    const data: unknown = await response.json()
    return data
  })
  if (!dataResult.ok) return dataResult

  return ok({
    status: response.status,
    data: dataResult.value,
  })
}

const result = await callApi('[https://api.example.com/data](https://api.example.com/data)')

if (!result.ok) {
  console.error('Request failed:', result.error.message)
} else {
  console.log('HTTP status:', result.value.status)
  console.log('Data:', result.value.data)
}
```

Network, HTTP, and parsing failures use the outer Result. A second success/failure flag inside the successful value is unnecessary for this policy.

#### Continue after item failures

```ts
// Run: npx tsx batch-continue.ts
import { err, ok, type Result } from 'super-result'

async function processItem(
  id: number,
): Promise<Result<string, Error>> {
  if (id === 2) {
    return err(new Error('Item 2 failed'))
  }

  return ok(`Processed ${id}`)
}

async function main() {
  const items =[1][2][3][4][5]
  let succeeded = 0
  let failed = 0

  for (const id of items) {
    const result = await processItem(id)

    if (!result.ok) {
      console.warn(`Skipping ${id}: ${result.error.message}`)
      failed++
      continue
    }

    console.log(result.value)
    succeeded++
  }

  console.log({
    total: items.length,
    succeeded,
    failed,
  })
}

await main()
// Four successes and one handled failure.
// { total: 5, succeeded: 4, failed: 1 }
```

---

### 5. Preserve Error Information

#### Add context when returning a failure

```ts
// Run: npx tsx error-context.ts
import { err, ok, type Result } from 'super-result'

function loadConfig(): Result<string, Error> {
  return err(new Error('Config file not found'))
}

function main(): Result<void, Error> {
  const configResult = loadConfig()

  if (!configResult.ok) {
    return err(
      new Error('Startup failed', {
        cause: configResult.error,
      }),
    )
  }

  console.log('Loaded config:', configResult.value)
  return ok(undefined)
}

console.log(main())
// Failure containing a contextual error with the original error as cause.
```

Use `err(existingError)` when constructing a failure from an existing error. Return an existing failure Result directly when no additional context is needed.

#### Preserve unknown thrown values

```ts
// Run: npx tsx unknown-throw.ts
import { fromUnknown } from 'super-result'

interface RateLimitError {
  code: 'RATE_LIMITED'
  retryAfterMs: number
}

function isRateLimitError(
  value: unknown,
): value is RateLimitError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'code' in value &&
    value.code === 'RATE_LIMITED' &&
    'retryAfterMs' in value &&
    typeof value.retryAfterMs === 'number' &&
    Number.isFinite(value.retryAfterMs) &&
    value.retryAfterMs >= 0
  )
}

const result = fromUnknown(() => {
  throw {
    code: 'RATE_LIMITED',
    retryAfterMs: 1000,
  }
})

if (!result.ok) {
  if (isRateLimitError(result.error)) {
    console.log(
      'Rate limited, retry after:',
      result.error.retryAfterMs,
      'ms',
    )
  } else {
    console.error('Unexpected thrown value:', result.error)
  }
}
```

Keeping the error as `unknown` requires callers to inspect it before using its properties.

---

## FAQ

### Is this just Promises?

No.

A `Promise<T>` models asynchronous completion and may reject.

A `Result<T, E>` models a successful value or an explicit failure value.

Use both when needed:

```ts
Promise<Result<User, Error>>
```

That return type describes the resolved value. It does not, by itself, prevent the Promise from rejecting.

### Should every function return a Result?

No.

Use Results where failures are expected and callers need to decide what happens next: network calls, filesystem work, subprocesses, parsing, database access, and third-party libraries.

Do not introduce Results mechanically into every function.

### Does TypeScript force every Result to be handled?

No.

TypeScript requires narrowing before accessing variant-specific properties. Callers can still discard a returned Result.

### Does a Result return type prevent exceptions?

No.

The implementation must capture exceptions and rejections that it intends to represent as Results.

Operations outside a wrapper can still throw or reject.

### Does `from()` treat a returned `Err` as an exception?

A returned failure Result is a normal value, not an exception.

Handle Result-returning functions directly. Do not assume automatic flattening when wrapping one with `from()`.

### Does `from(() => fetch(url))` treat HTTP 404 as an error?

No.

Check `response.ok` or `response.status` and apply your own HTTP failure policy.

### Does a generic type validate JSON?

No.

A type assertion such as `as T` does not validate external data.

Use a runtime parser or schema when the payload must match an application type.

### Why no chaining?

The intended API is ordinary TypeScript control flow: checks, early returns, and direct access after narrowing.

If fluent composition is central to your codebase, choose a Result library designed for it.

---

## Why Super-Result?

### Make expected failures visible

A value-returning signature does not describe which exceptions may occur.

A Result-returning signature makes modeled failure values part of the API:

```ts
function getUser(id: string): Result<User, DbError>
```

Callers can see the success and failure types and handle them explicitly.

### Keep control flow familiar

Use the same `if` statements and early returns you already use elsewhere.

No pipeline API is required.

### Centralize boundary error mapping

Use `createResult()` to give a subsystem a shared rule for converting exceptions and rejections into domain errors.

### Design useful failures

Choose error representations that help callers decide what to do next:

- Retry
- Report invalid input
- Skip an item
- Return an HTTP response
- Add context
- Stop the operation

The library makes these decisions explicit. It does not make every runtime failure predictable or eliminate the need to test failure paths.

---

## License

MIT © [simwai](https://gitlab.com/simwai)