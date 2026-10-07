![super-result](https://gitlab.com/simwai/super-result/-/raw/master/assets/banner.svg)

# super-result

**Lightweight Result pattern for cleaner error handling in TypeScript.**

Minimal syntax, explicit failures.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-260b28?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-20+-260b28?style=flat-square&logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-260b28?style=flat-square)](https://gitlab.com/simwai/super-result/-/blob/master/LICENSE)

A small Result utility for codebases that prefer ordinary TypeScript control flow over fluent chaining.

---

## Install

```bash
pnpm add super-result
# or
npm install super-result
# or
yarn add super-result
```

### Example prerequisites

The examples use Node.js 20+, strict TypeScript, and Zod 4.

The parsing, filesystem, and HTTP helpers below are application code, not exports from `super-result`.

Install the example dependencies:

```bash
pnpm add zod@^4
pnpm add -D typescript tsx @types/node
```

For examples using top-level `await`, use an ESM project:

```json
{
  "type": "module"
}
```

A minimal TypeScript configuration:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM"],
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true
  },
  "include": ["*.ts"]
}
```

Run and type-check examples separately:

```bash
npx tsx example.ts
npx tsc
```

`tsx` executes TypeScript without type-checking it.

The `.js` relative imports are intentional for NodeNext projects. The corresponding source files are `.ts` files.

HTTP examples use placeholder URLs. Replace them with real endpoints before running them.

---

## Quick Start

Wrap an unsafe call, then handle its Result with ordinary control flow.

```ts
// quick-start.ts
import { from } from 'super-result'
import { z } from 'zod'

const ConfigSchema = z.object({
  port: z.number().int().min(1).max(65535),
})

const result = from(() =>
  ConfigSchema.parse({ port: 3000 }),
)

if (!result.ok) {
  console.error('Invalid configuration:', result.error.message)
} else {
  console.log('Configured port:', result.value.port)
}
```

For repeated operations, extract the wrapper into a shared helper. The examples below reuse parsing and boundary helpers instead of repeating error handling.

---

## Core API

| Function | Purpose |
| --- | --- |
| `ok(value)` | Construct a successful `Ok<T>` |
| `err(error)` | Construct a failure `Err<E>` |
| `from(fn)` | Capture a throwing callback or rejected Promise, normalizing the failure to `Error` |
| `fromUnknown(fn)` | Capture a thrown or rejected value without converting it; the error remains `unknown` |
| `createResult(mapError)` | Create a scoped factory with a shared error-mapping rule |

`from()` supports synchronous callbacks, asynchronous callbacks, and Promise inputs.

A Result has this shape:

```ts
type Result<T, E> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E }
```

For asynchronous operations, use:

```ts
Promise<Result<T, E>>
```

`ResultAsync<T, E>` is available as a deprecated alias for `Promise<Result<T, E>>`.

### Prefer callbacks at unsafe boundaries

Both forms can capture Promise rejection:

```ts
await from(fetch(url))
await from(() => fetch(url))
```

The callback form also puts invocation inside the wrapper. Prefer it when invoking the dependency might throw synchronously.

### Handle existing Results directly

If a function already returns a Result, inspect that Result:

```ts
const result = await resultReturningFunction()

if (!result.ok) {
  return result
}
```

A returned `Err` is a normal value, not an exception. Do not assume that `from()` automatically flattens a Result returned by its callback.

---

## Philosophy

### Control flow, not pipelines

`super-result` is for straightforward TypeScript:

- Narrow with `if (result.ok)` or `if (!result.ok)`.
- Return early when a function cannot continue.
- Access `.value` in the success branch.
- Access `.error` in the failure branch.
- Propagate compatible failure Results directly.
- Map returned failures directly when changing error types.

There are no fluent combinators such as `.map()`, `.andThen()`, or `.orElse()`.

If you prefer a chaining-heavy API, use a library built for that.

If you prefer `if` statements and early returns with typed failures, this is the small option.

### Keep exception handling at boundaries

The examples do not require handwritten `try/catch` blocks.

Use `from()` or a factory's `.from()` around dependencies that can throw or reject. Use direct Result checks once the boundary has returned.

Do not throw a returned error merely to catch and convert it again.

### What the types guarantee

The discriminated union makes modeled success and failure explicit.

TypeScript requires narrowing before accessing variant-specific properties. It does not require callers to consume every Result.

A Result return annotation does not prevent a function from throwing or an asynchronous function from rejecting. The implementation must capture the failures it intends to represent as Results.

---

## 1. Shared Parsing Helpers

Define parsing boundaries once and reuse them for configuration, JSON strings, HTTP responses, and other external data.

```ts
// parsing.ts
import { from, type Result } from 'super-result'
import { z } from 'zod'

