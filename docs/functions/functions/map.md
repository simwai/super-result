[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [functions](../README.md) / map

# Function: map()

## Call Signature

> **map**\<`T`, `E`, `U`\>(`input`, `fn`): [`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>

Defined in: [src/functions.ts:24](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/functions.ts#L24)

Maps the success value using the provided function.

### Type Parameters

#### T

`T`

#### E

`E`

#### U

`U`

### Parameters

#### input

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>

#### fn

(`v`) => `U`

### Returns

[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>

## Call Signature

> **map**\<`T`, `E`, `U`\>(`input`, `fn`): `Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>\>

Defined in: [src/functions.ts:28](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/functions.ts#L28)

Maps the success value using the provided function.

### Type Parameters

#### T

`T`

#### E

`E`

#### U

`U`

### Parameters

#### input

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>

#### fn

(`v`) => `U`

### Returns

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>\>
