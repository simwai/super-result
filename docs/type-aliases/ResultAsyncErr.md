[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / ResultAsyncErr

# Type Alias: ResultAsyncErr\<R\>

> **ResultAsyncErr**\<`R`\> = `R` *extends* [`ResultAsync`](ResultAsync.md)\<`unknown`, infer TError\> ? `TError` : `never`

Defined in: [src/index.ts:778](https://github.com/simwai/super-result/blob/fde25a70daba3710c7a20f2a27ab3b5c68c769e2/src/index.ts#L778)

Extract the `Err` error type from a [ResultAsync](ResultAsync.md).

## Type Parameters

### R

`R` *extends* [`ResultAsync`](ResultAsync.md)\<`unknown`, `unknown`\>

A [ResultAsync](ResultAsync.md) type.
