[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / mapErr

# Function: mapErr()

> **mapErr**\<`T`, `E`, `F`\>(`result`, `fn`): [`Result`](../type-aliases/Result.md)\<`T`, `F`\>

Defined in: [src/like-neverthrow.ts:260](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L260)

Maps the error value of a [Result](../type-aliases/Result.md).

## Type Parameters

### T

`T`

### E

`E`

### F

`F`

## Parameters

### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

### fn

(`error`) => `F`

## Returns

[`Result`](../type-aliases/Result.md)\<`T`, `F`\>
