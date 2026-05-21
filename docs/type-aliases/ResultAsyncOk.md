[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / ResultAsyncOk

# Type Alias: ResultAsyncOk\<R\>

> **ResultAsyncOk**\<`R`\> = `R` *extends* [`ResultAsync`](ResultAsync.md)\<infer TData, `unknown`\> ? `TData` : `never`

Defined in: [src/index.ts:649](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L649)

Extracts the `Ok` value type from a [ResultAsync](ResultAsync.md).

## Type Parameters

### R

`R` *extends* [`ResultAsync`](ResultAsync.md)\<`unknown`, `unknown`\>

A [ResultAsync](ResultAsync.md) type.
