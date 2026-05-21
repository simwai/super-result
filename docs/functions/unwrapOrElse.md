[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / unwrapOrElse

# Function: unwrapOrElse()

> **unwrapOrElse**\<`T`, `E`, `U`\>(`result`, `onErr`): `T` \| `U`

Defined in: [src/index.ts:370](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L370)

Returns the value if `Ok`, otherwise calls `onErr` with the error and returns its result.

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

The result to unwrap.

### onErr

(`error`) => `U`

Called with the error when `Err`.

## Returns

`T` \| `U`
