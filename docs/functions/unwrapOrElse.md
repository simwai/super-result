[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / unwrapOrElse

# Function: unwrapOrElse()

> **unwrapOrElse**\<`T`, `E`, `U`\>(`result`, `onErr`): `T` \| `U`

Defined in: [src/index.ts:459](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L459)

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
