[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [index](../README.md) / ok

# Function: ok()

> **ok**\<`T`\>(`value`): [`RawResult`](../type-aliases/RawResult.md)\<`T`, `never`\>

Defined in: [src/index.ts:46](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L46)

Creates a successful RawResult.

## Type Parameters

### T

`T`

## Parameters

### value

`T`

The success value.

## Returns

[`RawResult`](../type-aliases/RawResult.md)\<`T`, `never`\>

## Example

```ts
const res = ok(42)
if (res.ok) {
  console.log(res.value) // 42
}
```
