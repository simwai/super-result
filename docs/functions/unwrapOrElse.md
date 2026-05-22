[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / unwrapOrElse

# Function: unwrapOrElse()

> **unwrapOrElse**\<`T`, `E`, `U`\>(`result`, `onErr`): `T` \| `U`

Defined in: [src/index.ts:459](https://github.com/simwai/super-result/blob/fde25a70daba3710c7a20f2a27ab3b5c68c769e2/src/index.ts#L459)

Return the value if `Ok`, otherwise call `onErr` and return its result.

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

### onErr

(`error`) => `U`

## Returns

`T` \| `U`
