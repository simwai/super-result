[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [functions](../README.md) / result

# Function: result()

## Call Signature

> **result**\<`T`\>(`value`): [`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `unknown`\>

Defined in: [src/functions.ts:237](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/functions.ts#L237)

Unified capture entry point. Attempts to wrap values, promises, or functions into a Result.

### Type Parameters

#### T

`T`

### Parameters

#### value

`T`

### Returns

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `unknown`\>

### Example

```ts
const res1 = result(42) // ok(42)
const res2 = await result(Promise.resolve(42)) // ok(42)
const res3 = result(() => { throw 'err' }) // err('err')
```

## Call Signature

> **result**\<`T`, `E`\>(`r`): [`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>

Defined in: [src/functions.ts:238](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/functions.ts#L238)

Unified capture entry point. Attempts to wrap values, promises, or functions into a Result.

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

### Example

```ts
const res1 = result(42) // ok(42)
const res2 = await result(Promise.resolve(42)) // ok(42)
const res3 = result(() => { throw 'err' }) // err('err')
```

## Call Signature

> **result**\<`T`\>(`promise`): `Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `unknown`\>\>

Defined in: [src/functions.ts:239](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/functions.ts#L239)

Unified capture entry point. Attempts to wrap values, promises, or functions into a Result.

### Type Parameters

#### T

`T`

### Parameters

#### promise

`Promise`\<`T`\>

### Returns

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `unknown`\>\>

### Example

```ts
const res1 = result(42) // ok(42)
const res2 = await result(Promise.resolve(42)) // ok(42)
const res3 = result(() => { throw 'err' }) // err('err')
```

## Call Signature

> **result**\<`T`, `E`\>(`promise`): `Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>

Defined in: [src/functions.ts:240](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/functions.ts#L240)

Unified capture entry point. Attempts to wrap values, promises, or functions into a Result.

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

### Example

```ts
const res1 = result(42) // ok(42)
const res2 = await result(Promise.resolve(42)) // ok(42)
const res3 = result(() => { throw 'err' }) // err('err')
```

## Call Signature

> **result**\<`T`\>(`fn`): [`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `unknown`\>

Defined in: [src/functions.ts:243](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/functions.ts#L243)

Unified capture entry point. Attempts to wrap values, promises, or functions into a Result.

### Type Parameters

#### T

`T`

### Parameters

#### fn

() => `T`

### Returns

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `unknown`\>

### Example

```ts
const res1 = result(42) // ok(42)
const res2 = await result(Promise.resolve(42)) // ok(42)
const res3 = result(() => { throw 'err' }) // err('err')
```

## Call Signature

> **result**\<`T`, `E`\>(`fn`, `mapError?`): `Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>

Defined in: [src/functions.ts:244](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/functions.ts#L244)

Unified capture entry point. Attempts to wrap values, promises, or functions into a Result.

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

Optional error mapper for async/function rejections.

### Returns

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>

### Example

```ts
const res1 = result(42) // ok(42)
const res2 = await result(Promise.resolve(42)) // ok(42)
const res3 = result(() => { throw 'err' }) // err('err')
```
