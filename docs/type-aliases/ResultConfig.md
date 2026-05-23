[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / ResultConfig

# Type Alias: ResultConfig\<E, FE\>

> **ResultConfig**\<`E`, `FE`\> = \{ `mapError?`: (`error`) => `E`; `mapFinallyError?`: (`error`) => `FE`; \} \| ((`error`) => `E`)

Defined in: [src/index.ts:501](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L501)

Configuration for [createResult](../functions/createResult.md).

## Type Parameters

### E

`E` = `unknown`

### FE

`FE` = `unknown`
