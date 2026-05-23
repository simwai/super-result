[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / flatMapAsync

# Function: flatMapAsync()

> **flatMapAsync**\<`T`, `E`, `U`\>(`resultPromise`, `fn`): `Promise`\<[`Result`](../type-aliases/Result.md)\<`U`, `E`\>\>

Defined in: [src/index.ts:360](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L360)

Async variant of [flatMap](flatMap.md). Accepts both `Result` and `ResultAsync`.

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

### fn

(`value`) => [`Result`](../type-aliases/Result.md)\<`U`, `E`\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`U`, `E`\>

## Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<`U`, `E`\>\>
