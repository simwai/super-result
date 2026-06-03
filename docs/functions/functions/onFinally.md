[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [functions](../README.md) / onFinally

# Function: onFinally()

## Call Signature

> **onFinally**\<`T`, `E`\>(`input`, `callback`, `mapFinallyError?`): [`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `unknown`\>

Defined in: [src/functions.ts:81](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/functions.ts#L81)

Executes a callback regardless of whether the result is a success or failure.

### Type Parameters

#### T

`T`

#### E

`E`

### Parameters

#### input

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>

The Result or Promise of a Result.

#### callback

(`r`) => `void` \| `Promise`\<`void`\>

The side-effect function to run.

#### mapFinallyError?

(`error`) => `unknown`

Optional function to map errors thrown in the callback.

### Returns

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `unknown`\>

## Call Signature

> **onFinally**\<`T`, `E`\>(`input`, `callback`, `mapFinallyError?`): `Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `unknown`\>\>

Defined in: [src/functions.ts:86](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/functions.ts#L86)

Executes a callback regardless of whether the result is a success or failure.

### Type Parameters

#### T

`T`

#### E

`E`

### Parameters

#### input

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>

The Result or Promise of a Result.

#### callback

(`r`) => `void` \| `Promise`\<`void`\>

The side-effect function to run.

#### mapFinallyError?

(`error`) => `unknown`

Optional function to map errors thrown in the callback.

### Returns

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `unknown`\>\>
