[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / mapErrAsync

# Function: mapErrAsync()

> **mapErrAsync**\<`T`, `E`, `F`\>(`resultPromise`, `fn`): `Promise`\<[`Result`](../type-aliases/Result.md)\<`T`, `F`\>\>

Defined in: [src/index.ts:334](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L334)

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

`Promise`\<[`Result`](../type-aliases/Result.md)\<`T`, `F`\>\>
