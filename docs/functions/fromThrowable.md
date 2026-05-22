[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / fromThrowable

# Function: fromThrowable()

> **fromThrowable**\<`T`\>(`fn`): [`Result`](../type-aliases/Result.md)\<`T`, `unknown`\>

Defined in: [src/index.ts:181](https://github.com/simwai/super-result/blob/fde25a70daba3710c7a20f2a27ab3b5c68c769e2/src/index.ts#L181)

Run `fn` and wrap the return value in [Ok](../interfaces/Ok.md), or wrap any thrown value in [Err](../interfaces/Err.md).

## Type Parameters

### T

`T`

## Parameters

### fn

() => `T`

Synchronous function to execute.

## Returns

[`Result`](../type-aliases/Result.md)\<`T`, `unknown`\>

`Ok<T>` on success, `Err<unknown>` on throw.
