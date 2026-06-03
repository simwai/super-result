[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / ok

# Function: ok()

> **ok**\<`T`\>(`value`): [`Result`](../type-aliases/Result.md)\<`T`, `never`\>

Defined in: [src/like-neverthrow.ts:159](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L159)

Create a successful Result.

## Type Parameters

### T

`T`

## Parameters

### value

`T`

Success value.

## Returns

[`Result`](../type-aliases/Result.md)\<`T`, `never`\>

## Example

```ts
const res = ok(42)
```