export function safeParse<S extends z.ZodType>(
  schema: S,
  input: unknown,
): Result<z.output<S>, Error> {
  return from(() => schema.parse(input))
}

export async function safeParseAsync<S extends z.ZodType>(
  schema: S,
  input: unknown,
): Promise<Result<z.output<S>, Error>> {
  return from(() => schema.parseAsync(input))
}

export function safeJsonDecode(
  input: string,
): Result<unknown, Error> {
  return from(() => {
    const value: unknown = JSON.parse(input)
    return value
  })
}

export function safeJsonParse<S extends z.ZodType>(
  schema: S,
  input: string,
): Result<z.output<S>, Error> {
  const decoded = safeJsonDecode(input)
  if (!decoded.ok) return decoded

  return safeParse(schema, decoded.value)
}

export async function safeJsonParseAsync<S extends z.ZodType>(
  schema: S,
  input: string,
): Promise<Result<z.output<S>, Error>> {
  const decoded = safeJsonDecode(input)
  if (!decoded.ok) return decoded

  return safeParseAsync(schema, decoded.value)
}
```

These helpers use Zod's throwing parsing methods inside `from()`, adapting them to the library's Result shape.

Use the asynchronous helpers for schemas with asynchronous refinements or transforms.

The successful type is `z.output<S>`, representing the value after validation and schema transformations.

### Reuse schemas

```ts
// schemas.ts
import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  age: z.number().int().nonnegative(),
})

export const UsersSchema = z.array(UserSchema)

export const CreateUserSchema = UserSchema.omit({
  id: true,
})

export type User = z.output<typeof UserSchema>
export type CreateUserInput = z.input<typeof CreateUserSchema>
```

Use the same schema for objects and JSON strings:

```ts
// parse-user.ts
import { safeJsonParse, safeParse } from './parsing.js'
import { UserSchema } from './schemas.js'

const input = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  name: 'Alice',
  age: 30,
}

const objectResult = safeParse(UserSchema, input)

const jsonResult = safeJsonParse(
  UserSchema,
  JSON.stringify(input),
)

if (!jsonResult.ok) {
  console.error('Invalid user:', jsonResult.error.message)
} else {
  console.log('Validated user:', jsonResult.value.name)
}

console.log(objectResult)
console.log(safeJsonParse(UserSchema, 'not json'))
console.log(safeParse(UserSchema, { name: '', age: -5 }))
```

JSON decoding establishes that the input is valid JSON. Schema validation establishes that the decoded value matches the application contract.

---

## 2. Shared HTTP Helpers

Every JSON HTTP helper requires a Zod schema.

Callers provide schemas, not unchecked response types. Fetching, HTTP status handling, body decoding, and response validation are separate reusable steps.

```ts
// http.ts
import { err, from, ok, type Result } from 'super-result'
import { z } from 'zod'
import { safeParseAsync } from './parsing.js'

export type HttpErrorCode =
  | 'NETWORK_ERROR'
  | 'HTTP_ERROR'
  | 'INVALID_JSON'
  | 'INVALID_RESPONSE'

export class HttpError extends Error {
  constructor(
    message: string,
    public readonly code: HttpErrorCode,
    public readonly status: number | undefined = undefined,
    cause?: unknown,
  ) {
    super(message, { cause })
    this.name = 'HttpError'
  }
}

export interface HttpResponse<T> {
  status: number
  data: T
}

export async function safeFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Result<Response, HttpError>> {
  const result = await from(() => fetch(input, init))

  if (!result.ok) {
    return err(
      new HttpError(
        'Request failed',
        'NETWORK_ERROR',
        undefined,
        result.error,
      ),
    )
  }

  const response = result.value

  if (!response.ok) {
    return err(
      new HttpError(
        `HTTP ${response.status}`,
        'HTTP_ERROR',
        response.status,
      ),
    )
  }

  return ok(response)
}

