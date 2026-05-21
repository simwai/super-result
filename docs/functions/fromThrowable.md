[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / fromThrowable

# Function: fromThrowable()

> **fromThrowable**\<`T`\>(`fn`): [`Result`](../type-aliases/Result.md)\<`T`, `unknown`\>

Defined in: [src/index.ts:119](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L119)

Runs `fn` and wraps the return value in [Ok](../type-aliases/Ok.md), or wraps any thrown value in [Err](../type-aliases/Err.md).

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
