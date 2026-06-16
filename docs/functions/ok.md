[**super-result API v0.1.0**](../README.md)

***

[super-result API](../README.md) / ok

# Function: ok()

> **ok**\<`T`\>(`value`): [`Ok`](../interfaces/Ok.md)\<`T`\>

Defined in: [index.ts:70](https://github.com/simwai/super-result/blob/c8c5eec8472f853bcbc6d2f4528dda310e35c600/src/index.ts#L70)

Creates a successful result.

## Type Parameters

### T

`T`

## Parameters

### value

`T`

The value to wrap in an Ok result

## Returns

[`Ok`](../interfaces/Ok.md)\<`T`\>

An Ok result containing the value

## Example

```ts
const res = ok(42)
if (res.ok) {
  console.log(res.value) // 42
}
```
