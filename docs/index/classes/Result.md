[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [index](../README.md) / Result

# Class: Result\<T, E\>

Defined in: [src/index.ts:103](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L103)

A class-based wrapper for [RawResult](../type-aliases/RawResult.md) that provides a fluent API
for both synchronous and asynchronous operations.

## Type Parameters

### T

`T`

The type of the value.

### E

`E`

The type of the error.

## Implements

- `PromiseLike`\<`T`\>

## Constructors

### Constructor

> **new Result**\<`T`, `E`\>(`inner`): `Result`\<`T`, `E`\>

Defined in: [src/index.ts:104](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L104)

#### Parameters

##### inner

[`RawResult`](../type-aliases/RawResult.md)\<`T`, `E`\> \| `Promise`\<[`RawResult`](../type-aliases/RawResult.md)\<`T`, `E`\>\>

#### Returns

`Result`\<`T`, `E`\>

## Properties

### inner

> `readonly` **inner**: [`RawResult`](../type-aliases/RawResult.md)\<`T`, `E`\> \| `Promise`\<[`RawResult`](../type-aliases/RawResult.md)\<`T`, `E`\>\>

Defined in: [src/index.ts:105](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L105)

## Methods

### finally()

> **finally**(`callback`, `mapFinallyError?`): `Result`\<`T`, `unknown`\>

Defined in: [src/index.ts:254](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L254)

Executes a callback regardless of whether the result is a success or failure.

#### Parameters

##### callback

(`result`) => `void` \| `Promise`\<`void`\>

##### mapFinallyError?

(`error`) => `unknown`

#### Returns

`Result`\<`T`, `unknown`\>

***

### flatMap()

> **flatMap**\<`U`\>(`fn`): `Result`\<`U`, `E`\>

Defined in: [src/index.ts:230](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L230)

Maps the success value to a new Result and flattens it.

#### Type Parameters

##### U

`U`

#### Parameters

##### fn

(`value`) => `Result`\<`U`, `E`\> \| [`RawResult`](../type-aliases/RawResult.md)\<`U`, `E`\> \| `Promise`\<[`RawResult`](../type-aliases/RawResult.md)\<`U`, `E`\>\>

#### Returns

`Result`\<`U`, `E`\>

***

### isErr()

> **isErr**(): `Promise`\<`boolean`\>

Defined in: [src/index.ts:351](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L351)

Checks if the result is a failure.

#### Returns

`Promise`\<`boolean`\>

***

### isErrSync()

> **isErrSync**(): `boolean`

Defined in: [src/index.ts:372](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L372)

Synchronously checks if the result is a failure.

#### Returns

`boolean`

#### Throws

If the result is pending (async).

***

### isOk()

> **isOk**(): `Promise`\<`boolean`\>

Defined in: [src/index.ts:343](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L343)

Checks if the result is a success.

#### Returns

`Promise`\<`boolean`\>

***

### isOkSync()

> **isOkSync**(): `boolean`

Defined in: [src/index.ts:361](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L361)

Synchronously checks if the result is a success.

#### Returns

`boolean`

#### Throws

If the result is pending (async).

***

### map()

> **map**\<`U`\>(`fn`): `Result`\<`U`, `E`\>

Defined in: [src/index.ts:218](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L218)

Maps the success value using the provided function.

#### Type Parameters

##### U

`U`

#### Parameters

##### fn

(`value`) => `U`

#### Returns

`Result`\<`U`, `E`\>

***

### then()

> **then**\<`TResult1`, `TResult2`\>(`onfulfilled?`, `onrejected?`): `Promise`\<`TResult1` \| `TResult2`\>

Defined in: [src/index.ts:203](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L203)

Implements PromiseLike.then to allow awaiting the Result directly.

#### Type Parameters

##### TResult1

`TResult1` = `T`

##### TResult2

`TResult2` = `never`

#### Parameters

##### onfulfilled?

(`value`) => `TResult1` \| `PromiseLike`\<`TResult1`\>

##### onrejected?

(`reason`) => `TResult2` \| `PromiseLike`\<`TResult2`\>

#### Returns

`Promise`\<`TResult1` \| `TResult2`\>

#### Implementation of

`PromiseLike.then`

***

### unwrap()

> **unwrap**(): `Promise`\<`T`\>

Defined in: [src/index.ts:305](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L305)

Returns the value if success, otherwise throws the error.

#### Returns

`Promise`\<`T`\>

***

### unwrapOr()

> **unwrapOr**\<`D`\>(`defaultValue`): `Promise`\<`T` \| `D`\>

Defined in: [src/index.ts:327](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L327)

Returns the value if success, otherwise returns the provided default value.

#### Type Parameters

##### D

`D`

#### Parameters

##### defaultValue

`D`

#### Returns

`Promise`\<`T` \| `D`\>

***

### unwrapOrElse()

> **unwrapOrElse**\<`D`\>(`fallback`): `Promise`\<`T` \| `D`\>

Defined in: [src/index.ts:335](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L335)

Returns the value if success, otherwise calls the fallback function with the error.

#### Type Parameters

##### D

`D`

#### Parameters

##### fallback

(`error`) => `D`

#### Returns

`Promise`\<`T` \| `D`\>

***

### unwrapSync()

> **unwrapSync**(): `T`

Defined in: [src/index.ts:316](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L316)

Synchronously returns the value if success, otherwise throws the error.

#### Returns

`T`

#### Throws

If the result is pending (async).

***

### all()

> `static` **all**\<`T`, `E`\>(`results`): `Promise`\<`Result`\<`T`[], `E`\>\>

Defined in: [src/index.ts:165](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L165)

Combines multiple results into a single result containing an array of values.
Fails if any of the input results are an error.

#### Type Parameters

##### T

`T`

##### E

`E`

#### Parameters

##### results

(`Result`\<`T`, `E`\> \| `Promise`\<`Result`\<`T`, `E`\>\>)[]

#### Returns

`Promise`\<`Result`\<`T`[], `E`\>\>

***

### allSettled()

> `static` **allSettled**\<`T`, `E`\>(`results`): `Promise`\<`Result`\<[`RawResult`](../type-aliases/RawResult.md)\<`T`, `E`\>[], `never`\>\>

Defined in: [src/index.ts:187](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L187)

Combines multiple results into a single result containing an array of [RawResult](../type-aliases/RawResult.md)s.
Never fails, instead captures all outcomes.

#### Type Parameters

##### T

`T`

##### E

`E`

#### Parameters

##### results

(`Result`\<`T`, `E`\> \| `Promise`\<`Result`\<`T`, `E`\>\>)[]

#### Returns

`Promise`\<`Result`\<[`RawResult`](../type-aliases/RawResult.md)\<`T`, `E`\>[], `never`\>\>

***

### async()

> `static` **async**\<`T`, `E`\>(`promise`): `Result`\<`T`, `E`\>

Defined in: [src/index.ts:118](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L118)

Wraps a promise of a [RawResult](../type-aliases/RawResult.md) into a Result.

#### Type Parameters

##### T

`T`

##### E

`E`

#### Parameters

##### promise

`Promise`\<[`RawResult`](../type-aliases/RawResult.md)\<`T`, `E`\>\>

#### Returns

`Result`\<`T`, `E`\>

***

### err()

> `static` **err**\<`E`\>(`error`): `Result`\<`never`, `E`\>

Defined in: [src/index.ts:132](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L132)

Creates a failed Result.

#### Type Parameters

##### E

`E`

#### Parameters

##### error

`E`

#### Returns

`Result`\<`never`, `E`\>

***

### fromPromiseLike()

> `static` **fromPromiseLike**\<`T`, `E`\>(`promise`, `mapError`): `Promise`\<`Result`\<`T`, `E`\>\>

Defined in: [src/index.ts:150](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L150)

Wraps a PromiseLike into a Result, capturing any rejection.

#### Type Parameters

##### T

`T`

##### E

`E`

#### Parameters

##### promise

`PromiseLike`\<`T`\>

##### mapError

(`e`) => `E`

#### Returns

`Promise`\<`Result`\<`T`, `E`\>\>

***

### fromThrowable()

> `static` **fromThrowable**\<`T`\>(`fn`): `Result`\<`T`, `unknown`\>

Defined in: [src/index.ts:139](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L139)

Executes a function and captures any thrown error into a Result.

#### Type Parameters

##### T

`T`

#### Parameters

##### fn

() => `T`

#### Returns

`Result`\<`T`, `unknown`\>

***

### ok()

> `static` **ok**\<`T`\>(`value`): `Result`\<`T`, `never`\>

Defined in: [src/index.ts:125](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L125)

Creates a successful Result.

#### Type Parameters

##### T

`T`

#### Parameters

##### value

`T`

#### Returns

`Result`\<`T`, `never`\>

***

### sync()

> `static` **sync**\<`T`, `E`\>(`value`): `Result`\<`T`, `E`\>

Defined in: [src/index.ts:111](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/index.ts#L111)

Wraps a synchronous [RawResult](../type-aliases/RawResult.md) into a Result.

#### Type Parameters

##### T

`T`

##### E

`E`

#### Parameters

##### value

[`RawResult`](../type-aliases/RawResult.md)\<`T`, `E`\>

#### Returns

`Result`\<`T`, `E`\>
