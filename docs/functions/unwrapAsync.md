[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / unwrapAsync

# Function: unwrapAsync()

> **unwrapAsync**\<`T`, `E`\>(`resultPromise`): `Promise`\<`T`\>

Defined in: [src/index.ts:341](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L341)

Async variant of [unwrap](unwrap.md).

## Type Parameters

### T

`T`

### E

`E`

## Parameters

### resultPromise

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

The async result to unwrap.

## Returns

`Promise`\<`T`\>

## Throws

The original error if it is an `Error` instance.

## Throws

If the error is not an `Error` instance.
