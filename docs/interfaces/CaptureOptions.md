[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / CaptureOptions

# Interface: CaptureOptions\<T, E, FE\>

Defined in: [src/index.ts:165](https://github.com/simwai/super-result/blob/fde25a70daba3710c7a20f2a27ab3b5c68c769e2/src/index.ts#L165)

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

Defined in: [src/index.ts:167](https://github.com/simwai/super-result/blob/fde25a70daba3710c7a20f2a27ab3b5c68c769e2/src/index.ts#L167)

Maps a thrown/rejected value to `E`. Overrides factory default.

#### Parameters

##### error

`unknown`

#### Returns

`E`

***

### finally?

> `optional` **finally?**: (`result`) => `void` \| `Promise`\<`void`\>

Defined in: [src/index.ts:169](https://github.com/simwai/super-result/blob/fde25a70daba3710c7a20f2a27ab3b5c68c769e2/src/index.ts#L169)

Callback to run after the result is determined.

#### Parameters

##### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

#### Returns

`void` \| `Promise`\<`void`\>

***

### mapFinallyError?

> `optional` **mapFinallyError?**: (`error`) => `FE`

Defined in: [src/index.ts:171](https://github.com/simwai/super-result/blob/fde25a70daba3710c7a20f2a27ab3b5c68c769e2/src/index.ts#L171)

Maps a finally-block failure to `FE`. Overrides factory default.

#### Parameters

##### error

`unknown`

#### Returns

`FE`
