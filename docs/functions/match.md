[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / match

# Function: match()

> **match**\<`T`, `E`, `U`, `V`\>(`result`, `onOk`, `onErr`): `U` \| `V`

Defined in: [src/index.ts:378](https://github.com/simwai/super-result/blob/fde25a70daba3710c7a20f2a27ab3b5c68c769e2/src/index.ts#L378)

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

### onOk

(`value`) => `U`

### onErr

(`error`) => `V`

## Returns

`U` \| `V`
