[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [functions](../README.md) / flatMap

# Function: flatMap()

## Call Signature

> **flatMap**\<`T`, `E`, `U`\>(`input`, `fn`): [`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>

Defined in: [src/functions.ts:42](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/functions.ts#L42)

Maps the success value to a new [RawResult](../../index/type-aliases/RawResult.md) and flattens it.

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

(`v`) => [`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>

### Returns

[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>

## Call Signature

> **flatMap**\<`T`, `E`, `U`\>(`input`, `fn`): `Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>\>

Defined in: [src/functions.ts:46](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/functions.ts#L46)

Maps the success value to a new [RawResult](../../index/type-aliases/RawResult.md) and flattens it.

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

(`v`) => [`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>

### Returns

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>\>
