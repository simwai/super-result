[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / onFinally

# Function: onFinally()

## Call Signature

> **onFinally**\<`T`, `E`, `FE`\>(`result`, `callback`, `mapFinallyError?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`, `FE`\>\>

Defined in: [src/index.ts:234](https://github.com/simwai/super-result/blob/fde25a70daba3710c7a20f2a27ab3b5c68c769e2/src/index.ts#L234)

Attach a cleanup callback to a result. The callback runs regardless of `Ok`/`Err`.
If the callback itself throws or rejects, the original result is replaced with
`Err<FinallyError>` carrying both the original result and the cleanup error.

### Type Parameters

#### T

`T`

#### E

`E`

#### FE

`FE` = `unknown`

### Parameters

#### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

#### callback

(`result`) => `Promise`\<`void`\>

#### mapFinallyError?

(`error`) => `FE`

### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`, `FE`\>\>

## Call Signature

> **onFinally**\<`T`, `E`, `FE`\>(`result`, `callback`, `mapFinallyError?`): [`Result`](../type-aliases/Result.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`, `FE`\>\>

Defined in: [src/index.ts:239](https://github.com/simwai/super-result/blob/fde25a70daba3710c7a20f2a27ab3b5c68c769e2/src/index.ts#L239)

Attach a cleanup callback to a result. The callback runs regardless of `Ok`/`Err`.
If the callback itself throws or rejects, the original result is replaced with
`Err<FinallyError>` carrying both the original result and the cleanup error.

### Type Parameters

#### T

`T`

#### E

`E`

#### FE

`FE` = `unknown`

### Parameters

#### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

#### callback

(`result`) => `void`

#### mapFinallyError?

(`error`) => `FE`

### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`, `FE`\>\>
