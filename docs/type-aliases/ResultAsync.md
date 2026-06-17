[**super-result API v0.1.0**](../README.md)

***

[super-result API](../README.md) / ResultAsync

# Type Alias: ResultAsync\<T, E\>

> **ResultAsync**\<`T`, `E`\> = `Promise`\<[`Result`](Result.md)\<`T`, `E`\>\>

Defined in: [index.ts:52](https://github.com/simwai/super-result/blob/c8c5eec8472f853bcbc6d2f4528dda310e35c600/src/index.ts#L52)

A Promise that resolves to a Result.

Useful for representing asynchronous operations that can fail.

## Type Parameters

### T

`T`

### E

`E`

## Example

```ts
async function fetchData(): ResultAsync<Data, Error> {
  return from(fetch('/api/data').then(res => res.json()))
}
```
