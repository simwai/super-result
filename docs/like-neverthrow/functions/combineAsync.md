[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / combineAsync

# Function: combineAsync()

> **combineAsync**\<`T`\>(`results`): `Promise`\<[`Result`](../type-aliases/Result.md)\<\{ \[K in string \| number \| symbol\]: ResultOk\<Awaited\<T\[K\]\>\> \}, [`ResultErr`](../type-aliases/ResultErr.md)\<`Awaited`\<`T`\[`number`\]\>\>\>\>

Defined in: [src/like-neverthrow.ts:395](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L395)

Combine multiple Results or ResultAsyncs into one.

## Type Parameters

### T

`T` *extends* ([`Result`](../type-aliases/Result.md)\<`any`, `any`\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`any`, `any`\>)[]

## Parameters

### results

`T`

## Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<\{ \[K in string \| number \| symbol\]: ResultOk\<Awaited\<T\[K\]\>\> \}, [`ResultErr`](../type-aliases/ResultErr.md)\<`Awaited`\<`T`\[`number`\]\>\>\>\>
