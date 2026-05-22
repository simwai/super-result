[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / createResult

# Function: createResult()

> **createResult**\<`E`, `FE`\>(`options?`): [`ResultInterface`](../interfaces/ResultInterface.md)\<`E`, `FE`\>

Defined in: [src/index.ts:618](https://github.com/simwai/super-result/blob/fde25a70daba3710c7a20f2a27ab3b5c68c769e2/src/index.ts#L618)

Create a [ResultInterface](../interfaces/ResultInterface.md) with pre-bound error mapping.

## Type Parameters

### E

`E` = `unknown`

### FE

`FE` = `unknown`

## Parameters

### options?

[`ResultConfig`](../type-aliases/ResultConfig.md)\<`E`, `FE`\>

Optional mapping configuration or a single `mapError` function.

## Returns

[`ResultInterface`](../interfaces/ResultInterface.md)\<`E`, `FE`\>

A bound [ResultInterface](../interfaces/ResultInterface.md).

## Example

```ts
const R = createResult((e) => e instanceof Error ? e : new Error(String(e)))

const result = R.from(() => JSON.parse(rawInput))
```
