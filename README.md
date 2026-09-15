![super-result](https://gitlab.com/simwai/super-result/-/raw/master/assets/banner.svg)

# super-result

**Lightweight Result pattern for cleaner error handling in TypeScript.**
Minimal syntax, maximum type safety.

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

  if (!result.ok) {
    console.error('Failed to fetch: ', result.error.message)
    return result
  }

  console.log('Fetched successfully: ', result.value)
  return result
}

const result = await safeFetch('https://api.example.com/health')

if (!result.ok) {
  // Optionally, do something if your result isn't ok.
}
```

---

## Core API

| Function | Use when |
| --- | --- |
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

> These patterns are drawn from a production codebase using super-result.

### 1. Wrap External Boundaries with `from()` — The Primary Pattern

The `from()` function is the main entry point. Use it at every unsafe boundary: external libraries, HTTP clients, filesystem calls, subprocesses, database drivers, and parsers. One wrapper owns the unsafe dependency; callers receive a typed `Result`.

#### Sync throwables (JSON.parse, Zod schema parsing)

```ts
// Copy-paste runnable: npx tsx safe-json.ts
import { from } from 'super-result'
import { z } from 'zod'

// JSON.parse
export function safeJsonParse<T = unknown>(input: string) {
  return from(() => JSON.parse(input))
}

// Zod schema
const UserSchema = z.object({
  name: z.string().min(1),
  age: z.number().int().positive(),
})
function parseUser(input: unknown) {
  return from(() => UserSchema.parse(input))
}

// Usage
console.log(safeJsonParse('{"name":"Alice"}'))
// { ok: true, value: { name: 'Alice' } }
console.log(safeJsonParse('not json'))
// { ok: false, error: Error: Unexpected token 'n', ... }

console.log(parseUser({ name: 'Alice', age: 30 }))
// { ok: true, value: { name: 'Alice', age: 30 } }
console.log(parseUser({ name: '', age: -5 }))
// { ok: false, error: ZodError: [...] }
```

#### Async / Promises (fetch, HTTP body parsing)

```ts
// Copy-paste runnable: npx tsx fetch-json.ts
import { from, err, type Result } from 'super-result'

async function fetchJson<T>(url: string): Promise<Result<T, Error>> {
  const responseResult = await from(fetch(url))
  if (!responseResult.ok) return responseResult

  const response = responseResult.value
  if (!response.ok) {
    return err(new Error(`Request failed: ${response.status}`))
  }

  return from(response.json() as Promise<T>)
}

// Usage
const result = await fetchJson<{ status: string }>('https://api.example.com/health')
if (!result.ok) {
  console.error('Failed:', result.error.message)
} else {
  console.log('Success:', result.value)
}
```

#### Child processes (with pre-validation)

```ts
// Copy-paste runnable: npx tsx exec-async.ts
import { from } from 'super-result'
import { execSync } from 'node:child_process'

// Simple allowlist validation
const ALLOWED_COMMANDS = ['echo', 'ls', 'cat', 'node', 'pnpm']

function assertSafeCommand(command: string): void {
  const parts = command.trim().split(/\s+/)
  if (!ALLOWED_COMMANDS.includes(parts[0])) {
    throw new Error(`Command not allowed: ${parts[0]}`)
  }
}

export function execAsync(command: string): ReturnType<typeof from> {
  assertSafeCommand(command)
  return from(() => execSync(command, { encoding: 'utf8' }))
}

// Usage
console.log(execAsync('echo hello')) // { ok: true, value: 'hello\n' }
console.log(execAsync('rm -rf /'))   // { ok: false, error: Error: Command not allowed: rm }
```

#### Filesystem sync helpers

```ts
// Copy-paste runnable: npx tsx safe-fs.ts
import { from } from 'super-result'
import * as fs from 'node:fs'

export const safeExistsSync = (p: string) => from(() => fs.existsSync(p))
export const safeReadFileSync = (p: string, encoding: BufferEncoding = 'utf8') =>
  from(() => fs.readFileSync(p, encoding))
export const safeWriteFileSync = (p: string, data: string) =>
  from(() => fs.writeFileSync(p, data))
export const safeReaddirSync = (p: string) => from(() => fs.readdirSync(p))
export const safeStatSync = (p: string) => from(() => fs.statSync(p))

// Usage
console.log(safeWriteFileSync('./demo.txt', 'hello'))
// { ok: true, value: undefined }

console.log(safeReadFileSync('./demo.txt'))
// { ok: true, value: 'hello' }

