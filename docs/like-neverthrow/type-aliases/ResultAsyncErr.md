[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / ResultAsyncErr

# Type Alias: ResultAsyncErr\<R\>

> **ResultAsyncErr**\<`R`\> = `R` *extends* [`ResultAsync`](ResultAsync.md)\<`unknown`, infer TError\> ? `TError` : `never`

Defined in: [src/like-neverthrow.ts:765](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L765)

Extract the `Err` error type from a [ResultAsync](ResultAsync.md).

## Type Parameters

### R

`R` *extends* [`ResultAsync`](ResultAsync.md)\<`unknown`, `unknown`\>

A [ResultAsync](ResultAsync.md) type.
