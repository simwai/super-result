[**super-result API v0.1.0**](../README.md)

***

[super-result API](../README.md) / fromUnknown

# Variable: fromUnknown

> `const` **fromUnknown**: \{\<`T`\>(`fn`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `unknown`\>; \<`T`\>(`fn`): [`Result`](../type-aliases/Result.md)\<`T`, `unknown`\>; \<`T`\>(`promise`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `unknown`\>; \}

Defined in: [index.ts:103](https://github.com/simwai/super-result/blob/a0cc9018c15334ae9e4aad00ecc53d5f0684f316/src/index.ts#L103)

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
