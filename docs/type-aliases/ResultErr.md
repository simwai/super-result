[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / ResultErr

# Type Alias: ResultErr\<R\>

> **ResultErr**\<`R`\> = `R` *extends* [`Result`](Result.md)\<`unknown`, infer TError\> ? `TError` : `never`

Defined in: [src/index.ts:756](https://github.com/simwai/super-result/blob/fde25a70daba3710c7a20f2a27ab3b5c68c769e2/src/index.ts#L756)

Extract the `Err` error type from a [Result](Result.md).

## Type Parameters

### R

`R` *extends* [`Result`](Result.md)\<`unknown`, `unknown`\>

A [Result](Result.md) type.
