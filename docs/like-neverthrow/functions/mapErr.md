[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / mapErr

# Function: mapErr()

> **mapErr**\<`T`, `E`, `F`\>(`res`, `fn`): [`Result`](../type-aliases/Result.md)\<`T`, `F`\>

Defined in: [src/like-neverthrow.ts:303](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L303)

Map the error value.

## Type Parameters

### T

`T`

### E

`E`

### F

`F`

## Parameters

### res

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

### fn

(`e`) => `F`

## Returns

[`Result`](../type-aliases/Result.md)\<`T`, `F`\>
