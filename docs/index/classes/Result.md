[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [index](../README.md) / Result

# Class: Result\<T, E\>

Defined in: [src/index.ts:119](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L119)

A class-based wrapper for RawResult that provides a fluent API
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

Defined in: [src/index.ts:120](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L120)

#### Parameters

##### inner

[`RawResult`](../type-aliases/RawResult.md)\<`T`, `E`\> \| `Promise`\<[`RawResult`](../type-aliases/RawResult.md)\<`T`, `E`\>\>

#### Returns

`Result`\<`T`, `E`\>

## Properties

### inner

> `readonly` **inner**: [`RawResult`](../type-aliases/RawResult.md)\<`T`, `E`\> \| `Promise`\<[`RawResult`](../type-aliases/RawResult.md)\<`T`, `E`\>\>

Defined in: [src/index.ts:121](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L121)

## Accessors

### error

#### Get Signature

> **get** **error**(): `E` \| `undefined`

Defined in: [src/index.ts:442](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L442)

Returns the error value if the result is synchronous and failed, otherwise undefined.

##### Returns

`E` \| `undefined`

***

### value

#### Get Signature

> **get** **value**(): `T` \| `undefined`

Defined in: [src/index.ts:435](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L435)

Returns the success value if the result is synchronous and successful, otherwise undefined.

##### Returns

`T` \| `undefined`

## Methods

### finally()

> **finally**(`callback`, `mapFinallyError?`): `Result`\<`T`, `unknown`\>

Defined in: [src/index.ts:304](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L304)

Executes a callback regardless of whether the result is a success or failure.

#### Parameters

##### callback

(`result`) => `void` \| `Promise`\<`void`\>

The callback to execute.

##### mapFinallyError?

(`error`) => `unknown`

Optional function to map errors thrown within the callback.

#### Returns

`Result`\<`T`, `unknown`\>

***

### flatMap()

> **flatMap**\<`U`\>(`fn`): `Result`\<`U`, `E`\>

Defined in: [src/index.ts:277](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L277)

Maps the success value to a new Result and flattens it.

#### Type Parameters

##### U

`U`

#### Parameters

##### fn

(`value`) => `Result`\<`U`, `E`\> \| [`RawResult`](../type-aliases/RawResult.md)\<`U`, `E`\> \| `Promise`\<[`RawResult`](../type-aliases/RawResult.md)\<`U`, `E`\>\>

The transformation function that returns a Result or Promise of a result.

#### Returns

`Result`\<`U`, `E`\>

***

### isErr()

> **isErr**(): `Promise`\<`boolean`\>

Defined in: [src/index.ts:405](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L405)

Checks if the result is a failure.

#### Returns

`Promise`\<`boolean`\>

***

### isErrSync()

> **isErrSync**(): `this is Result<T, E> & { error: E; value: undefined }`

Defined in: [src/index.ts:426](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L426)

Synchronously checks if the result is a failure.

#### Returns

`this is Result<T, E> & { error: E; value: undefined }`

#### Throws

If the result is pending (async).

***

### isOk()

> **isOk**(): `Promise`\<`boolean`\>

Defined in: [src/index.ts:397](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L397)

Checks if the result is a success.

#### Returns

`Promise`\<`boolean`\>

***

### isOkSync()

> **isOkSync**(): `this is Result<T, E> & { error: undefined; value: T }`

Defined in: [src/index.ts:415](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L415)

Synchronously checks if the result is a success.

#### Returns

`this is Result<T, E> & { error: undefined; value: T }`

#### Throws

If the result is pending (async).

***

### map()

> **map**\<`U`\>(`fn`): `Result`\<`U`, `E`\>

Defined in: [src/index.ts:263](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L263)

Maps the success value using the provided function.

#### Type Parameters

##### U

`U`

#### Parameters

##### fn

(`value`) => `U`

The transformation function.

#### Returns

`Result`\<`U`, `E`\>

#### Example

```ts
const res = Result.ok(21).map(n => n * 2)
```

***

### then()

> **then**\<`TResult1`, `TResult2`\>(`onfulfilled?`, `onrejected?`): `Promise`\<`TResult1` \| `TResult2`\>

Defined in: [src/index.ts:241](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L241)

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

Defined in: [src/index.ts:355](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L355)

Returns the value if success, otherwise throws the error.

#### Returns

`Promise`\<`T`\>

***

### unwrapOr()

> **unwrapOr**\<`D`\>(`defaultValue`): `Promise`\<`T` \| `D`\>

Defined in: [src/index.ts:379](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L379)

Returns the value if success, otherwise returns the provided default value.

#### Type Parameters

##### D

`D`

#### Parameters

##### defaultValue

`D`

The value to return if the result is an error.

#### Returns

`Promise`\<`T` \| `D`\>

***

### unwrapOrElse()

> **unwrapOrElse**\<`D`\>(`fallback`): `Promise`\<`T` \| `D`\>

Defined in: [src/index.ts:389](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L389)

Returns the value if success, otherwise calls the fallback function with the error.

#### Type Parameters

##### D

`D`

#### Parameters

##### fallback

(`error`) => `D`

The function to call if the result is an error.

#### Returns

`Promise`\<`T` \| `D`\>

***

### unwrapSync()

> **unwrapSync**(): `T`

Defined in: [src/index.ts:366](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L366)

Synchronously returns the value if success, otherwise throws the error.

#### Returns

`T`

#### Throws

If the result is pending (async).

***

### all()

> `static` **all**\<`T`, `E`\>(`results`): `Promise`\<`Result`\<`T`[], `E`\>\>

Defined in: [src/index.ts:201](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L201)

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

An array of results or promises of results.

#### Returns

`Promise`\<`Result`\<`T`[], `E`\>\>

***

### allSettled()

> `static` **allSettled**\<`T`, `E`\>(`results`): `Promise`\<`Result`\<[`RawResult`](../type-aliases/RawResult.md)\<`T`, `E`\>[], `never`\>\>

Defined in: [src/index.ts:225](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L225)

Combines multiple results into a single result containing an array of RawResults.
Never fails, instead captures all outcomes.

#### Type Parameters

##### T

`T`

##### E

`E`

#### Parameters

##### results

(`Result`\<`T`, `E`\> \| `Promise`\<`Result`\<`T`, `E`\>\>)[]

An array of results or promises of results.

#### Returns

`Promise`\<`Result`\<[`RawResult`](../type-aliases/RawResult.md)\<`T`, `E`\>[], `never`\>\>

***

### async()

> `static` **async**\<`T`, `E`\>(`promise`): `Result`\<`T`, `E`\>

Defined in: [src/index.ts:138](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L138)

Wraps a promise of a RawResult into a Result.

#### Type Parameters

##### T

`T`

##### E

`E`

#### Parameters

##### promise

`Promise`\<[`RawResult`](../type-aliases/RawResult.md)\<`T`, `E`\>\>

The promise of a raw result to wrap.

#### Returns

`Result`\<`T`, `E`\>

***

### err()

> `static` **err**\<`E`\>(`error`): `Result`\<`never`, `E`\>

Defined in: [src/index.ts:156](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L156)

Creates a failed Result.

#### Type Parameters

##### E

`E`

#### Parameters

##### error

`E`

The error value.

#### Returns

`Result`\<`never`, `E`\>

***

### fromPromiseLike()

> `static` **fromPromiseLike**\<`T`, `E`\>(`promise`, `mapError`): `Promise`\<`Result`\<`T`, `E`\>\>

Defined in: [src/index.ts:184](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L184)

Wraps a PromiseLike into a Result, capturing any rejection.

#### Type Parameters

##### T

`T`

##### E

`E`

#### Parameters

##### promise

`PromiseLike`\<`T`\>

The promise-like to wrap.

##### mapError

(`e`) => `E`

A function to map the potential rejection error.

#### Returns

`Promise`\<`Result`\<`T`, `E`\>\>

***

### fromThrowable()

> `static` **fromThrowable**\<`T`\>(`fn`): `Result`\<`T`, `unknown`\>

Defined in: [src/index.ts:170](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L170)

Executes a function and captures any thrown error into a Result.

#### Type Parameters

##### T

`T`

#### Parameters

##### fn

() => `T`

The function to execute.

#### Returns

`Result`\<`T`, `unknown`\>

#### Example

```ts
const res = Result.fromThrowable(() => JSON.parse('{ "ok": true }'))
```

***

### ok()

> `static` **ok**\<`T`\>(`value`): `Result`\<`T`, `never`\>

Defined in: [src/index.ts:147](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L147)

Creates a successful Result.

#### Type Parameters

##### T

`T`

#### Parameters

##### value

`T`

The success value.

#### Returns

`Result`\<`T`, `never`\>

***

### sync()

> `static` **sync**\<`T`, `E`\>(`value`): `Result`\<`T`, `E`\>

Defined in: [src/index.ts:129](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/index.ts#L129)

Wraps a synchronous RawResult into a Result.

#### Type Parameters

##### T

`T`

##### E

`E`

#### Parameters

##### value

[`RawResult`](../type-aliases/RawResult.md)\<`T`, `E`\>

The raw result to wrap.

#### Returns

`Result`\<`T`, `E`\>
