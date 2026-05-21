[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / unwrap

# Function: unwrap()

> **unwrap**\<`T`, `E`\>(`result`): `T`

Defined in: [src/index.ts:329](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L329)

Returns the value if `Ok`.

## Type Parameters

### T

`T`

### E

`E`

## Parameters

### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

The result to unwrap.

## Returns

`T`

The success value.

## Throws

The original error if it is an `Error` instance.

## Throws

If the error is not an `Error` instance.
