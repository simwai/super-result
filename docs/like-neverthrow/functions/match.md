[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / match

# Function: match()

> **match**\<`T`, `E`, `U`, `V`\>(`res`, `onOk`, `onErr`): `U` \| `V`

Defined in: [src/like-neverthrow.ts:418](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L418)

Branch logic based on Result type.

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

### res

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

### onOk

(`v`) => `U`

### onErr

(`e`) => `V`

## Returns

`U` \| `V`
