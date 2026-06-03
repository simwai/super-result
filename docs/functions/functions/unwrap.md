[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [functions](../README.md) / unwrap

# Function: unwrap()

## Call Signature

> **unwrap**\<`T`, `E`\>(`input`): `T`

Defined in: [src/functions.ts:131](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/functions.ts#L131)

Returns the value if success, otherwise throws the error.
Works with both synchronous and asynchronous inputs.

### Type Parameters

#### T

`T`

#### E

`E`

### Parameters

#### input

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>

The Result or Promise of a Result to unwrap.

### Returns

`T`

## Call Signature

> **unwrap**\<`T`, `E`\>(`input`): `Promise`\<`T`\>

Defined in: [src/functions.ts:132](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/functions.ts#L132)

Returns the value if success, otherwise throws the error.
Works with both synchronous and asynchronous inputs.

### Type Parameters

#### T

`T`

#### E

`E`

### Parameters

#### input

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>

The Result or Promise of a Result to unwrap.

### Returns

`Promise`\<`T`\>
