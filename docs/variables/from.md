[**super-result API v1.3.1**](../README.md)

***

[super-result API](../README.md) / from

# Variable: from

> `const` **from**: \{\<`T`\>(`fn`): [`Result`](../type-aliases/Result.md)\<`T`, `Error`\>; \<`T`\>(`fn`): `Promise`\<[`Result`](../type-aliases/Result.md)\<`T`, `Error`\>\>; \<`T`\>(`promise`): `Promise`\<[`Result`](../type-aliases/Result.md)\<`T`, `Error`\>\>; \}

Defined in: [index.ts:198](https://gitlab.com/simwai/super-result/-/blob/d2883e855743f731cc8789c6b707f7643b62baec/src/index.ts#L198)

Captures errors from functions or promises into a Result.

This default instance maps all errors to the standard Error class.
If the caught error is already an instance of Error, it is returned as is.
Otherwise, it is wrapped in a new Error.

## Call Signature

> \<`T`\>(`fn`): [`Result`](../type-aliases/Result.md)\<`T`, `Error`\>

### Type Parameters

#### T

`T`

### Parameters

#### fn

() => `T`

### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `Error`\>

## Call Signature

> \<`T`\>(`fn`): `Promise`\<[`Result`](../type-aliases/Result.md)\<`T`, `Error`\>\>

### Type Parameters

#### T

`T`

### Parameters

#### fn

() => `PromiseLike`\<`T`\>

### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<`T`, `Error`\>\>

## Call Signature

> \<`T`\>(`promise`): `Promise`\<[`Result`](../type-aliases/Result.md)\<`T`, `Error`\>\>

### Type Parameters

#### T

`T`

### Parameters

#### promise

`PromiseLike`\<`T`\>

### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<`T`, `Error`\>\>

## Example

```ts
// Synchronous
const res1 = from(() => 42)

// Asynchronous
const res2 = await from(fetch('/api').then(r => r.json()))
```
