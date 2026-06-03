[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / mapErrAsync

# Function: mapErrAsync()

> **mapErrAsync**\<`T`, `E`, `F`\>(`res`, `fn`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F`\>

Defined in: [src/like-neverthrow.ts:314](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L314)

Map the error value asynchronously.

## Type Parameters

### T

`T`

### E

`E`

### F

`F`

## Parameters

### res

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

### fn

(`e`) => `F` \| `Promise`\<`F`\>

## Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F`\>
