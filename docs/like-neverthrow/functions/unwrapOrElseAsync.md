[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / unwrapOrElseAsync

# Function: unwrapOrElseAsync()

> **unwrapOrElseAsync**\<`T`, `E`, `U`\>(`resultPromise`, `onErr`): `Promise`\<`T` \| `U`\>

Defined in: [src/like-neverthrow.ts:466](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L466)

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
