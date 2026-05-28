[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [functions](../README.md) / onFinally

# Function: onFinally()

## Call Signature

> **onFinally**\<`T`, `E`\>(`input`, `callback`, `mapFinallyError?`): [`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `unknown`\>

Defined in: [src/functions.ts:60](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/functions.ts#L60)

Executes a callback regardless of whether the result is a success or failure.

### Type Parameters

#### T

`T`

#### E

`E`

### Parameters

#### input

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>

#### callback

(`r`) => `void` \| `Promise`\<`void`\>

#### mapFinallyError?

(`error`) => `unknown`

### Returns

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `unknown`\>

## Call Signature

> **onFinally**\<`T`, `E`\>(`input`, `callback`, `mapFinallyError?`): `Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `unknown`\>\>

Defined in: [src/functions.ts:65](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/functions.ts#L65)

Executes a callback regardless of whether the result is a success or failure.

### Type Parameters

#### T

`T`

#### E

`E`

### Parameters

#### input

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>

#### callback

(`r`) => `void` \| `Promise`\<`void`\>

#### mapFinallyError?

(`error`) => `unknown`

### Returns

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `unknown`\>\>
