[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / err

# Function: err()

> **err**\<`E`\>(`error`): [`Result`](../type-aliases/Result.md)\<`never`, `E`\>

Defined in: [src/like-neverthrow.ts:174](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L174)

Create a failed Result.

## Type Parameters

### E

`E`

## Parameters

### error

`E`

Error value.

## Returns

[`Result`](../type-aliases/Result.md)\<`never`, `E`\>

## Example

```ts
const res = err('fail')
```
