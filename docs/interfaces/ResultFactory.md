[**super-result API v0.1.0**](../README.md)

***

[super-result API](../README.md) / ResultFactory

# Interface: ResultFactory\<E\>

Defined in: [index.ts:140](https://github.com/simwai/super-result/blob/0bc1c39ef5720eb6d5312b7353b4acd581ef9390/src/index.ts#L140)

A factory for creating results with a pre-configured error mapper.

## Type Parameters

### E

`E`

## Methods

### from()

#### Call Signature

> **from**\<`T`\>(`fn`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

Defined in: [index.ts:144](https://github.com/simwai/super-result/blob/0bc1c39ef5720eb6d5312b7353b4acd581ef9390/src/index.ts#L144)

Captures an asynchronous function execution into a ResultAsync.

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

Defined in: [index.ts:148](https://github.com/simwai/super-result/blob/0bc1c39ef5720eb6d5312b7353b4acd581ef9390/src/index.ts#L148)

Captures a synchronous function execution into a Result.

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

Defined in: [index.ts:152](https://github.com/simwai/super-result/blob/0bc1c39ef5720eb6d5312b7353b4acd581ef9390/src/index.ts#L152)

Captures a Promise into a ResultAsync.

##### Type Parameters

###### T

`T`

##### Parameters

###### promise

`PromiseLike`\<`T`\>

##### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>
