[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / unwrapOrElseAsync

# Function: unwrapOrElseAsync()

> **unwrapOrElseAsync**\<`T`, `E`, `U`\>(`resultPromise`, `onErr`): `Promise`\<`T` \| `U`\>

Defined in: [src/index.ts:471](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L471)

Async variant of [unwrapOrElse](unwrapOrElse.md).

## Type Parameters

### T

`T`

### E

`E`

### U

`U`

## Parameters

### resultPromise

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

### onErr

(`error`) => `U` \| `PromiseLike`\<`U`\>

## Returns

`Promise`\<`T` \| `U`\>
