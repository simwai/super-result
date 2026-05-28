[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / FinallyError

# Class: FinallyError\<T, E\>

Defined in: [src/like-neverthrow.ts:73](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L73)

Wraps both the original result and a cleanup error when a finally block fails.

## Extends

- `Error`

## Type Parameters

### T

`T`

The success value type of the original result.

### E

`E`

The error type of the original result.

## Constructors

### Constructor

> **new FinallyError**\<`T`, `E`\>(`originalResult`, `finallyError`): `FinallyError`\<`T`, `E`\>

Defined in: [src/like-neverthrow.ts:77](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L77)

#### Parameters

##### originalResult

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

##### finallyError

`unknown`

#### Returns

`FinallyError`\<`T`, `E`\>

#### Overrides

`Error.constructor`

## Properties

### cause?

> `optional` **cause?**: `unknown`

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.es2022.error.d.ts:26

#### Inherited from

`Error.cause`

***

### finallyError

> `readonly` **finallyError**: `unknown`

Defined in: [src/like-neverthrow.ts:75](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L75)

***

### message

> **message**: `string`

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

`Error.message`

***

### name

> **name**: `string`

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

`Error.name`

***

### originalResult

> `readonly` **originalResult**: [`Result`](../type-aliases/Result.md)\<`T`, `E`\>

Defined in: [src/like-neverthrow.ts:74](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L74)

***

### stack?

> `optional` **stack?**: `string`

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

`Error.stack`
