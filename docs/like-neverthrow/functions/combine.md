[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / combine

# Function: combine()

> **combine**\<`T`\>(`results`): [`Result`](../type-aliases/Result.md)\<\{ \[K in string \| number \| symbol\]: ResultOk\<T\[K\]\> \}, [`ResultErr`](../type-aliases/ResultErr.md)\<`T`\[`number`\]\>\>

Defined in: [src/like-neverthrow.ts:380](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L380)

Combine multiple Results into one Result with an array of values.

## Type Parameters

### T

`T` *extends* [`Result`](../type-aliases/Result.md)\<`any`, `any`\>[]

## Parameters

### results

`T`

## Returns

[`Result`](../type-aliases/Result.md)\<\{ \[K in string \| number \| symbol\]: ResultOk\<T\[K\]\> \}, [`ResultErr`](../type-aliases/ResultErr.md)\<`T`\[`number`\]\>\>
