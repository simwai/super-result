[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / match

# Function: match()

> **match**\<`T`, `E`, `U`, `V`\>(`result`, `onOk`, `onErr`): `U` \| `V`

Defined in: [src/index.ts:296](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L296)

Exhaustive match over a [Result](../type-aliases/Result.md). Exactly one branch runs.

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

The result to match.

### onOk

(`value`) => `U`

Called with the value when `Ok`.

### onErr

(`error`) => `V`

Called with the error when `Err`.

## Returns

`U` \| `V`

The return value of whichever branch ran.
