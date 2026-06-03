[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / orElseAsync

# Function: orElseAsync()

> **orElseAsync**\<`T`, `E`, `U`, `F`\>(`res`, `fn`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T` \| `U`, `F`\>

Defined in: [src/like-neverthrow.ts:367](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L367)

Handle error by returning a new Result asynchronously.

## Type Parameters

### T

`T`

### E

`E`

### U

`U` = `T`

### F

`F` = `E`

## Parameters

### res

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

### fn

(`e`) => [`Result`](../type-aliases/Result.md)\<`U`, `F`\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`U`, `F`\>

## Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T` \| `U`, `F`\>
