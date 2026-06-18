# from & fromUnknown

These functions are the primary entry points for creating results. They safely execute functions or promises and capture any thrown errors.

## from()

Captures errors and ensures they are instances of the standard `Error` class.

### Overloads
```ts
// Synchronous function
function from<T>(fn: () => T): Result<T, Error>

// Asynchronous function
function from<T>(fn: () => PromiseLike<T>): ResultAsync<T, Error>

// Promise
function from<T>(promise: PromiseLike<T>): ResultAsync<T, Error>
```

### Example
```ts
const res = from(() => {
  if (Math.random() > 0.5) throw new Error('Boom')
  return 42
})
```

---

## fromUnknown()

Captures errors exactly as they are thrown, without any transformation.

### Overloads
```ts
// Synchronous function
function fromUnknown<T>(fn: () => T): Result<T, unknown>

// Asynchronous function
function fromUnknown<T>(fn: () => PromiseLike<T>): ResultAsync<T, unknown>

// Promise
function fromUnknown<T>(promise: PromiseLike<T>): ResultAsync<T, unknown>
```

### Example
```ts
const res = fromUnknown(() => {
  throw 'Some string error'
})

if (!res.ok) {
  console.log(typeof res.error) // 'string'
}
```
