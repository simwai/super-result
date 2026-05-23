[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / flatMap

# Function: flatMap()

> **flatMap**\<`T`, `E`, `U`\>(`result`, `fn`): [`Result`](../type-aliases/Result.md)\<`U`, `E`\>

Defined in: [src/index.ts:348](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L348)

Chain another operation that returns a [Result](../type-aliases/Result.md).

## Type Parameters

### T

`T`

### E

`E`

### U

`U`

## Parameters

### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

### fn

(`value`) => [`Result`](../type-aliases/Result.md)\<`U`, `E`\>

## Returns

[`Result`](../type-aliases/Result.md)\<`U`, `E`\>
