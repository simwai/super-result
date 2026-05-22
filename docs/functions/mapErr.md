[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / mapErr

# Function: mapErr()

> **mapErr**\<`T`, `E`, `F`\>(`result`, `fn`): [`Result`](../type-aliases/Result.md)\<`T`, `F`\>

Defined in: [src/index.ts:322](https://github.com/simwai/super-result/blob/fde25a70daba3710c7a20f2a27ab3b5c68c769e2/src/index.ts#L322)

Apply `fn` to the error if `Err`, pass `Ok` through unchanged.

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
