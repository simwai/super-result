[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / map

# Function: map()

> **map**\<`T`, `E`, `U`\>(`result`, `fn`): [`Result`](../type-aliases/Result.md)\<`U`, `E`\>

Defined in: [src/like-neverthrow.ts:234](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L234)

Maps the success value of a [Result](../type-aliases/Result.md).

## Type Parameters

### T

`T`

### E

`E`

### U

`U`

## Parameters

### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

### fn

(`value`) => `U`

## Returns

[`Result`](../type-aliases/Result.md)\<`U`, `E`\>
