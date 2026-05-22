[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / mapAsync

# Function: mapAsync()

> **mapAsync**\<`T`, `E`, `U`\>(`resultPromise`, `fn`): `Promise`\<[`Result`](../type-aliases/Result.md)\<`U`, `E`\>\>

Defined in: [src/index.ts:308](https://github.com/simwai/super-result/blob/fde25a70daba3710c7a20f2a27ab3b5c68c769e2/src/index.ts#L308)

Async variant of [map](map.md). Awaits `resultPromise` before mapping.

## Type Parameters

### T

`T`

### E

`E`

### U

`U`

## Parameters

### resultPromise

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

### fn

(`value`) => `U` \| `PromiseLike`\<`U`\>

## Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<`U`, `E`\>\>
