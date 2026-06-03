[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [functions](../README.md) / fromPromise

# Function: fromPromise()

> **fromPromise**\<`T`, `E`\>(`promise`, `mapError`): `Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>

Defined in: [src/functions.ts:212](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/functions.ts#L212)

Wraps a PromiseLike into a RawResult, capturing any rejection.

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

Function to map the caught error.

## Returns

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>
