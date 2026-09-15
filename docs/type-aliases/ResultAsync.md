[**super-result API v1.4.2**](../README.md)

***

[super-result API](../README.md) / ResultAsync

# ~~Type Alias: ResultAsync\<T, E\>~~

> **ResultAsync**\<`T`, `E`\> = `Promise`\<[`Result`](Result.md)\<`T`, `E`\>\>

Defined in: [index.ts:53](https://gitlab.com/simwai/super-result/-/blob/b0e679b9ceb8efecd14505923dea905a0118cad0/src/index.ts#L53)

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
