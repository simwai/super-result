[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [functions](../README.md) / unwrapOr

# Function: unwrapOr()

## Call Signature

> **unwrapOr**\<`T`, `E`, `D`\>(`input`, `defaultValue`): `T` \| `D`

Defined in: [src/functions.ts:132](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/functions.ts#L132)

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

#### defaultValue

`D`

### Returns

`T` \| `D`

## Call Signature

> **unwrapOr**\<`T`, `E`, `D`\>(`input`, `defaultValue`): `Promise`\<`T` \| `D`\>

Defined in: [src/functions.ts:136](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/functions.ts#L136)

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

#### defaultValue

`D`

### Returns

`Promise`\<`T` \| `D`\>
