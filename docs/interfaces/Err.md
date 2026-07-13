[**super-result API v1.3.1**](../README.md)

***

[super-result API](../README.md) / Err

# Interface: Err\<E\>

Defined in: [index.ts:22](https://gitlab.com/simwai/super-result/-/blob/d2883e855743f731cc8789c6b707f7643b62baec/src/index.ts#L22)

Represents a failed result.

## Example

```ts
const failure: Err<string> = { ok: false, error: 'something went wrong' }
```

## Type Parameters

### E

`E`

## Properties

### error

> `readonly` **error**: `E`

Defined in: [index.ts:26](https://gitlab.com/simwai/super-result/-/blob/d2883e855743f731cc8789c6b707f7643b62baec/src/index.ts#L26)

The error value

***

### ok

> `readonly` **ok**: `false`

Defined in: [index.ts:24](https://gitlab.com/simwai/super-result/-/blob/d2883e855743f731cc8789c6b707f7643b62baec/src/index.ts#L24)

The failure discriminator
