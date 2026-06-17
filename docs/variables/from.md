[**super-result API v0.1.0**](../README.md)

***

[super-result API](../README.md) / from

# Variable: from

> `const` **from**: \{\<`T`\>(`fn`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `Error`\>; \<`T`\>(`fn`): [`Result`](../type-aliases/Result.md)\<`T`, `Error`\>; \<`T`\>(`promise`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `Error`\>; \}

Defined in: [index.ts:197](https://github.com/simwai/super-result/blob/0bc1c39ef5720eb6d5312b7353b4acd581ef9390/src/index.ts#L197)

Captures errors from functions or promises into a Result.

This default instance maps all errors to the standard Error class.
If the caught error is already an instance of Error, it is returned as is.
Otherwise, it is wrapped in a new Error.

## Call Signature

> \<`T`\>(`fn`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `Error`\>

### Type Parameters

#### T

`T`

### Parameters

#### fn

() => `PromiseLike`\<`T`\>

### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `Error`\>

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

> \<`T`\>(`promise`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `Error`\>

### Type Parameters

#### T

`T`

### Parameters

#### promise

`PromiseLike`\<`T`\>

### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `Error`\>

## Example

```ts
// Synchronous
const res1 = from(() => 42)

// Asynchronous
const res2 = await from(fetch('/api').then(r => r.json()))
```
