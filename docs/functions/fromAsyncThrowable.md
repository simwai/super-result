[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / fromAsyncThrowable

# Function: fromAsyncThrowable()

> **fromAsyncThrowable**\<`T`, `E`\>(`fn`, `mapError`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

Defined in: [src/index.ts:150](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L150)

Calls an async factory `fn` and wraps the resolved value in [Ok](../type-aliases/Ok.md).

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