console.log(safeReadFileSync('./missing.txt'))
// { ok: false, error: Error: ENOENT: no such file or directory, ... }
```

#### External API calls (null-safe receivers)

```ts
// Copy-paste runnable: npx tsx external-api.ts
import { from } from 'super-result'

// Simulated external client with optional methods
interface BotClient {
  api?: {
    sendMessage: (chatId: number, text: string) => Promise<{ message_id: number }>
  }
}

const bot: BotClient = {
  api: {
    async sendMessage(chatId: number, text: string) {
      if (text.length > 4096) throw new Error('Message too long')
      return { message_id: Math.random() }
    },
  },
}

async function sendMessageSafe(
  bot: BotClient,
  chatId: number,
  text: string,
) {
  const result = await from(async () =>
    await bot.api?.sendMessage(chatId, text),
  )

  if (!result.ok) {
    console.error('Failed to send:', result.error.message)
    return false
  }
  console.log('Sent:', result.value)
  return true
}

// Usage
await sendMessageSafe(bot, 123, 'Hello!')       // Sent: { message_id: 0.123 }
await sendMessageSafe(bot, 123, 'x'.repeat(5000)) // Failed to send: Message too long
```

---

### 2. Construct Results Directly with `ok()` / `err()` — Domain Errors

Use `ok()` and `err()` when the success value or error is already known — no throwable to wrap. This is the pattern for domain-level error types (string discriminators, custom error classes).

#### Auth flows with string discriminators

```ts
// Copy-paste runnable: npx tsx auth-flow.ts
import { err, ok, type Result } from 'super-result'

interface User { id: string; username: string }
interface TokenPair { access: string; refresh: string }

const users = new Map<string, User>()

async function register(username: string, password: string): Promise<Result<User, string>> {
  if (users.has(username)) return err('USERNAME_TAKEN')
  const user: User = { id: crypto.randomUUID(), username }
  users.set(username, user)
  return ok(user)
}

async function login(username: string, password: string): Promise<Result<TokenPair, string>> {
  const user = users.get(username)
  if (!user) return err('INVALID_CREDENTIALS')
  // In real code: verify password hash
  const tokens: TokenPair = { access: 'access-' + user.id, refresh: 'refresh-' + user.id }
  return ok(tokens)
}

// Usage
console.log(await register('alice', 'secret')) // { ok: true, value: { id: '...', username: 'alice' } }
console.log(await register('alice', 'secret')) // { ok: false, error: 'USERNAME_TAKEN' }
console.log(await login('alice', 'wrong'))     // { ok: true, value: { access: '...', refresh: '...' } }
console.log(await login('bob', 'secret'))      // { ok: false, error: 'INVALID_CREDENTIALS' }
```

#### Typed custom errors (no external dependencies)

```ts
// Copy-paste runnable: npx tsx typed-errors.ts
import { err, ok, type Result } from 'super-result'

class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly cause?: unknown,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

function riskyOperation(shouldFail: boolean): Result<string, AppError> {
  if (shouldFail) {
    return err(new AppError('Operation failed', 'OPERATION_FAILED', new Error('root cause')))
  }
  return ok('success')
}

// Usage
const success = riskyOperation(false)
console.log(success) // { ok: true, value: 'success' }

const failure = riskyOperation(true)
console.log(failure)
// { ok: false, error: AppError: Operation failed { code: 'OPERATION_FAILED', cause: Error: root cause } }

// Type-safe error handling
if (!failure.ok) {
  console.log('Code:', failure.error.code) // 'OPERATION_FAILED'
  console.log('Cause:', failure.error.cause)
}
```

#### Test mocks with deterministic Results

```ts
// Copy-paste runnable: npx tsx test-mocks.ts
import { err, ok, type Result } from 'super-result'

interface Task { id: string; description: string }

const task: Task = { id: '1', description: 'Fix bug' }

// Mock returning success
const getTaskById = async (id: string): Promise<Result<Task, string>> => ok(task)

// Mock returning failure
const getMissingTask = async (id: string): Promise<Result<Task, string>> => err('NOT_FOUND')

// Mock returning array of steps
const replan = async (): Promise<Result<Array<{ description: string; command: string; index: number }>, string>> =>
  ok([{ description: 'retry', command: 'echo retry', index: 0 }])

// Usage in tests
const found = await getTaskById('1')
console.log(found) // { ok: true, value: { id: '1', description: 'Fix bug' } }

const missing = await getMissingTask('999')
console.log(missing) // { ok: false, error: 'NOT_FOUND' }

