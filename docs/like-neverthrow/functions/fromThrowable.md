[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / fromThrowable

# Function: fromThrowable()

> **fromThrowable**\<`T`, `E`\>(`fn`, `mapError?`): [`Result`](../type-aliases/Result.md)\<`T`, `E`\>

Defined in: [src/like-neverthrow.ts:182](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L182)

Executes a synchronous function and captures any thrown error.

## Type Parameters

### T

`T`

### E

`E` = `unknown`

## Parameters

### fn

() => `T`

### mapError?

(`error`) => `E`

## Returns

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>
