[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / ResultConfig

# Type Alias: ResultConfig\<E, FE\>

> **ResultConfig**\<`E`, `FE`\> = \{ `mapError?`: (`error`) => `E`; `mapFinallyError?`: (`error`) => `FE`; \} \| ((`error`) => `E`)

Defined in: [src/index.ts:405](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L405)

Configuration for [createResult](../functions/createResult.md).

## Type Parameters

### E

`E` = `unknown`

### FE

`FE` = `unknown`
