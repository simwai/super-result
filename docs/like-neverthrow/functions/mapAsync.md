[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / mapAsync

# Function: mapAsync()

> **mapAsync**\<`T`, `E`, `U`\>(`res`, `fn`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`U`, `E`\>

Defined in: [src/like-neverthrow.ts:290](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L290)

Map the success value asynchronously.

## Type Parameters

### T

`T`

### E

`E`

### U

`U`

## Parameters

### res

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

### fn

(`v`) => `U` \| `Promise`\<`U`\>

## Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`U`, `E`\>
