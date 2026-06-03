[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / fromThrowable

# Function: fromThrowable()

> **fromThrowable**\<`T`, `E`\>(`fn`, `mapError`): [`Result`](../type-aliases/Result.md)\<`T`, `E`\>

Defined in: [src/like-neverthrow.ts:209](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L209)

Wrap a synchronous operation that might throw.

## Type Parameters

### T

`T`

### E

`E`

## Parameters

### fn

() => `T`

The function to wrap.

### mapError

(`error`) => `E`

Error mapper.

## Returns

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>
