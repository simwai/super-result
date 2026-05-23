[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / ResultAsyncOk

# Type Alias: ResultAsyncOk\<R\>

> **ResultAsyncOk**\<`R`\> = `R` *extends* [`ResultAsync`](ResultAsync.md)\<infer TData, `unknown`\> ? `TData` : `never`

Defined in: [src/index.ts:769](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L769)

Extract the `Ok` value type from a [ResultAsync](ResultAsync.md).

## Type Parameters

### R

`R` *extends* [`ResultAsync`](ResultAsync.md)\<`unknown`, `unknown`\>

A [ResultAsync](ResultAsync.md) type.
