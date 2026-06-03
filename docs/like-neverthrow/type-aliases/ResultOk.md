[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / ResultOk

# Type Alias: ResultOk\<R\>

> **ResultOk**\<`R`\> = `R` *extends* [`Result`](Result.md)\<infer T, `any`\> ? `T` : `R` *extends* [`ResultAsync`](ResultAsync.md)\<infer T, `any`\> ? `T` : `never`

Defined in: [src/like-neverthrow.ts:702](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L702)

Extract success type from Result or ResultAsync.

## Type Parameters

### R

`R`
