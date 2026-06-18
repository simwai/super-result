# Core Concepts

## The Result Type

A `Result<T, E>` is a simple discriminated union:

```ts
type Result<T, E> =
  | { ok: true, value: T }
  | { ok: false, error: E }
```

Because it's a discriminated union on the `ok` property, TypeScript can perfectly narrow the type:

```ts
const result = getResult()

if (result.ok) {
  // TypeScript knows 'value' exists here
  console.log(result.value)
} else {
  // TypeScript knows 'error' exists here
  console.log(result.error)
}
```

## Async Handling

`ResultAsync<T, E>` is just a type alias for `Promise<Result<T, E>>`.

Unlike some other libraries that wrap promises in custom classes, `super-result` keeps it simple. You use standard `await` or `.then()` to work with results.

## Railway Oriented Programming (ROP)

The idea is to think of your functions as "tracks".
- The "Success" track continues the flow.
- The "Failure" track bypasses the rest of the logic.

By returning `Result` types, you force the caller to acknowledge the failure track before proceeding.
