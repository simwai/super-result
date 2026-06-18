# createResult

Creates a specialized Result factory with a custom error mapping function.

## Definition

```ts
function createResult<E>(
  mapError: (error: unknown) => E
): ResultFactory<E>
```

## ResultFactory\<E\>

An object containing a scoped `from` method that uses your custom mapper.

```ts
interface ResultFactory<E> {
  from<T>(fn: () => PromiseLike<T>): ResultAsync<T, E>
  from<T>(fn: () => T): Result<T, E>
  from<T>(promise: PromiseLike<T>): ResultAsync<T, E>
}
```

## Example

This is useful for ensuring all errors in a specific domain are mapped to a common error type.

```ts
class MyDomainError extends Error {
  constructor(message: string, public code: number) {
    super(message)
  }
}

const R = createResult((err) => {
  if (err instanceof MyDomainError) return err
  return new MyDomainError(String(err), 500)
})

const res = R.from(() => { throw 'Unexpected' })
// res.error is guaranteed to be MyDomainError
```
