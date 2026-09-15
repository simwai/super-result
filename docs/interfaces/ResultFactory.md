[**super-result API v1.4.2**](../README.md)

***

[super-result API](../README.md) / ResultFactory

# Interface: ResultFactory\<E\>

Defined in: [index.ts:141](https://gitlab.com/simwai/super-result/-/blob/b0e679b9ceb8efecd14505923dea905a0118cad0/src/index.ts#L141)

A factory for creating results with a pre-configured error mapper.

## Type Parameters

### E

`E`

## Methods

### from()

#### Call Signature

> **from**\<`T`\>(`fn`): `Promise`\<[`Result`](../type-aliases/Result.md)\<`T`, `E`\>\>

Defined in: [index.ts:145](https://gitlab.com/simwai/super-result/-/blob/b0e679b9ceb8efecd14505923dea905a0118cad0/src/index.ts#L145)

Captures an asynchronous function execution into a Promise<Result<T, E>>.

##### Type Parameters

###### T

`T`

##### Parameters

###### fn

() => `PromiseLike`\<`T`\>

##### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<`T`, `E`\>\>

#### Call Signature

> **from**\<`T`\>(`fn`): [`Result`](../type-aliases/Result.md)\<`T`, `E`\>

Defined in: [index.ts:149](https://gitlab.com/simwai/super-result/-/blob/b0e679b9ceb8efecd14505923dea905a0118cad0/src/index.ts#L149)

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

> **from**\<`T`\>(`promise`): `Promise`\<[`Result`](../type-aliases/Result.md)\<`T`, `E`\>\>

Defined in: [index.ts:153](https://gitlab.com/simwai/super-result/-/blob/b0e679b9ceb8efecd14505923dea905a0118cad0/src/index.ts#L153)

Captures a Promise into a Promise<Result<T, E>>.

##### Type Parameters

###### T

`T`

##### Parameters

###### promise

`PromiseLike`\<`T`\>

##### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<`T`, `E`\>\>
