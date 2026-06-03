[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / andThenAsync

# Variable: andThenAsync

> `const` **andThenAsync**: \<`T`, `E`, `U`, `F`\>(`res`, `fn`) => [`ResultAsync`](../type-aliases/ResultAsync.md)\<`U`, `E` \| `F`\> = `flatMapAsync`

Defined in: [src/like-neverthrow.ts:350](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L350)

Alias for flatMapAsync.

Map and flatten the success value asynchronously.

## Type Parameters

### T

`T`

### E

`E`

### U

`U`

### F

`F` = `E`

## Parameters

### res

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

### fn

(`v`) => [`Result`](../type-aliases/Result.md)\<`U`, `F`\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`U`, `F`\>

## Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`U`, `E` \| `F`\>
