[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / fromPromise

# Function: fromPromise()

> **fromPromise**\<`T`, `E`\>(`promise`, `mapError`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

Defined in: [src/index.ts:197](https://github.com/simwai/super-result/blob/fde25a70daba3710c7a20f2a27ab3b5c68c769e2/src/index.ts#L197)

Wrap an existing `PromiseLike` in a [ResultAsync](../type-aliases/ResultAsync.md).

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
