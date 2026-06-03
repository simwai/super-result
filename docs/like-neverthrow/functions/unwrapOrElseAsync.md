[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / unwrapOrElseAsync

# Function: unwrapOrElseAsync()

> **unwrapOrElseAsync**\<`T`, `E`, `D`\>(`res`, `fn`): `Promise`\<`T` \| `D`\>

Defined in: [src/like-neverthrow.ts:490](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L490)

Await and return value or call fallback.

## Type Parameters

### T

`T`

### E

`E`

### D

`D`

## Parameters

### res

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

### fn

(`e`) => `D` \| `Promise`\<`D`\>

## Returns

`Promise`\<`T` \| `D`\>
