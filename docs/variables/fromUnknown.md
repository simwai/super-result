[**super-result API v1.4.2**](../README.md)

***

[super-result API](../README.md) / fromUnknown

# Variable: fromUnknown

> `const` **fromUnknown**: \{\<`T`\>(`fn`): [`Result`](../type-aliases/Result.md)\<`T`, `unknown`\>; \<`T`\>(`fn`): `Promise`\<[`Result`](../type-aliases/Result.md)\<`T`, `unknown`\>\>; \<`T`\>(`promise`): `Promise`\<[`Result`](../type-aliases/Result.md)\<`T`, `unknown`\>\>; \}

Defined in: [index.ts:213](https://gitlab.com/simwai/super-result/-/blob/b0e679b9ceb8efecd14505923dea905a0118cad0/src/index.ts#L213)

Captures errors from functions or promises into a Result without transformation.

This is useful when you want to handle the 'unknown' error type yourself later.

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

> \<`T`\>(`fn`): `Promise`\<[`Result`](../type-aliases/Result.md)\<`T`, `unknown`\>\>

### Type Parameters

#### T

`T`

### Parameters

#### fn

() => `PromiseLike`\<`T`\>

### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<`T`, `unknown`\>\>

## Call Signature

> \<`T`\>(`promise`): `Promise`\<[`Result`](../type-aliases/Result.md)\<`T`, `unknown`\>\>

### Type Parameters

#### T

`T`

### Parameters

#### promise

`PromiseLike`\<`T`\>

### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<`T`, `unknown`\>\>

## Example

```ts
const res = fromUnknown(() => { throw 'string error' })
if (!res.ok) {
  console.log(typeof res.error) // 'string'
}
```