export async function safeResponseJson<S extends z.ZodType>(
  response: Response,
  schema: S,
): Promise<Result<z.output<S>, HttpError>> {
  const decoded = await from(async () => {
    const data: unknown = await response.json()
    return data
  })

  if (!decoded.ok) {
    return err(
      new HttpError(
        'Failed to read or parse response JSON',
        'INVALID_JSON',
        response.status,
        decoded.error,
      ),
    )
  }

  const validated = await safeParseAsync(schema, decoded.value)

  if (!validated.ok) {
    return err(
      new HttpError(
        'Response schema validation failed',
        'INVALID_RESPONSE',
        response.status,
        validated.error,
      ),
    )
  }

  return ok(validated.value)
}

export async function fetchJsonResponse<S extends z.ZodType>(
  input: RequestInfo | URL,
  schema: S,
  init?: RequestInit,
): Promise<Result<HttpResponse<z.output<S>>, HttpError>> {
  const fetched = await safeFetch(input, init)
  if (!fetched.ok) return fetched

  const parsed = await safeResponseJson(fetched.value, schema)
  if (!parsed.ok) return parsed

  return ok({
    status: fetched.value.status,
    data: parsed.value,
  })
}

export async function fetchJson<S extends z.ZodType>(
  input: RequestInfo | URL,
  schema: S,
  init?: RequestInit,
): Promise<Result<z.output<S>, HttpError>> {
  const result = await fetchJsonResponse(input, schema, init)
  if (!result.ok) return result

  return ok(result.value.data)
}
```

### Responsibilities

| Helper | Responsibility |
| --- | --- |
| `safeFetch()` | Invoke fetch and reject unsuccessful HTTP status |
| `safeResponseJson()` | Decode a response body and validate it with Zod |
| `fetchJsonResponse()` | Fetch validated JSON and preserve HTTP status |
| `fetchJson()` | Fetch validated JSON and return only the data |

`NETWORK_ERROR` groups failures from invoking or awaiting fetch, including cancellation. Introduce more specific codes if callers need to distinguish these cases.

### HTTP policies and limitations

- `fetch()` does not reject solely because the server returns an HTTP error status. `safeFetch()` checks `response.ok`.
- JSON helpers expect a JSON body. For successful responses without a body, such as HTTP 204, use `safeFetch()`.
- `safeResponseJson()` validates the body only. HTTP status policy belongs to `safeFetch()`.
- `safeResponseJson()` consumes the body. Clone a Response before reading its body more than once.
- Error response bodies are not parsed by these helpers. Add a separate schema and policy if your API exposes structured error responses.
- These examples do not implement retries, body-size limits, or a default timeout.

### Schema-validated request

```ts
// health.ts
import { z } from 'zod'
import { fetchJson } from './http.js'

const HealthSchema = z.object({
  status: z.enum(['healthy', 'degraded']),
  version: z.string().min(1),
})

const result = await fetchJson(
  '[https://api.example.com/health](https://api.example.com/health)',
  HealthSchema,
  {
    signal: AbortSignal.timeout(10_000),
  },
)

if (!result.ok) {
  console.error('Code:', result.error.code)
  console.error('Status:', result.error.status)
  console.error('Message:', result.error.message)
} else {
  console.log('Service status:', result.value.status)
  console.log('Version:', result.value.version)
}
```

The success type is inferred from `HealthSchema`. No response type assertion is needed.

---

## 3. Endpoint Wrappers

Endpoint wrappers supply URLs, request options, and schemas. They reuse the shared HTTP and parsing layers.

```ts
// users.ts
import { err, from, type Result } from 'super-result'
import { fetchJson, fetchJsonResponse } from './http.js'
import { safeParse } from './parsing.js'
import {
  CreateUserSchema,
  UserSchema,
  UsersSchema,
} from './schemas.js'

export class InputError extends Error {
  readonly code = 'INVALID_INPUT'

  constructor(message: string, cause?: unknown) {
    super(message, { cause })
    this.name = 'InputError'
  }
}

