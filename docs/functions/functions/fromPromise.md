[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [functions](../README.md) / fromPromise

# Function: fromPromise()

> **fromPromise**\<`T`, `E`\>(`promise`, `mapError`): `Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>

Defined in: [src/functions.ts:181](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/functions.ts#L181)

Wraps a PromiseLike into a [RawResult](../../index/type-aliases/RawResult.md), capturing any rejection.

## Type Parameters

### T

`T`

### E

`E`

## Parameters

### promise

`PromiseLike`\<`T`\>

### mapError

(`error`) => `E`

## Returns

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>
