[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [functions](../README.md) / unwrap

# Function: unwrap()

## Call Signature

> **unwrap**\<`T`, `E`\>(`input`): `T`

Defined in: [src/functions.ts:108](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/functions.ts#L108)

Returns the value if success, otherwise throws the error.

### Type Parameters

#### T

`T`

#### E

`E`

### Parameters

#### input

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>

### Returns

`T`

## Call Signature

> **unwrap**\<`T`, `E`\>(`input`): `Promise`\<`T`\>

Defined in: [src/functions.ts:109](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/functions.ts#L109)

Returns the value if success, otherwise throws the error.

### Type Parameters

#### T

`T`

#### E

`E`

### Parameters

#### input

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>

### Returns

`Promise`\<`T`\>
