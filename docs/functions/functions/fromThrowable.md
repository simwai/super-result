[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [functions](../README.md) / fromThrowable

# Function: fromThrowable()

> **fromThrowable**\<`T`\>(`fn`): [`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `unknown`\>

Defined in: [src/functions.ts:168](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/functions.ts#L168)

Executes a function and captures any thrown error into a [RawResult](../../index/type-aliases/RawResult.md).

## Type Parameters

### T

`T`

## Parameters

### fn

() => `T`

## Returns

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `unknown`\>
