[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / unwrapAsync

# Function: unwrapAsync()

> **unwrapAsync**\<`T`, `E`\>(`resultPromise`): `Promise`\<`T`\>

Defined in: [src/index.ts:424](https://github.com/simwai/super-result/blob/fde25a70daba3710c7a20f2a27ab3b5c68c769e2/src/index.ts#L424)

Async variant of [unwrap](unwrap.md).

## Type Parameters

### T

`T`

### E

`E`

## Parameters

### resultPromise

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

## Returns

`Promise`\<`T`\>

## Throws

The original error if it is an `Error` instance.

## Throws

If the error is not an `Error` instance.
