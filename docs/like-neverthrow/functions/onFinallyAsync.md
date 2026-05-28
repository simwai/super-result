[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / onFinallyAsync

# Function: onFinallyAsync()

> **onFinallyAsync**\<`T`, `E`\>(`resultPromise`, `callback`, `mapFinallyError?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`\>\>

Defined in: [src/like-neverthrow.ts:355](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L355)

Purely async variant of [onFinally](onFinally.md).

## Type Parameters

### T

`T`

### E

`E`

## Parameters

### resultPromise

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

### callback

(`result`) => `void` \| `PromiseLike`\<`void`\>

### mapFinallyError?

(`error`) => `unknown`

## Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`\>\>
