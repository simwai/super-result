[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / NonErrorThrown

# Class: NonErrorThrown

Defined in: [src/index.ts:43](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L43)

Thrown by [unwrap](../functions/unwrap.md) when the error value is not an `Error` instance.
Wraps the raw thrown value in `.value` for inspection.

## Extends

- `Error`

## Constructors

### Constructor

> **new NonErrorThrown**(`value`): `NonErrorThrown`

Defined in: [src/index.ts:49](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L49)

#### Parameters

##### value

`unknown`

The non-Error value that was thrown.

#### Returns

`NonErrorThrown`

#### Overrides

`Error.constructor`

## Properties

### cause?

> `optional` **cause?**: `unknown`

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.es2022.error.d.ts:26

#### Inherited from

`Error.cause`

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

### stack?

> `optional` **stack?**: `string`

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

`Error.stack`

***

### value

> `readonly` **value**: `unknown`

Defined in: [src/index.ts:44](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L44)
