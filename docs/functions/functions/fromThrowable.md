[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [functions](../README.md) / fromThrowable

# Function: fromThrowable()

> **fromThrowable**\<`T`\>(`fn`): [`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `unknown`\>

Defined in: [src/functions.ts:197](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/functions.ts#L197)

Executes a function and captures any thrown error into a RawResult.

## Type Parameters

### T

`T`

## Parameters

### fn

() => `T`

The synchronous function to wrap.

## Returns

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `unknown`\>
