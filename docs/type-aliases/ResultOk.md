[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / ResultOk

# Type Alias: ResultOk\<R\>

> **ResultOk**\<`R`\> = `R` *extends* [`Result`](Result.md)\<infer TData, `unknown`\> ? `TData` : `never`

Defined in: [src/index.ts:743](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L743)

Extract the `Ok` value type from a [Result](Result.md).

## Type Parameters

### R

`R` *extends* [`Result`](Result.md)\<`unknown`, `unknown`\>

A [Result](Result.md) type.
