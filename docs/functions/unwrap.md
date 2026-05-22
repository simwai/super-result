[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / unwrap

# Function: unwrap()

> **unwrap**\<`T`, `E`\>(`result`): `T`

Defined in: [src/index.ts:411](https://github.com/simwai/super-result/blob/fde25a70daba3710c7a20f2a27ab3b5c68c769e2/src/index.ts#L411)

Return the value if `Ok`, otherwise throw.

## Type Parameters

### T

`T`

### E

`E`

## Parameters

### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

## Returns

`T`

## Throws

The original error if it is an `Error` instance.

## Throws

If the error is not an `Error` instance.
