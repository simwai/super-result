[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / mapErrAsync

# Function: mapErrAsync()

> **mapErrAsync**\<`T`, `E`, `F`\>(`resultPromise`, `fn`): `Promise`\<[`Result`](../type-aliases/Result.md)\<`T`, `F`\>\>

Defined in: [src/index.ts:252](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L252)

Async variant of [mapErr](mapErr.md).

## Type Parameters

### T

`T`

### E

`E`

### F

`F`

## Parameters

### resultPromise

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

The async result to transform.

### fn

(`error`) => `F` \| `PromiseLike`\<`F`\>

Maps the error to a new error.

## Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<`T`, `F`\>\>
