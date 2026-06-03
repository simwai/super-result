[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [functions](../README.md) / unwrapOrElse

# Function: unwrapOrElse()

## Call Signature

> **unwrapOrElse**\<`T`, `E`, `D`\>(`input`, `fallback`): `T` \| `D`

Defined in: [src/functions.ts:178](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/functions.ts#L178)

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

The Result or Promise of a Result.

#### fallback

(`e`) => `D`

The function to call if result is an error.

### Returns

`T` \| `D`

## Call Signature

> **unwrapOrElse**\<`T`, `E`, `D`\>(`input`, `fallback`): `Promise`\<`T` \| `D`\>

Defined in: [src/functions.ts:182](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/functions.ts#L182)

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

The Result or Promise of a Result.

#### fallback

(`e`) => `D`

The function to call if result is an error.

### Returns

`Promise`\<`T` \| `D`\>
