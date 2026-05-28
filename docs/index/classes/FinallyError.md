[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [index](../README.md) / FinallyError

# Class: FinallyError\<T, E\>

Defined in: [src/index.ts:83](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L83)

Error thrown when an error occurs within a finally block.

## Extends

- `Error`

## Type Parameters

### T

`T`

The type of the value.

### E

`E`

The type of the error.

## Implements

- [`Err`](../interfaces/Err.md)\<`unknown`\>

## Constructors

### Constructor

> **new FinallyError**\<`T`, `E`\>(`originalResult`, `error`): `FinallyError`\<`T`, `E`\>

Defined in: [src/index.ts:87](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L87)

#### Parameters

##### originalResult

[`RawResult`](../type-aliases/RawResult.md)\<`T`, `E`\>

##### error

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

### error

> `readonly` **error**: `unknown`

Defined in: [src/index.ts:85](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L85)

#### Implementation of

[`Err`](../interfaces/Err.md).[`error`](../interfaces/Err.md#error)

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

### ok

> `readonly` **ok**: `false` = `false`

Defined in: [src/index.ts:84](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L84)

#### Implementation of

[`Err`](../interfaces/Err.md).[`ok`](../interfaces/Err.md#ok)

***

### originalResult

> `readonly` **originalResult**: [`RawResult`](../type-aliases/RawResult.md)\<`T`, `E`\>

Defined in: [src/index.ts:86](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L86)

***

### stack?

> `optional` **stack?**: `string`

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

`Error.stack`
