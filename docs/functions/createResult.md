[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / createResult

# Function: createResult()

> **createResult**\<`E`, `FE`\>(`config?`): [`ResultInterface`](../interfaces/ResultInterface.md)\<`E`, `FE`\>

Defined in: [src/index.ts:516](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L516)

Creates a [ResultInterface](../interfaces/ResultInterface.md) with pre-bound error mapping.

## Type Parameters

### E

`E` = `unknown`

### FE

`FE` = `unknown`

## Parameters

### config?

[`ResultConfig`](../type-aliases/ResultConfig.md)\<`E`, `FE`\>

Optional mapping configuration or a single mapError function.

## Returns

[`ResultInterface`](../interfaces/ResultInterface.md)\<`E`, `FE`\>

A [ResultInterface](../interfaces/ResultInterface.md) with pre-bound mappers.
