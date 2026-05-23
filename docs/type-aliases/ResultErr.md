[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / ResultErr

# Type Alias: ResultErr\<R\>

> **ResultErr**\<`R`\> = `R` *extends* [`Result`](Result.md)\<`unknown`, infer TError\> ? `TError` : `never`

Defined in: [src/index.ts:756](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L756)

Extract the `Err` error type from a [Result](Result.md).

## Type Parameters

### R

`R` *extends* [`Result`](Result.md)\<`unknown`, `unknown`\>

A [Result](Result.md) type.
