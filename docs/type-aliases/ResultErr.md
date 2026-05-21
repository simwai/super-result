[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / ResultErr

# Type Alias: ResultErr\<R\>

> **ResultErr**\<`R`\> = `R` *extends* [`Result`](Result.md)\<`unknown`, infer TError\> ? `TError` : `never`

Defined in: [src/index.ts:638](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L638)

Extracts the `Err` error type from a [Result](Result.md).

## Type Parameters

### R

`R` *extends* [`Result`](Result.md)\<`unknown`, `unknown`\>

A [Result](Result.md) type.
