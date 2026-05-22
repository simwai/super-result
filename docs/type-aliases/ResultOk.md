[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / ResultOk

# Type Alias: ResultOk\<R\>

> **ResultOk**\<`R`\> = `R` *extends* [`Result`](Result.md)\<infer TData, `unknown`\> ? `TData` : `never`

Defined in: [src/index.ts:743](https://github.com/simwai/super-result/blob/fde25a70daba3710c7a20f2a27ab3b5c68c769e2/src/index.ts#L743)

Extract the `Ok` value type from a [Result](Result.md).

## Type Parameters

### R

`R` *extends* [`Result`](Result.md)\<`unknown`, `unknown`\>

A [Result](Result.md) type.
