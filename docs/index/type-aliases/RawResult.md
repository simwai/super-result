[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [index](../README.md) / RawResult

# Type Alias: RawResult\<T, E\>

> **RawResult**\<`T`, `E`\> = [`Ok`](../interfaces/Ok.md)\<`T`\> \| [`Err`](../interfaces/Err.md)\<`E`\>

Defined in: [src/index.ts:30](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L30)

A discriminated union representing either a success ([Ok](../interfaces/Ok.md)) or a failure ([Err](../interfaces/Err.md)).

## Type Parameters

### T

`T`

The type of the value.

### E

`E`

The type of the error.
