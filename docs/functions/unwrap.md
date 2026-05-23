[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / unwrap

# Function: unwrap()

> **unwrap**\<`T`, `E`\>(`result`): `T`

Defined in: [src/index.ts:411](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L411)

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
