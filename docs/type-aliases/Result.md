[**super-result API v0.1.0**](../README.md)

***

[super-result API](../README.md) / Result

# Type Alias: Result\<T, E\>

> **Result**\<`T`, `E`\> = [`Ok`](../interfaces/Ok.md)\<`T`\> \| [`Err`](../interfaces/Err.md)\<`E`\>

Defined in: [index.ts:40](https://github.com/simwai/super-result/blob/0bc1c39ef5720eb6d5312b7353b4acd581ef9390/src/index.ts#L40)

A discriminated union representing either success (Ok) or failure (Err).

This type is the core of railway-oriented programming in this library.

## Type Parameters

### T

`T`

### E

`E`

## Example

```ts
function divide(a: number, b: number): Result<number, string> {
  if (b === 0) return { ok: false, error: 'Division by zero' }
  return { ok: true, value: a / b }
}
```
