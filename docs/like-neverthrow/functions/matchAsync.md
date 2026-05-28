[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / matchAsync

# Function: matchAsync()

> **matchAsync**\<`T`, `E`, `U`, `V`\>(`resultPromise`, `onOk`, `onErr`): `Promise`\<`U` \| `V`\>

Defined in: [src/like-neverthrow.ts:386](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L386)

Async variant of [match](match.md). Awaits `resultPromise` before branching.

## Type Parameters

### T

`T`

### E

`E`

### U

`U`

### V

`V`

## Parameters

### resultPromise

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

### onOk

(`value`) => `U` \| `PromiseLike`\<`U`\>

### onErr

(`error`) => `V` \| `PromiseLike`\<`V`\>

## Returns

`Promise`\<`U` \| `V`\>
