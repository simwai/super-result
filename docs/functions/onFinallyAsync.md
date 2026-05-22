[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / onFinallyAsync

# Function: onFinallyAsync()

> **onFinallyAsync**\<`T`, `E`, `FE`\>(`resultPromise`, `callback`, `mapFinallyError?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`, `FE`\>\>

Defined in: [src/index.ts:270](https://github.com/simwai/super-result/blob/fde25a70daba3710c7a20f2a27ab3b5c68c769e2/src/index.ts#L270)

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
