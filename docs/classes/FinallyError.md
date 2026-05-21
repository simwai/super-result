[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / FinallyError

# Class: FinallyError\<T, E, FE\>

Defined in: [src/index.ts:62](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L62)

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

### FE

`FE`

The type of the finally block error.

## Constructors

### Constructor

> **new FinallyError**\<`T`, `E`, `FE`\>(`originalResult`, `finallyError`): `FinallyError`\<`T`, `E`, `FE`\>

Defined in: [src/index.ts:66](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L66)

#### Parameters

##### originalResult

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

##### finallyError

`FE`

#### Returns

`FinallyError`\<`T`, `E`, `FE`\>

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

> `readonly` **finallyError**: `FE`

Defined in: [src/index.ts:64](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L64)

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

Defined in: [src/index.ts:63](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L63)

***

### stack?

> `optional` **stack?**: `string`

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

`Error.stack`
