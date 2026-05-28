[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / ResultErr

# Type Alias: ResultErr\<R\>

> **ResultErr**\<`R`\> = `R` *extends* [`Result`](Result.md)\<`unknown`, infer TError\> ? `TError` : `never`

Defined in: [src/like-neverthrow.ts:743](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L743)

Extract the `Err` error type from a [Result](Result.md).

## Type Parameters

### R

`R` *extends* [`Result`](Result.md)\<`unknown`, `unknown`\>

A [Result](Result.md) type.
