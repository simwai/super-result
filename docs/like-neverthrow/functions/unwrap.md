[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / unwrap

# Function: unwrap()

> **unwrap**\<`T`, `E`\>(`result`): `T`

Defined in: [src/like-neverthrow.ts:406](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L406)

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