const plan = await replan()
console.log(plan) // { ok: true, value: [{ description: 'retry', ... }] }
```

---

### 3. Domain Error Factories with `createResult()` — Consistent Error Types

Use `createResult()` when one part of your application needs a consistent error type across a boundary. It builds a `ResultFactory<E>` that maps any thrown value to your domain error type `E`.

#### API fetch with custom error mapping

```ts
// Copy-paste runnable: npx tsx api-fetch.ts
import { createResult, type ResultFactory } from 'super-result'

// Domain error type
class ApiError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status?: number,
    public readonly cause?: unknown,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Factory: all errors become ApiError
const ApiResult: ResultFactory<ApiError> = createResult((error) => {
  if (error instanceof ApiError) return error
  if (error instanceof Response) {
    return new ApiError(`HTTP ${error.status}`, 'HTTP_ERROR', error.status)
  }
  if (error instanceof Error) {
    return new ApiError(error.message, 'UNKNOWN', undefined, error)
  }
  return new ApiError(String(error), 'UNKNOWN')
})

async function fetchJson<T>(url: string): Promise<ReturnType<typeof ApiResult.from<T>>> {
  return ApiResult.from(async () => {
    const response = await fetch(url)
    if (!response.ok) throw response
    return response.json() as Promise<T>
  })
}

// Usage
const result = await fetchJson<{ status: string }>('https://api.example.com/health')
if (!result.ok) {
  console.error('Code:', result.error.code)     // 'HTTP_ERROR' or 'UNKNOWN'
  console.error('Status:', result.error.status) // 404, 500, etc.
  console.error('Message:', result.error.message)
} else {
  console.log('Data:', result.value)
}
```

#### ORM / Database result adapter (shared helper)

```ts
// Copy-paste runnable: npx tsx orm-adapter.ts
import { createResult, type ResultFactory } from 'super-result'

// Domain error type
class DbError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly query?: string,
    public readonly cause?: unknown,
  ) {
    super(message)
    this.name = 'DbError'
  }
}

// Shared factory across the package
const DbResult: ResultFactory<DbError> = createResult((error) => {
  if (error instanceof DbError) return error
  if (error instanceof Error) {
    // Map known DB errors
    if (error.message.includes('UNIQUE constraint')) {
      return new DbError('Duplicate entry', 'UNIQUE_VIOLATION', undefined, error)
    }
    if (error.message.includes('FOREIGN KEY constraint')) {
      return new DbError('Referenced record not found', 'FK_VIOLATION', undefined, error)
    }
    return new DbError(error.message, 'QUERY_FAILED', undefined, error)
  }
  return new DbError(String(error), 'UNKNOWN')
})

export const withResult = DbResult.from

// Simulated repository
interface User { id: string; email: string }
const users = new Map<string, User>()

async function findUserByEmail(email: string) {
  return withResult(async () => {
    const user = Array.from(users.values()).find(u => u.email === email)
    if (!user) throw new Error('NOT_FOUND')
    return user
  })
}

async function createUser(email: string) {
  return withResult(async () => {
    if (users.has(email)) throw new Error('UNIQUE constraint failed')
    const user: User = { id: crypto.randomUUID(), email }
    users.set(email, user)
    return user
  })
}

// Usage
console.log(await createUser('alice@example.com'))
// { ok: true, value: { id: '...', email: 'alice@example.com' } }

console.log(await createUser('alice@example.com'))
// { ok: false, error: DbError: Duplicate entry { code: 'UNIQUE_VIOLATION', ... } }

console.log(await findUserByEmail('bob@example.com'))
// { ok: false, error: DbError: ... { code: 'QUERY_FAILED', ... } }
```

---

### 4. Caller-Handled Narrowing — No Chaining, Just `if` Statements

This is the core philosophy: narrow with `if (result.ok)` or `if (!result.ok)`, return early, access `.value` or `.error`. No fluent combinators (`.map()`, `.andThen()`, `.match()`, `.unwrapOr()`). Explicit control flow beats implicit pipelines.

#### Early return on failure

```ts
// Copy-paste runnable: npx tsx early-return.ts
import { err, ok, type Result } from 'super-result'

interface Session { id: string; userId: string }
const sessions = new Map<string, Session>()

async function getSessionById(id: string): Promise<Result<Session, { kind: 'NOT_FOUND' }>> {
  const session = sessions.get(id)
  if (!session) return err({ kind: 'NOT_FOUND' })
  return ok(session)
}

