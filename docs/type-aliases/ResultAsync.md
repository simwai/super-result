[**super-result API v1.4.0**](../README.md)

***

[super-result API](../README.md) / ResultAsync

# ~~Type Alias: ResultAsync\<T, E\>~~

> **ResultAsync**\<`T`, `E`\> = `Promise`\<[`Result`](Result.md)\<`T`, `E`\>\>

Defined in: [index.ts:53](https://gitlab.com/simwai/super-result/-/blob/faa5e41e622b302945078a30dfc4b0ae73b14f21/src/index.ts#L53)

## Type Parameters

### T

`T`

### E

`E`

## Deprecated

Use Promise<Result<T, E> instead
A Promise that resolves to a Result.

Useful for representing asynchronous operations that can fail.

## Example

```ts
async function fetchData(): ResultAsync<Data, Error> {
  return from(fetch('/api/data').then(res => res.json()))
}
```
