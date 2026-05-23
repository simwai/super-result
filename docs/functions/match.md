[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / match

# Function: match()

> **match**\<`T`, `E`, `U`, `V`\>(`result`, `onOk`, `onErr`): `U` \| `V`

Defined in: [src/index.ts:378](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L378)

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
