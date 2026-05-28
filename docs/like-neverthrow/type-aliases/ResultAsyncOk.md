[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / ResultAsyncOk

# Type Alias: ResultAsyncOk\<R\>

> **ResultAsyncOk**\<`R`\> = `R` *extends* [`ResultAsync`](ResultAsync.md)\<infer TData, `unknown`\> ? `TData` : `never`

Defined in: [src/like-neverthrow.ts:756](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L756)

Extract the `Ok` value type from a [ResultAsync](ResultAsync.md).

## Type Parameters

### R

`R` *extends* [`ResultAsync`](ResultAsync.md)\<`unknown`, `unknown`\>

A [ResultAsync](ResultAsync.md) type.
