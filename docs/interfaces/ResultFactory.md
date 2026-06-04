[**super-result API v0.1.0**](../README.md)

***

[super-result API](../README.md) / ResultFactory

# Interface: ResultFactory\<E\>

Defined in: [index.ts:81](https://github.com/simwai/super-result/blob/a0cc9018c15334ae9e4aad00ecc53d5f0684f316/src/index.ts#L81)

## Type Parameters

### E

`E`

## Methods

### from()

#### Call Signature

> **from**\<`T`\>(`fn`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

Defined in: [index.ts:82](https://github.com/simwai/super-result/blob/a0cc9018c15334ae9e4aad00ecc53d5f0684f316/src/index.ts#L82)

##### Type Parameters

###### T

`T`

##### Parameters

###### fn

() => `PromiseLike`\<`T`\>

##### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

#### Call Signature

> **from**\<`T`\>(`fn`): [`Result`](../type-aliases/Result.md)\<`T`, `E`\>

Defined in: [index.ts:83](https://github.com/simwai/super-result/blob/a0cc9018c15334ae9e4aad00ecc53d5f0684f316/src/index.ts#L83)

##### Type Parameters

###### T

`T`

##### Parameters

###### fn

() => `T`

##### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

#### Call Signature

> **from**\<`T`\>(`promise`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

Defined in: [index.ts:84](https://github.com/simwai/super-result/blob/a0cc9018c15334ae9e4aad00ecc53d5f0684f316/src/index.ts#L84)

##### Type Parameters

###### T

`T`

##### Parameters

###### promise

`PromiseLike`\<`T`\>

##### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>
