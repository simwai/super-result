[**super-result API v1.3.1**](../README.md)

***

[super-result API](../README.md) / ResultAsync

# ~~Type Alias: ResultAsync\<T, E\>~~

> **ResultAsync**\<`T`, `E`\> = `Promise`\<[`Result`](Result.md)\<`T`, `E`\>\>

Defined in: [index.ts:53](https://gitlab.com/simwai/super-result/-/blob/d2883e855743f731cc8789c6b707f7643b62baec/src/index.ts#L53)

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
