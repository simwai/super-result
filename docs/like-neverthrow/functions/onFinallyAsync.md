[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / onFinallyAsync

# Function: onFinallyAsync()

> **onFinallyAsync**\<`T`, `E`\>(`res`, `callback`, `mapFinallyError?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `unknown`\>

Defined in: [src/like-neverthrow.ts:527](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L527)

Await ResultAsync and execute callback.

## Type Parameters

### T

`T`

### E

`E`

## Parameters

### res

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

### callback

(`result`) => `void` \| `Promise`\<`void`\>

### mapFinallyError?

(`error`) => `unknown`

## Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `unknown`\>
