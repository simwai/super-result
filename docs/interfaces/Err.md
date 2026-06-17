[**super-result API v0.1.0**](../README.md)

***

[super-result API](../README.md) / Err

# Interface: Err\<E\>

Defined in: [index.ts:22](https://github.com/simwai/super-result/blob/0bc1c39ef5720eb6d5312b7353b4acd581ef9390/src/index.ts#L22)

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

Defined in: [index.ts:26](https://github.com/simwai/super-result/blob/0bc1c39ef5720eb6d5312b7353b4acd581ef9390/src/index.ts#L26)

The error value

***

### ok

> `readonly` **ok**: `false`

Defined in: [index.ts:24](https://github.com/simwai/super-result/blob/0bc1c39ef5720eb6d5312b7353b4acd581ef9390/src/index.ts#L24)

The failure discriminator
