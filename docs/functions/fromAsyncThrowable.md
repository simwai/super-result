[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / fromAsyncThrowable

# Function: fromAsyncThrowable()

> **fromAsyncThrowable**\<`T`, `E`\>(`fn`, `mapError`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

Defined in: [src/index.ts:216](https://github.com/simwai/super-result/blob/fde25a70daba3710c7a20f2a27ab3b5c68c769e2/src/index.ts#L216)

Call an async factory `fn` and wrap the resolved value in [Ok](../interfaces/Ok.md).

## Type Parameters

### T

`T`

### E

`E`

## Parameters

### fn

() => `PromiseLike`\<`T`\>

Async factory function.

### mapError

(`error`) => `E`

Maps a rejection or thrown value to `E`.

## Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

`Ok<T>` on resolve, `Err<E>` on reject or throw.
