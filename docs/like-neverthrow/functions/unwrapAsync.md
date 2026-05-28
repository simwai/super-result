[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / unwrapAsync

# Function: unwrapAsync()

> **unwrapAsync**\<`T`, `E`\>(`resultPromise`): `Promise`\<`T`\>

Defined in: [src/like-neverthrow.ts:419](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L419)

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
