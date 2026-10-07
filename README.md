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

### Example prerequisites

The examples use Node.js 20+, strict TypeScript, and Zod 4.

Zod is used by the examples for runtime validation. The parsing and HTTP helpers below are application code, not exports from `super-result`.

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

The `.js` relative import paths in the examples are intentional for NodeNext projects. The corresponding source files are `.ts` files.

HTTP examples use placeholder URLs. Replace them with real endpoints before running them.

---

## Quick Start

Wrap an unsafe call and handle its Result with ordinary control flow.

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

For code used in multiple places, extract the wrapper into a shared helper. The parsing and HTTP examples below follow that pattern.

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

There are no fluent combinators such as `.map()`, `.andThen()`, or `.orElse()`.

If you prefer a chaining-heavy API, use a library built for that.

If you prefer `if` statements and early returns with typed failures, this is the small option.

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