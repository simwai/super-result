[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / ResultErr

# Type Alias: ResultErr\<R\>

> **ResultErr**\<`R`\> = `R` *extends* [`Result`](Result.md)\<`any`, infer E\> ? `E` : `R` *extends* [`ResultAsync`](ResultAsync.md)\<`any`, infer E\> ? `E` : `never`

Defined in: [src/like-neverthrow.ts:709](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L709)

Extract error type from Result or ResultAsync.

## Type Parameters

### R

`R`
