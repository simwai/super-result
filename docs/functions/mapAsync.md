[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / mapAsync

# Function: mapAsync()

> **mapAsync**\<`T`, `E`, `U`\>(`resultPromise`, `fn`): `Promise`\<[`Result`](../type-aliases/Result.md)\<`U`, `E`\>\>

Defined in: [src/index.ts:228](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L228)

Async variant of [map](map.md).

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

The async result to transform.

### fn

(`value`) => `U` \| `PromiseLike`\<`U`\>

Maps the success value to a new value.

## Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<`U`, `E`\>\>
