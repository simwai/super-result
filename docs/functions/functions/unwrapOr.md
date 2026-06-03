[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [functions](../README.md) / unwrapOr

# Function: unwrapOr()

## Call Signature

> **unwrapOr**\<`T`, `E`, `D`\>(`input`, `defaultValue`): `T` \| `D`

Defined in: [src/functions.ts:158](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/functions.ts#L158)

Returns the value if success, otherwise returns the provided default value.

### Type Parameters

#### T

`T`

#### E

`E`

#### D

`D`

### Parameters

#### input

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>

The Result or Promise of a Result.

#### defaultValue

`D`

The fallback value.

### Returns

`T` \| `D`

## Call Signature

> **unwrapOr**\<`T`, `E`, `D`\>(`input`, `defaultValue`): `Promise`\<`T` \| `D`\>

Defined in: [src/functions.ts:162](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/functions.ts#L162)

Returns the value if success, otherwise returns the provided default value.

### Type Parameters

#### T

`T`

#### E

`E`

#### D

`D`

### Parameters

#### input

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>

The Result or Promise of a Result.

#### defaultValue

`D`

The fallback value.

### Returns

`Promise`\<`T` \| `D`\>
