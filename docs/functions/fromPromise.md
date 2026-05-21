[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / fromPromise

# Function: fromPromise()

> **fromPromise**\<`T`, `E`\>(`promise`, `mapError`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

Defined in: [src/index.ts:133](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L133)

Wraps an existing `PromiseLike` in a [ResultAsync](../type-aliases/ResultAsync.md).

## Type Parameters

### T

`T`

### E

`E`

## Parameters

### promise

`PromiseLike`\<`T`\>

The promise to wrap.

### mapError

(`error`) => `E`

Maps a rejection value to `E`.

## Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

`Ok<T>` on resolve, `Err<E>` on reject.
