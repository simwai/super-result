[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / CaptureOptions

# Interface: CaptureOptions\<T, E\>

Defined in: [src/like-neverthrow.ts:166](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L166)

Options for capturing operations via [fromThrowable](../functions/fromThrowable.md) and others.

## Type Parameters

### T

`T`

The success value type.

### E

`E`

The error type.

## Properties

### catch?

> `optional` **catch?**: (`error`) => `E`

Defined in: [src/like-neverthrow.ts:168](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L168)

Custom error mapper for caught exceptions. Defaults to factory default.

#### Parameters

##### error

`unknown`

#### Returns

`E`

***

### finally?

> `optional` **finally?**: (`result`) => `void` \| `PromiseLike`\<`void`\>

Defined in: [src/like-neverthrow.ts:171](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L171)

Executes a callback after the operation, regardless of success or failure.

#### Parameters

##### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

#### Returns

`void` \| `PromiseLike`\<`void`\>

***

### mapFinallyError?

> `optional` **mapFinallyError?**: (`error`) => `unknown`

Defined in: [src/like-neverthrow.ts:174](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L174)

Maps a finally-block failure. Overrides factory default.

#### Parameters

##### error

`unknown`

#### Returns

`unknown`