async function ensureSession(sessionId: string): Promise<string> {
  const result = await getSessionById(sessionId)
  if (result.ok) return result.value.id

  // Handle specific error kind
  if (result.error.kind === 'NOT_FOUND') {
    const newSession: Session = { id: crypto.randomUUID(), userId: 'anonymous' }
    sessions.set(newSession.id, newSession)
    console.log('Auto-created session:', newSession.id)
    return newSession.id
  }

  // Unreachable with current error type, but TypeScript knows
  throw new Error('Unhandled error kind')
}

// Usage
console.log(await ensureSession('existing'))  // Auto-created session: ...
console.log(await ensureSession('new-one'))   // Auto-created session: ...
```

#### Multi-step narrowing with HTTP status

```ts
// Copy-paste runnable: npx tsx http-narrowing.ts
import { err, from, ok, type Result } from 'super-result'

interface ApiResponse<T> {
  ok: boolean
  status: number
  data?: T
  error?: string
}

async function callApi<T>(url: string): Promise<Result<ApiResponse<T>, Error>> {
  const responseResult = await from(fetch(url))
  if (!responseResult.ok) return responseResult

  const response = responseResult.value
  if (!response.ok) {
    return err(new Error(`HTTP ${response.status}`))
  }

  const data = await response.json() as T
  return ok({ ok: true, status: response.status, data })
}

// Usage
const result = await callApi<{ message: string }>('https://api.example.com/data')

if (!result.ok) {
  console.error('Network error:', result.error.message)
} else if (!result.value.ok) {
  console.error(`API error ${result.value.status}:`, result.value.error)
} else {
  console.log('Success:', result.value.data)
}
```

#### Why no chaining

`super-result` has no `.map()`, `.andThen()`, `.match()`, or `.unwrapOr()`. The explicit `if (result.ok)` style above is the intended API — every branch visible, types precise.

---

### 5. Foundational Patterns (Reference)

Condensed reference — these patterns are demonstrated in the sections above. Each is copy-paste runnable.

#### Propagate compatible Results directly

```ts
// Copy-paste runnable: npx tsx propagate.ts
import { err, ok, type Result } from 'super-result'

function loadConfig(): Result<{ port: number }, Error> {
  return ok({ port: 3000 })
}

function startServer(config: { port: number }): Result<void, Error> {
  console.log(`Server on ${config.port}`)
  return ok(undefined)
}

function main(): Result<void, Error> {
  const configResult = loadConfig()
  if (!configResult.ok) return configResult
  return startServer(configResult.value)
}

console.log(main()) // { ok: true, value: undefined }
```

#### `err()` is for a new error

```ts
// Copy-paste runnable: npx tsx err-pattern.ts
import { err, ok, type Result } from 'super-result'

function loadConfig(): Result<string, Error> {
  return err(new Error('Config file not found'))
}

function main(): Result<void, Error> {
  const configResult = loadConfig()
  if (!configResult.ok) {
    return err(new Error(`Startup failed: ${configResult.error.message}`))
  }
  return ok(undefined)
}

console.log(main())
// { ok: false, error: Error: Startup failed: Config file not found }
```

#### Handle HTTP status explicitly

See **Pattern 1 → Async/Promises** and **Pattern 4 → Multi-step narrowing** for full examples.

#### Preserve unknown thrown values

```ts
// Copy-paste runnable: npx tsx unknown-throw.ts
import { fromUnknown } from 'super-result'

const result = fromUnknown(() => {
  throw { code: 'RATE_LIMITED', retryAfterMs: 1000 }
})

if (!result.ok) {
  const err = result.error as { code: string; retryAfterMs: number }
  console.log('Rate limited, retry after:', err.retryAfterMs, 'ms')
}
```

#### Validate external data with Zod

See **Pattern 1 → Sync throwables (Zod schema parsing)** for full example.

#### Continue after item failures

```ts
// Copy-paste runnable: npx tsx batch-continue.ts
import { err, ok, type Result } from 'super-result'

async function processItem(id: number): Promise<Result<string, Error>> {
  if (id === 2) return err(new Error('Item 2 failed'))
  await new Promise(r => setTimeout(r, 10))
  return ok(`Processed ${id}`)
}

async function main() {
  const items = [1, 2, 3, 4, 5]
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

  console.log({ total: items.length, succeeded, failed })
}

await main()
// Processed 1
// Skipping 2: Item 2 failed
// Processed 3
// Processed 4
// Processed 5
// { total: 5, succeeded: 4, failed: 1 }
```

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

MIT © [simwai](https://gitlab.com/simwai)