[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / matchAsync

# Function: matchAsync()

> **matchAsync**\<`T`, `E`, `U`, `V`\>(`res`, `onOk`, `onErr`): `Promise`\<`U` \| `V`\>

Defined in: [src/like-neverthrow.ts:430](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L430)

Branch logic based on ResultAsync resolution.

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

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

### onOk

(`v`) => `U` \| `Promise`\<`U`\>

### onErr

(`e`) => `V` \| `Promise`\<`V`\>

## Returns

`Promise`\<`U` \| `V`\>
