[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / ResultAsyncErr

# Type Alias: ResultAsyncErr\<R\>

> **ResultAsyncErr**\<`R`\> = `R` *extends* [`ResultAsync`](ResultAsync.md)\<`unknown`, infer TError\> ? `TError` : `never`

Defined in: [src/index.ts:656](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L656)

Extracts the `Err` error type from a [ResultAsync](ResultAsync.md).

## Type Parameters

### R

`R` *extends* [`ResultAsync`](ResultAsync.md)\<`unknown`, `unknown`\>

A [ResultAsync](ResultAsync.md) type.
