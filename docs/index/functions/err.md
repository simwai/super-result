[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [index](../README.md) / err

# Function: err()

> **err**\<`E`\>(`error`): [`RawResult`](../type-aliases/RawResult.md)\<`never`, `E`\>

Defined in: [src/index.ts:64](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L64)

Creates a failed RawResult.

## Type Parameters

### E

`E`

## Parameters

### error

`E`

The error value.

## Returns

[`RawResult`](../type-aliases/RawResult.md)\<`never`, `E`\>

## Example

```ts
const res = err('fail')
if (!res.ok) {
  console.log(res.error) // 'fail'
}
```
