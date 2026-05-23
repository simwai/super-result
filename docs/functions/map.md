[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / map

# Function: map()

> **map**\<`T`, `E`, `U`\>(`result`, `fn`): [`Result`](../type-aliases/Result.md)\<`U`, `E`\>

Defined in: [src/index.ts:296](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L296)

Apply `fn` to the value if `Ok`, pass `Err` through unchanged.

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
