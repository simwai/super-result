[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / matchAsync

# Function: matchAsync()

> **matchAsync**\<`T`, `E`, `U`, `V`\>(`resultPromise`, `onOk`, `onErr`): `Promise`\<`U` \| `V`\>

Defined in: [src/index.ts:391](https://github.com/simwai/super-result/blob/fde25a70daba3710c7a20f2a27ab3b5c68c769e2/src/index.ts#L391)

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
