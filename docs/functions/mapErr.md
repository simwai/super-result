[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / mapErr

# Function: mapErr()

> **mapErr**\<`T`, `E`, `F`\>(`result`, `fn`): [`Result`](../type-aliases/Result.md)\<`T`, `F`\>

Defined in: [src/index.ts:242](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L242)

Applies `fn` to the error if `Err`, passes `Ok` through unchanged.

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

The result to transform.

### fn

(`error`) => `F`

Maps the error to a new error.

## Returns

[`Result`](../type-aliases/Result.md)\<`T`, `F`\>

The original `Ok<T>` if `Ok`, `Err<F>` otherwise.