function encodeJsonBody(
  input: unknown,
): Result<string, InputError> {
  const encoded = from(() => JSON.stringify(input))

  if (!encoded.ok) {
    return err(
      new InputError(
        'Failed to serialize request body',
        encoded.error,
      ),
    )
  }

  if (encoded.value === undefined) {
    return err(
      new InputError('Request body is not JSON-serializable'),
    )
  }

  return {
    ok: true,
    value: encoded.value,
  }
}

export function getUser(id: string) {
  return fetchJson(
    `https://api.example.com/users/${encodeURIComponent(id)}`,
    UserSchema,
  )
}

export function listUsers() {
  return fetchJson(
    '[https://api.example.com/users](https://api.example.com/users)',
    UsersSchema,
  )
}

export async function createUser(input: unknown) {
  const validated = safeParse(CreateUserSchema, input)

  if (!validated.ok) {
    return err(
      new InputError(
        'Request input validation failed',
        validated.error,
      ),
    )
  }

  const body = encodeJsonBody(validated.value)
  if (!body.ok) return body

  return fetchJsonResponse(
    '[https://api.example.com/users](https://api.example.com/users)',
    UserSchema,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body.value,
    },
  )
}
```

The creation wrapper validates input, captures JSON serialization failure, and validates the HTTP response.

Callers can distinguish input failures from request failures:

```ts
// create-user.ts
import { HttpError } from './http.js'
import { createUser } from './users.js'

const result = await createUser({
  name: 'Alice',
  age: 30,
})

if (!result.ok) {
  if (result.error instanceof HttpError) {
    console.error(
      'Request failed:',
      result.error.code,
      result.error.status,
    )
  } else {
    console.error('Invalid input:', result.error.message)
  }
} else {
  console.log('HTTP status:', result.value.status)
  console.log('Created user:', result.value.data)
}
```

### Test response validation without a network

```ts
// response-validation.ts
import { z } from 'zod'
import { safeResponseJson } from './http.js'

const HealthSchema = z.object({
  status: z.enum(['healthy', 'degraded']),
})

const validResponse = new Response(
  JSON.stringify({ status: 'healthy' }),
  {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  },
)

const invalidResponse = new Response(
  JSON.stringify({ status: 123 }),
  {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  },
)

const malformedResponse = new Response('not json', {
  status: 200,
})

console.log(await safeResponseJson(validResponse, HealthSchema))
// { ok: true, value: { status: 'healthy' } }

const invalid = await safeResponseJson(
  invalidResponse,
  HealthSchema,
)

if (!invalid.ok) {
  console.log(invalid.error.code)
  // INVALID_RESPONSE
}

const malformed = await safeResponseJson(
  malformedResponse,
  HealthSchema,
)

if (!malformed.ok) {
  console.log(malformed.error.code)
  // INVALID_JSON
}
```

---

## 4. Other External Boundaries

The same callback-wrapping pattern applies outside HTTP.

### Filesystem helpers

```ts
// filesystem.ts
import { from, type Result } from 'super-result'
import { promises as fs } from 'node:fs'
import { z } from 'zod'
import { safeJsonParseAsync } from './parsing.js'

export function safeReadText(
  path: string,
): Promise<Result<string, Error>> {
  return from(() => fs.readFile(path, 'utf8'))
}

export function safeWriteText(
  path: string,
  data: string,
): Promise<Result<void, Error>> {
  return from(() => fs.writeFile(path, data, 'utf8'))
}

export async function readValidatedJson<S extends z.ZodType>(
  path: string,
  schema: S,
): Promise<Result<z.output<S>, Error>> {
  const content = await safeReadText(path)
  if (!content.ok) return content

  return safeJsonParseAsync(schema, content.value)
}
```

### Configuration loading with direct error mapping

Reuse the filesystem and parsing helpers. Map returned failures directly instead of throwing them into another wrapper.

```ts
// config.ts
import { err, type Result } from 'super-result'
import { z } from 'zod'
import { readValidatedJson } from './filesystem.js'

export class ConfigError extends Error {
  readonly code = 'CONFIG_LOAD_FAILED'

