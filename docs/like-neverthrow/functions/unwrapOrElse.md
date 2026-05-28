[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / unwrapOrElse

# Function: unwrapOrElse()

> **unwrapOrElse**\<`T`, `E`, `U`\>(`result`, `onErr`): `T` \| `U`

Defined in: [src/like-neverthrow.ts:454](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L454)

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
