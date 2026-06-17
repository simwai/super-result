[**super-result API v0.1.0**](../README.md)

***

[super-result API](../README.md) / ResultFactory

# Interface: ResultFactory\<E\>

Defined in: [index.ts:152](https://github.com/simwai/super-result/blob/c8c5eec8472f853bcbc6d2f4528dda310e35c600/src/index.ts#L152)

A factory for creating results with a pre-configured error mapper.

## Type Parameters

### E

`E`

## Methods

### from()

#### Call Signature

> **from**\<`T`\>(`fn`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

Defined in: [index.ts:156](https://github.com/simwai/super-result/blob/c8c5eec8472f853bcbc6d2f4528dda310e35c600/src/index.ts#L156)

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

Defined in: [index.ts:160](https://github.com/simwai/super-result/blob/c8c5eec8472f853bcbc6d2f4528dda310e35c600/src/index.ts#L160)

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

Defined in: [index.ts:164](https://github.com/simwai/super-result/blob/c8c5eec8472f853bcbc6d2f4528dda310e35c600/src/index.ts#L164)

Captures a Promise into a ResultAsync.

##### Type Parameters

###### T

`T`

##### Parameters

###### promise

`PromiseLike`\<`T`\>

##### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>
