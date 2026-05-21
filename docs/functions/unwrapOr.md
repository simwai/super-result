[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / unwrapOr

# Function: unwrapOr()

> **unwrapOr**\<`T`, `E`, `D`\>(`result`, `defaultValue`): `T` \| `D`

Defined in: [src/index.ts:350](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L350)

Returns the value if `Ok`, otherwise returns `defaultValue`.

## Type Parameters

### T

`T`

### E

`E`

### D

`D`

## Parameters

### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

The result to unwrap.

### defaultValue

`D`

Fallback value returned when `Err`.

## Returns

`T` \| `D`
