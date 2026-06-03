[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [functions](../README.md) / map

# Function: map()

## Call Signature

> **map**\<`T`, `E`, `U`\>(`input`, `fn`): [`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>

Defined in: [src/functions.ts:33](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/functions.ts#L33)

Maps the success value using the provided function.
Works with both synchronous RawResult and Promise of RawResult.

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

The Result or Promise of a Result to map.

#### fn

(`v`) => `U`

The transformation function for the success value.

### Returns

[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>

### Example

```ts
const res = ok(21)
const doubled = map(res, n => n * 2) // { ok: true, value: 42 }
```

## Call Signature

> **map**\<`T`, `E`, `U`\>(`input`, `fn`): `Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>\>

Defined in: [src/functions.ts:37](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/functions.ts#L37)

Maps the success value using the provided function.
Works with both synchronous RawResult and Promise of RawResult.

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

The Result or Promise of a Result to map.

#### fn

(`v`) => `U`

The transformation function for the success value.

### Returns

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>\>

### Example

```ts
const res = ok(21)
const doubled = map(res, n => n * 2) // { ok: true, value: 42 }
```
