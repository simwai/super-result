[**super-result API v1.4.2**](../README.md)

***

[super-result API](../README.md) / Ok

# Interface: Ok\<T\>

Defined in: [index.ts:9](https://gitlab.com/simwai/super-result/-/blob/b0e679b9ceb8efecd14505923dea905a0118cad0/src/index.ts#L9)

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

Defined in: [index.ts:11](https://gitlab.com/simwai/super-result/-/blob/b0e679b9ceb8efecd14505923dea905a0118cad0/src/index.ts#L11)

The success discriminator

***

### value

> `readonly` **value**: `T`

Defined in: [index.ts:13](https://gitlab.com/simwai/super-result/-/blob/b0e679b9ceb8efecd14505923dea905a0118cad0/src/index.ts#L13)

The successful value
