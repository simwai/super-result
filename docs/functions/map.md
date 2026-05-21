[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / map

# Function: map()

> **map**\<`T`, `E`, `U`\>(`result`, `fn`): [`Result`](../type-aliases/Result.md)\<`U`, `E`\>

Defined in: [src/index.ts:218](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L218)

Applies `fn` to the value if `Ok`, passes `Err` through unchanged.

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

The result to transform.

### fn

(`value`) => `U`

Maps the success value to a new value.

## Returns

[`Result`](../type-aliases/Result.md)\<`U`, `E`\>

`Ok<U>` if `Ok`, the original `Err<E>` otherwise.
