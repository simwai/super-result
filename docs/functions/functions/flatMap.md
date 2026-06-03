[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [functions](../README.md) / flatMap

# Function: flatMap()

## Call Signature

> **flatMap**\<`T`, `E`, `U`\>(`input`, `fn`): [`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>

Defined in: [src/functions.ts:60](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/functions.ts#L60)

Maps the success value to a new RawResult and flattens it.
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

The Result or Promise of a Result to flatMap.

#### fn

(`v`) => [`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>

The function returning a new Result.

### Returns

[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>

### Example

```ts
const res = ok('/api/user')
const data = await flatMap(res, url => fromPromise(fetch(url), e => e))
```

## Call Signature

> **flatMap**\<`T`, `E`, `U`\>(`input`, `fn`): `Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>\>

Defined in: [src/functions.ts:64](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/functions.ts#L64)

Maps the success value to a new RawResult and flattens it.
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

The Result or Promise of a Result to flatMap.

#### fn

(`v`) => [`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>

The function returning a new Result.

### Returns

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>\>

### Example

```ts
const res = ok('/api/user')
const data = await flatMap(res, url => fromPromise(fetch(url), e => e))
```
