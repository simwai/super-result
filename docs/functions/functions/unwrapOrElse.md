[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [functions](../README.md) / unwrapOrElse

# Function: unwrapOrElse()

## Call Signature

> **unwrapOrElse**\<`T`, `E`, `D`\>(`input`, `fallback`): `T` \| `D`

Defined in: [src/functions.ts:150](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/functions.ts#L150)

Returns the value if success, otherwise calls the fallback function with the error.

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

#### fallback

(`e`) => `D`

### Returns

`T` \| `D`

## Call Signature

> **unwrapOrElse**\<`T`, `E`, `D`\>(`input`, `fallback`): `Promise`\<`T` \| `D`\>

Defined in: [src/functions.ts:154](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/functions.ts#L154)

Returns the value if success, otherwise calls the fallback function with the error.

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

#### fallback

(`e`) => `D`

### Returns

`Promise`\<`T` \| `D`\>
