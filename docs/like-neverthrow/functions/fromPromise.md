[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / fromPromise

# Function: fromPromise()

> **fromPromise**\<`T`, `E`\>(`promise`, `mapError`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

Defined in: [src/like-neverthrow.ts:227](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L227)

Wrap a promise into a ResultAsync.

## Type Parameters

### T

`T`

### E

`E`

## Parameters

### promise

`PromiseLike`\<`T`\>

The promise to wrap.

### mapError

(`error`) => `E`

Error mapper.

## Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>
