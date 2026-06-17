[**super-result API v0.1.0**](../README.md)

***

[super-result API](../README.md) / createResult

# Function: createResult()

> **createResult**\<`E`\>(`mapError`): [`ResultFactory`](../interfaces/ResultFactory.md)\<`E`\>

Defined in: [index.ts:171](https://github.com/simwai/super-result/blob/0bc1c39ef5720eb6d5312b7353b4acd581ef9390/src/index.ts#L171)

Creates a specialized Result factory with a custom error mapping function.

This is useful for ensuring all errors in a specific domain are mapped to a
common error type (e.g., a custom error class).

## Type Parameters

### E

`E`

## Parameters

### mapError

(`error`) => `E`

A function that transforms unknown errors into the desired type E

## Returns

[`ResultFactory`](../interfaces/ResultFactory.md)\<`E`\>

A ResultFactory with a 'from' method using the provided mapper

## Example

```ts
class MyError extends Error {}
const R = createResult(e => e instanceof MyError ? e : new MyError(String(e)))

const res = R.from(() => { throw new Error('raw') })
// res.error is guaranteed to be MyError
```
