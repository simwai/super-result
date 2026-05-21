[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / ResultOk

# Type Alias: ResultOk\<R\>

> **ResultOk**\<`R`\> = `R` *extends* [`Result`](Result.md)\<infer TData, `unknown`\> ? `TData` : `never`

Defined in: [src/index.ts:627](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L627)

Extracts the `Ok` value type from a [Result](Result.md).

## Type Parameters

### R

`R` *extends* [`Result`](Result.md)\<`unknown`, `unknown`\>

A [Result](Result.md) type.
