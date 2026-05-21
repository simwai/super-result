[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / onFinallyAsync

# Function: onFinallyAsync()

> **onFinallyAsync**\<`T`, `E`, `FE`\>(`resultPromise`, `callback`, `mapFinallyError?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`, `FE`\>\>

Defined in: [src/index.ts:198](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L198)

Async variant of [onFinally](onFinally.md).

## Type Parameters

### T

`T`

### E

`E`

### FE

`FE` = `unknown`

## Parameters

### resultPromise

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

### callback

(`result`) => `void` \| `Promise`\<`void`\>

### mapFinallyError?

(`error`) => `FE`

## Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`, `FE`\>\>
