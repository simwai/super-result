[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / flatMapAsync

# Function: flatMapAsync()

> **flatMapAsync**\<`T`, `E`, `U`\>(`resultPromise`, `fn`): `Promise`\<[`Result`](../type-aliases/Result.md)\<`U`, `E`\>\>

Defined in: [src/index.ts:277](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L277)

Async variant of [flatMap](flatMap.md).

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

The async result to chain.

### fn

(`value`) => [`Result`](../type-aliases/Result.md)\<`U`, `E`\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`U`, `E`\>

Maps the success value to a new `Result<U, E>` or `ResultAsync<U, E>`.

## Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<`U`, `E`\>\>
