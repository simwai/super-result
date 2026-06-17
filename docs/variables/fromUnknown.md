[**super-result API v0.1.0**](../README.md)

***

[super-result API](../README.md) / fromUnknown

# Variable: fromUnknown

> `const` **fromUnknown**: \{\<`T`\>(`fn`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `unknown`\>; \<`T`\>(`fn`): [`Result`](../type-aliases/Result.md)\<`T`, `unknown`\>; \<`T`\>(`promise`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `unknown`\>; \}

Defined in: [index.ts:224](https://github.com/simwai/super-result/blob/c8c5eec8472f853bcbc6d2f4528dda310e35c600/src/index.ts#L224)

Captures errors from functions or promises into a Result without transformation.

This is useful when you want to handle the 'unknown' error type yourself later.

## Call Signature

> \<`T`\>(`fn`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `unknown`\>

### Type Parameters

#### T

`T`

### Parameters

#### fn

() => `PromiseLike`\<`T`\>

### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `unknown`\>

## Call Signature

> \<`T`\>(`fn`): [`Result`](../type-aliases/Result.md)\<`T`, `unknown`\>

### Type Parameters

#### T

`T`

### Parameters

#### fn

() => `T`

### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `unknown`\>

## Call Signature

> \<`T`\>(`promise`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `unknown`\>

### Type Parameters

#### T

`T`

### Parameters

#### promise

`PromiseLike`\<`T`\>

### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `unknown`\>

## Example

```ts
const res = fromUnknown(() => { throw 'string error' })
if (!res.ok) {
  console.log(typeof res.error) // 'string'
}
```
