[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / flatMap

# Function: flatMap()

> **flatMap**\<`T`, `E`, `U`, `F`\>(`res`, `fn`): [`Result`](../type-aliases/Result.md)\<`U`, `E` \| `F`\>

Defined in: [src/like-neverthrow.ts:327](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L327)

Map and flatten the success value.

## Type Parameters

### T

`T`

### E

`E`

### U

`U`

### F

`F` = `E`

## Parameters

### res

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

### fn

(`v`) => [`Result`](../type-aliases/Result.md)\<`U`, `F`\>

## Returns

[`Result`](../type-aliases/Result.md)\<`U`, `E` \| `F`\>
