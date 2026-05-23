[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / onFinallyAsync

# Function: onFinallyAsync()

> **onFinallyAsync**\<`T`, `E`, `FE`\>(`resultPromise`, `callback`, `mapFinallyError?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`, `FE`\>\>

Defined in: [src/index.ts:270](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L270)

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
