[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / mapErrAsync

# Function: mapErrAsync()

> **mapErrAsync**\<`T`, `E`, `F`\>(`resultPromise`, `fn`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F`\>

Defined in: [src/like-neverthrow.ts:272](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L272)

Async variant of [mapErr](mapErr.md). Awaits `resultPromise` before mapping.

## Type Parameters

### T

`T`

### E

`E`

### F

`F`

## Parameters

### resultPromise

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

### fn

(`error`) => `F` \| `PromiseLike`\<`F`\>

## Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F`\>
