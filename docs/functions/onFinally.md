[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / onFinally

# Function: onFinally()

## Call Signature

> **onFinally**\<`T`, `E`, `FE`\>(`result`, `callback`, `mapFinallyError?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`, `FE`\>\>

Defined in: [src/index.ts:164](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L164)

Executes a callback after a result is determined.

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

Defined in: [src/index.ts:169](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L169)

Executes a callback after a result is determined.

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