  constructor(message: string, cause?: unknown) {
    super(message, { cause })
    this.name = 'ConfigError'
  }
}

const ConfigSchema = z.object({
  port: z.number().int().min(1).max(65535),
  logLevel: z.enum(['debug', 'info', 'warn', 'error']),
})

export type Config = z.output<typeof ConfigSchema>

export async function loadConfig(
  path: string,
): Promise<Result<Config, ConfigError>> {
  const result = await readValidatedJson(path, ConfigSchema)

  if (!result.ok) {
    return err(
      new ConfigError(
        'Failed to load configuration',
        result.error,
      ),
    )
  }

  return result
}
```

```ts
// load-config.ts
import { loadConfig } from './config.js'

const result = await loadConfig('./config.json')

if (!result.ok) {
  console.error(result.error.code, result.error.message)
  console.error('Cause:', result.error.cause)
} else {
  console.log('Port:', result.value.port)
  console.log('Log level:', result.value.logLevel)
}
```

### Child processes with separate arguments

```ts
// exec-sync.ts
import { err, from, type Result } from 'super-result'
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
      timeout: 5_000,
      maxBuffer: 1024 * 1024,
    }),
  )
}

console.log(runAllowedSync('echo', ['hello']))
// Success on a system with an echo executable.

console.log(runAllowedSync('rm', ['-rf', '/']))
// Failure: executable not allowed.
```

The executable and arguments are separate, and shell interpretation is disabled.

This is not a sandbox. Real applications may need trusted absolute executable paths, argument validation, filesystem restrictions, and process isolation.

`execFileSync()` blocks the event loop. Use an asynchronous subprocess API where blocking is unsuitable.

---

## 5. Construct Results Directly

Use `ok()` and `err()` when the success value or failure is already known.

### Domain errors

```ts
// reservation.ts
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

### Clients that already return Results

```ts
// result-client.ts
import { err, ok, type Result } from 'super-result'

interface Message {
  message_id: number
}

// Deterministic mock, not a real messaging client.
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

The caller handles the returned Result directly.

This does not catch unexpected exceptions or Promise rejection from a real implementation.

---

## 6. Domain Error Factories

Use `createResult()` when dependencies that throw or reject need the same error-mapping rule.

Unlike direct mapping of an existing Result, a factory is useful at the exception-producing boundary itself.

```ts
// filesystem-factory.ts
import {
  createResult,
  type Result,
  type ResultFactory,
} from 'super-result'
import { promises as fs } from 'node:fs'

class FileError extends Error {
  readonly code = 'FILE_OPERATION_FAILED'

  constructor(message: string, cause?: unknown) {
    super(message, { cause })
    this.name = 'FileError'
  }
}

const FileResult: ResultFactory<FileError> = createResult(
  (error) => {
    if (error instanceof FileError) {
      return error
    }

    return new FileError('File operation failed', error)
  },
)

export function readText(
  path: string,
): Promise<Result<string, FileError>> {
  return FileResult.from(() => fs.readFile(path, 'utf8'))
}

export function writeText(
  path: string,
  data: string,
): Promise<Result<void, FileError>> {
  return FileResult.from(() => fs.writeFile(path, data, 'utf8'))
}
```

Both boundary calls share the same mapping rule without handwritten `try/catch` blocks.

Use direct `err(...)` mapping when the dependency already returns a Result.

---

## 7. Caller-Handled Narrowing

### Propagate compatible failures

```ts
// propagate.ts
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
  if (!configResult.ok) return configResult

  return startServer(configResult.value)
}

console.log(main())
```

After narrowing to the failure branch, return it directly when its error type is compatible with the caller's return type.

### Continue after item failures

```ts
// batch.ts
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
// { total: 5, succeeded: 4, failed: 1 }
```

---

## 8. Preserve Error Information

### Add context without losing the original cause

```ts
// error-context.ts
import { err, type Result } from 'super-result'

function loadConfig(): Result<string, Error> {
  return err(new Error('Config file not found'))
}

function initialize(): Result<string, Error> {
  const result = loadConfig()

  if (!result.ok) {
    return err(
      new Error('Initialization failed', {
        cause: result.error,
      }),
    )
  }

  return result
}

