[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / mapAsync

# Function: mapAsync()

> **mapAsync**\<`T`, `E`, `U`\>(`resultPromise`, `fn`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`U`, `E`\>

Defined in: [src/like-neverthrow.ts:246](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L246)

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

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`U`, `E`\>
