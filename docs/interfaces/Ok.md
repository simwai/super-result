[**super-result API v0.1.0**](../README.md)

***

[super-result API](../README.md) / Ok

# Interface: Ok\<T\>

Defined in: [index.ts:9](https://github.com/simwai/super-result/blob/0bc1c39ef5720eb6d5312b7353b4acd581ef9390/src/index.ts#L9)

Represents a successful result.

## Example

```ts
const success: Ok<number> = { ok: true, value: 42 }
```

## Type Parameters

### T

`T`

## Properties

### ok

> `readonly` **ok**: `true`

Defined in: [index.ts:11](https://github.com/simwai/super-result/blob/0bc1c39ef5720eb6d5312b7353b4acd581ef9390/src/index.ts#L11)

The success discriminator

***

### value

> `readonly` **value**: `T`

Defined in: [index.ts:13](https://github.com/simwai/super-result/blob/0bc1c39ef5720eb6d5312b7353b4acd581ef9390/src/index.ts#L13)

The successful value
