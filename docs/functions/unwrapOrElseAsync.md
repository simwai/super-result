[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / unwrapOrElseAsync

# Function: unwrapOrElseAsync()

> **unwrapOrElseAsync**\<`T`, `E`, `U`\>(`resultPromise`, `onErr`): `Promise`\<`T` \| `U`\>

Defined in: [src/index.ts:380](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L380)

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

The async result to unwrap.

### onErr

(`error`) => `U` \| `PromiseLike`\<`U`\>

Called with the error when `Err`.

## Returns

`Promise`\<`T` \| `U`\>
