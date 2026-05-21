[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / unwrapOrAsync

# Function: unwrapOrAsync()

> **unwrapOrAsync**\<`T`, `E`, `D`\>(`resultPromise`, `defaultValue`): `Promise`\<`T` \| `D`\>

Defined in: [src/index.ts:360](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L360)

Async variant of [unwrapOr](unwrapOr.md).

## Type Parameters

### T

`T`

### E

`E`

### D

`D`

## Parameters

### resultPromise

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

The async result to unwrap.

### defaultValue

`D`

Fallback value returned when `Err`.

## Returns

`Promise`\<`T` \| `D`\>
