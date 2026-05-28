[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / createResult

# Function: createResult()

> **createResult**\<`E`\>(`options?`): [`ResultInterface`](../interfaces/ResultInterface.md)\<`E`\>

Defined in: [src/like-neverthrow.ts:608](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L608)

Create a [ResultInterface](../interfaces/ResultInterface.md) with pre-bound error mapping.

## Type Parameters

### E

`E` = `unknown`

## Parameters

### options?

[`ResultConfig`](../type-aliases/ResultConfig.md)\<`E`\>

Optional mapping configuration or a single `mapError` function.

## Returns

[`ResultInterface`](../interfaces/ResultInterface.md)\<`E`\>

A bound [ResultInterface](../interfaces/ResultInterface.md).

## Example

```ts
const R = createResult((e) => e instanceof Error ? e : new Error(String(e)))

const result = R.from(() => JSON.parse(rawInput))
```
