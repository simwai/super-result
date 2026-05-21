[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / matchAsync

# Function: matchAsync()

> **matchAsync**\<`T`, `E`, `U`, `V`\>(`resultPromise`, `onOk`, `onErr`): `Promise`\<`U` \| `V`\>

Defined in: [src/index.ts:309](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L309)

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

The async result to match.

### onOk

(`value`) => `U` \| `PromiseLike`\<`U`\>

Called with the value when `Ok`.

### onErr

(`error`) => `V` \| `PromiseLike`\<`V`\>

Called with the error when `Err`.

## Returns

`Promise`\<`U` \| `V`\>

The return value of whichever branch ran.
