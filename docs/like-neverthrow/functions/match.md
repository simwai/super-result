[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / match

# Function: match()

> **match**\<`T`, `E`, `U`, `V`\>(`result`, `onOk`, `onErr`): `U` \| `V`

Defined in: [src/like-neverthrow.ts:373](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L373)

Branch logic based on the result state.

## Type Parameters

### T

`T`

### E

`E`

### U

`U`

### V

`V`

## Parameters

### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

### onOk

(`value`) => `U`

### onErr

(`error`) => `V`

## Returns

`U` \| `V`
