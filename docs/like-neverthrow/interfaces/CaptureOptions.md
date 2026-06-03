[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / CaptureOptions

# Interface: CaptureOptions\<T, E\>

Defined in: [src/like-neverthrow.ts:541](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L541)

Options for createResult mappers.

## Type Parameters

### T

`T`

### E

`E`

## Properties

### catch?

> `optional` **catch?**: (`error`) => `E`

Defined in: [src/like-neverthrow.ts:542](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L542)

#### Parameters

##### error

`unknown`

#### Returns

`E`

***

### finally?

> `optional` **finally?**: (`result`) => `void` \| `Promise`\<`void`\>

Defined in: [src/like-neverthrow.ts:543](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L543)

#### Parameters

##### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

#### Returns

`void` \| `Promise`\<`void`\>

***

### mapFinallyError?

> `optional` **mapFinallyError?**: (`error`) => `unknown`

Defined in: [src/like-neverthrow.ts:544](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L544)

#### Parameters

##### error

`unknown`

#### Returns

`unknown`
