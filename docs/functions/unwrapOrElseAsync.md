[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / unwrapOrElseAsync

# Function: unwrapOrElseAsync()

> **unwrapOrElseAsync**\<`T`, `E`, `U`\>(`resultPromise`, `onErr`): `Promise`\<`T` \| `U`\>

Defined in: [src/index.ts:471](https://github.com/simwai/super-result/blob/fde25a70daba3710c7a20f2a27ab3b5c68c769e2/src/index.ts#L471)

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
