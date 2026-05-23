[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / fromPromise

# Function: fromPromise()

> **fromPromise**\<`T`, `E`\>(`promise`, `mapError`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

Defined in: [src/index.ts:197](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L197)

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
