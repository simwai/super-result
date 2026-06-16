[**super-result API v0.1.0**](../README.md)

***

[super-result API](../README.md) / err

# Function: err()

> **err**\<`E`\>(`error`): [`Err`](../interfaces/Err.md)\<`E`\>

Defined in: [index.ts:86](https://github.com/simwai/super-result/blob/c8c5eec8472f853bcbc6d2f4528dda310e35c600/src/index.ts#L86)

Creates a failed result.

## Type Parameters

### E

`E`

## Parameters

### error

`E`

The error to wrap in an Err result

## Returns

[`Err`](../interfaces/Err.md)\<`E`\>

An Err result containing the error

## Example

```ts
const res = err(new Error('failure'))
if (!res.ok) {
  console.error(res.error.message)
}
```
