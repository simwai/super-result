[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [functions](../README.md) / result

# Function: result()

## Call Signature

> **result**\<`T`\>(`value`): [`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `unknown`\>

Defined in: [src/functions.ts:197](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/functions.ts#L197)

Unified capture entry point.

### Type Parameters

#### T

`T`

### Parameters

#### value

`T`

### Returns

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `unknown`\>

## Call Signature

> **result**\<`T`, `E`\>(`r`): [`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>

Defined in: [src/functions.ts:198](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/functions.ts#L198)

Unified capture entry point.

### Type Parameters

#### T

`T`

#### E

`E`

### Parameters

#### r

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>

### Returns

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>

## Call Signature

> **result**\<`T`\>(`promise`): `Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `unknown`\>\>

Defined in: [src/functions.ts:199](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/functions.ts#L199)

Unified capture entry point.

### Type Parameters

#### T

`T`

### Parameters

#### promise

`Promise`\<`T`\>

### Returns

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `unknown`\>\>

## Call Signature

> **result**\<`T`, `E`\>(`promise`): `Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>

Defined in: [src/functions.ts:200](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/functions.ts#L200)

Unified capture entry point.

### Type Parameters

#### T

`T`

#### E

`E`

### Parameters

#### promise

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>

### Returns

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>

## Call Signature

> **result**\<`T`\>(`fn`): [`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `unknown`\>

Defined in: [src/functions.ts:203](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/functions.ts#L203)

Unified capture entry point.

### Type Parameters

#### T

`T`

### Parameters

#### fn

() => `T`

### Returns

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `unknown`\>

## Call Signature

> **result**\<`T`, `E`\>(`fn`, `mapError?`): `Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>

Defined in: [src/functions.ts:204](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/functions.ts#L204)

Unified capture entry point.

### Type Parameters

#### T

`T`

#### E

`E`

### Parameters

#### fn

() => `Promise`\<`T`\>

#### mapError?

(`e`) => `E`

### Returns

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>
