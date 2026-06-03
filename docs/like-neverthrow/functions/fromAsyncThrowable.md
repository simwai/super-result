[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / fromAsyncThrowable

# Function: fromAsyncThrowable()

> **fromAsyncThrowable**\<`T`, `E`\>(`fn`, `mapError`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

Defined in: [src/like-neverthrow.ts:246](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L246)

Wrap an asynchronous factory that might throw.

## Type Parameters

### T

`T`

### E

`E`

## Parameters

### fn

() => `PromiseLike`\<`T`\>

The async function to wrap.

### mapError

(`error`) => `E`

Error mapper.

## Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>
