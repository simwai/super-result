[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / ResultConfig

# Type Alias: ResultConfig\<E\>

> **ResultConfig**\<`E`\> = \{ `mapError?`: (`error`) => `E`; `mapFinallyError?`: (`error`) => `unknown`; \} \| ((`error`) => `E`)

Defined in: [src/like-neverthrow.ts:496](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L496)

Configuration for [createResult](../functions/createResult.md).

## Type Parameters

### E

`E` = `unknown`
