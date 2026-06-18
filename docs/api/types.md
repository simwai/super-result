# Result & ResultAsync

These are the core types used throughout the library.

## Result\<T, E\>

A discriminated union representing either success (`Ok`) or failure (`Err`).

### Definition
```ts
type Result<T, E> = Ok<T> | Err<E>
```

### Ok\<T\>
```ts
interface Ok<T> {
  readonly ok: true
  readonly value: T
}
```

### Err\<E\>
```ts
interface Err<E> {
  readonly ok: false
  readonly error: E
}
```

---

## ResultAsync\<T, E\>

A Promise that resolves to a `Result`.

### Definition
```ts
type ResultAsync<T, E> = Promise<Result<T, E>>
```
