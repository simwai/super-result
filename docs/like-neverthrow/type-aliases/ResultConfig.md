[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / ResultConfig

# Type Alias: ResultConfig\<E\>

> **ResultConfig**\<`E`\> = \{ `mapError?`: (`error`) => `E`; `mapFinallyError?`: (`error`) => `unknown`; \} \| ((`error`) => `E`)

Defined in: [src/like-neverthrow.ts:548](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L548)

Configuration for createResult.

## Type Parameters

### E

`E` = `unknown`
