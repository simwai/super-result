[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / fromAsyncThrowable

# Function: fromAsyncThrowable()

> **fromAsyncThrowable**\<`T`, `E`\>(`fn`, `mapError?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

Defined in: [src/like-neverthrow.ts:214](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L214)

Executes an async function and captures any thrown error.

## Type Parameters

### T

`T`

### E

`E` = `unknown`

## Parameters

### fn

() => `PromiseLike`\<`T`\>

### mapError?

(`error`) => `E`

## Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>
