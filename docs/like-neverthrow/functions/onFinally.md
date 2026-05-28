[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / onFinally

# Function: onFinally()

## Call Signature

> **onFinally**\<`T`, `E`\>(`result`, `callback`, `mapFinallyError?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`\>\>

Defined in: [src/like-neverthrow.ts:317](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L317)

Execute a callback regardless of the result. Returns a promise resolving to the result
or a [FinallyError](../classes/FinallyError.md) if the callback fails.

### Type Parameters

#### T

`T`

#### E

`E`

### Parameters

#### result

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

#### callback

(`result`) => `void` \| `PromiseLike`\<`void`\>

#### mapFinallyError?

(`error`) => `unknown`

### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`\>\>

## Call Signature

> **onFinally**\<`T`, `E`\>(`result`, `callback`, `mapFinallyError?`): [`Result`](../type-aliases/Result.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`\>\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`\>\>

Defined in: [src/like-neverthrow.ts:322](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L322)

Execute a callback regardless of the result. Returns a promise resolving to the result
or a [FinallyError](../classes/FinallyError.md) if the callback fails.

### Type Parameters

#### T

`T`

#### E

`E`

### Parameters

#### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

#### callback

(`result`) => `void` \| `PromiseLike`\<`void`\>

#### mapFinallyError?

(`error`) => `unknown`

### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`\>\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`\>\>