console.log(initialize())
```

Use `err(existingError)` when constructing a failure from an existing error.

Return an existing failure Result directly when no extra context is needed.

### Validate unknown failures with the shared parser

```ts
// unknown-error.ts
import { fromUnknown } from 'super-result'
import { z } from 'zod'
import { safeParse } from './parsing.js'

const RateLimitSchema = z.object({
  code: z.literal('RATE_LIMITED'),
  retryAfterMs: z.number().int().nonnegative(),
})

// Simulates a dependency rejecting with a non-Error value.
const result = await fromUnknown(() =>
  Promise.reject({
    code: 'RATE_LIMITED',
    retryAfterMs: 1000,
  }),
)

if (!result.ok) {
  const rateLimit = safeParse(RateLimitSchema, result.error)

  if (!rateLimit.ok) {
    console.error('Unexpected rejected value:', result.error)
  } else {
    console.log(
      'Rate limited, retry after:',
      rateLimit.value.retryAfterMs,
      'ms',
    )
  }
}
```

This reuses the validation layer instead of asserting the shape of an unknown value.

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

That signature describes the resolved value. It does not, by itself, prevent the Promise from rejecting.

### Should every function return a Result?

No.

Use Results when failures are expected and callers need to decide what happens next.

Typical boundaries include network calls, filesystem work, subprocesses, parsing, database access, and third-party libraries.

Do not introduce Results mechanically into every function.

### Does TypeScript force every Result to be handled?

No.

It requires narrowing before accessing variant-specific properties. Callers can still discard a returned Result.

### Does a Result return type prevent exceptions?

No.

The implementation must capture the exceptions and rejections it intends to represent as Results.

### Do I need handwritten try/catch blocks?

Not for the boundary patterns shown here.

Use `from()` or a factory's `.from()` to capture exception-based dependencies. Handle existing Results with ordinary checks and early returns.

Avoid throwing returned errors merely to convert them back into Results.

### Does `from()` turn a returned Err into an outer failure?

A returned failure Result is a normal value, not an exception.

Handle Result-returning functions directly. Do not assume automatic flattening.

### Why do the JSON HTTP helpers require Zod?

A TypeScript type assertion does not validate an HTTP response.

The helpers require a schema so the successful return type is backed by runtime validation.

### Why use z.output<S>?

Schemas can transform their inputs.

`z.output<S>` describes the validated, transformed value returned by the schema.

### What about async Zod refinements?

Use `safeParseAsync()` or `safeJsonParseAsync()`.

The HTTP response parser already uses asynchronous schema parsing.

### Are the parsing and HTTP helpers part of the package?

No.

They demonstrate how to compose `super-result` with Zod and platform APIs in application code.

### Does safeFetch accept HTTP 404?

No.

The example helper converts unsuccessful HTTP status into `HttpError`.

The underlying `fetch()` API does not reject merely because the server returns HTTP 404.

### What about HTTP 204?

Use `safeFetch()` for endpoints that return no body.

The JSON helpers expect a body that can be decoded as JSON and validated against a schema.

### Why no chaining?

The intended API is ordinary TypeScript control flow: checks, early returns, and direct access after narrowing.

If fluent composition is central to your codebase, choose a Result library designed for it.

---

## Why Super-Result?

### Make expected failures visible

A Result-returning signature makes modeled failure values part of the API:

```ts
function getUser(id: string): Result<User, DbError>
```

Callers can see the success and failure types and handle them explicitly.

### Keep control flow familiar

Use the same `if` statements and early returns you already use elsewhere.

No pipeline API is required.

### Reuse boundary logic

Extract small helpers for parsing, fetching, and other dependencies.

Endpoint wrappers and application functions reuse those helpers instead of repeating exception handling and validation.

### Centralize error mapping

Use `createResult()` when a subsystem needs a shared rule for converting exceptions and rejections into domain errors.

Map existing failure Results directly when no exception boundary is involved.

### Design actionable failures

Choose error representations that help callers decide whether to:

- Retry
- Report invalid input
- Skip an item
- Return an HTTP response
- Add context
- Stop the operation

Results make those decisions explicit. They do not eliminate the need to test failure paths.

---

## License

MIT © [simwai](https://gitlab.com/simwai)