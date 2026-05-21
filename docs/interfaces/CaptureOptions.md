[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / CaptureOptions

# Interface: CaptureOptions\<T, E, FE\>

Defined in: [src/index.ts:105](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L105)

Options for result capture helpers.

## Type Parameters

### T

`T`

### E

`E`

### FE

`FE` = `unknown`

## Properties

### catch?

> `optional` **catch?**: (`error`) => `E`

Defined in: [src/index.ts:107](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L107)

Optional error mapper for the catch block. Overrides factory default.

#### Parameters

##### error

`unknown`

#### Returns

`E`

***

### finally?

> `optional` **finally?**: (`result`) => `void` \| `Promise`\<`void`\>

Defined in: [src/index.ts:109](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L109)

Optional callback to run after the result is determined.

#### Parameters

##### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

#### Returns

`void` \| `Promise`\<`void`\>

***

### mapFinallyError?

> `optional` **mapFinallyError?**: (`error`) => `FE`

Defined in: [src/index.ts:111](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L111)

Optional error mapper for finally block failures. Overrides factory default.

#### Parameters

##### error

`unknown`

#### Returns

`FE`
