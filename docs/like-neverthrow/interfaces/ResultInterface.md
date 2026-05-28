[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / ResultInterface

# Interface: ResultInterface\<E\>

Defined in: [src/like-neverthrow.ts:509](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L509)

Interface returned by [createResult](../functions/createResult.md).

## Type Parameters

### E

`E` = `unknown`

The bound error type.

## Properties

### Constructors

#### ok

> **ok**: \<`T`\>(`value`) => [`Ok`](Ok.md)\<`T`\>

Defined in: [src/like-neverthrow.ts:510](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L510)

Create a successful [Ok](Ok.md) result.

##### Type Parameters

###### T

`T`

##### Parameters

###### value

`T`

##### Returns

[`Ok`](Ok.md)\<`T`\>

***

#### okAsync

> **okAsync**: \<`T`\>(`value`) => [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `never`\>

Defined in: [src/like-neverthrow.ts:512](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L512)

Create a successful [ResultAsync](../type-aliases/ResultAsync.md).

##### Type Parameters

###### T

`T`

##### Parameters

###### value

`T`

##### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `never`\>

### Lifecycle

#### onFinally

> **onFinally**: \{\<`T`, `E`\>(`result`, `callback`, `mapFinallyError?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`\>\>; \<`T`, `E`\>(`result`, `callback`, `mapFinallyError?`): [`Result`](../type-aliases/Result.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`\>\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`\>\>; \}

Defined in: [src/like-neverthrow.ts:590](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L590)

##### Call Signature

> \<`T`, `E`\>(`result`, `callback`, `mapFinallyError?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`\>\>

Execute a callback regardless of the result. Returns a promise resolving to the result
or a [FinallyError](../classes/FinallyError.md) if the callback fails.

###### Type Parameters

###### T

`T`

###### E

`E`

###### Parameters

###### result

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

###### callback

(`result`) => `void` \| `PromiseLike`\<`void`\>

###### mapFinallyError?

(`error`) => `unknown`

###### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`\>\>

##### Call Signature

> \<`T`, `E`\>(`result`, `callback`, `mapFinallyError?`): [`Result`](../type-aliases/Result.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`\>\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`\>\>

Execute a callback regardless of the result. Returns a promise resolving to the result
or a [FinallyError](../classes/FinallyError.md) if the callback fails.

###### Type Parameters

###### T

`T`

###### E

`E`

###### Parameters

###### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

###### callback

(`result`) => `void` \| `PromiseLike`\<`void`\>

###### mapFinallyError?

(`error`) => `unknown`

###### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`\>\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`\>\>

***

#### onFinallyAsync

> **onFinallyAsync**: \<`T`, `E`\>(`resultPromise`, `callback`, `mapFinallyError`) => [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`\>\>

Defined in: [src/like-neverthrow.ts:591](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L591)

Purely async variant of [onFinally](../functions/onFinally.md).

##### Type Parameters

###### T

`T`

###### E

`E`

##### Parameters

###### resultPromise

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

###### callback

(`result`) => `void` \| `PromiseLike`\<`void`\>

###### mapFinallyError?

(`error`) => `unknown`

##### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`\>\>

### Pattern Matching

#### match

> **match**: \<`T`, `E`, `U`, `V`\>(`result`, `onOk`, `onErr`) => `U` \| `V`

Defined in: [src/like-neverthrow.ts:580](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L580)

Branch logic based on the result state.

##### Type Parameters

###### T

`T`

###### E

`E`

###### U

`U`

###### V

`V`

##### Parameters

###### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

###### onOk

(`value`) => `U`

###### onErr

(`error`) => `V`

##### Returns

`U` \| `V`

***

#### matchAsync

> **matchAsync**: \<`T`, `E`, `U`, `V`\>(`resultPromise`, `onOk`, `onErr`) => `Promise`\<`U` \| `V`\>

Defined in: [src/like-neverthrow.ts:581](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L581)

Async variant of [match](../functions/match.md). Awaits `resultPromise` before branching.

##### Type Parameters

###### T

`T`

###### E

`E`

###### U

`U`

###### V

`V`

##### Parameters

###### resultPromise

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

###### onOk

(`value`) => `U` \| `PromiseLike`\<`U`\>

###### onErr

(`error`) => `V` \| `PromiseLike`\<`V`\>

##### Returns

`Promise`\<`U` \| `V`\>

### Predicates

#### isErr

> **isErr**: \<`T`, `E`\>(`result`) => `result is Err<E>`

Defined in: [src/like-neverthrow.ts:516](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L516)

Type guard: check if a result is [Err](Err.md).

##### Type Parameters

###### T

`T`

###### E

`E`

##### Parameters

###### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

##### Returns

`result is Err<E>`

***

#### isOk

> **isOk**: \<`T`, `E`\>(`result`) => `result is Ok<T>`

Defined in: [src/like-neverthrow.ts:515](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L515)

Type guard: check if a result is [Ok](Ok.md).

##### Type Parameters

###### T

`T`

###### E

`E`

##### Parameters

###### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

##### Returns

`result is Ok<T>`

### Unwrap

#### unwrap

> **unwrap**: \<`T`, `E`\>(`result`) => `T`

Defined in: [src/like-neverthrow.ts:583](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L583)

Return the value if `Ok`, otherwise throw.

##### Type Parameters

###### T

`T`

###### E

`E`

##### Parameters

###### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

##### Returns

`T`

##### Throws

The original error if it is an `Error` instance.

##### Throws

If the error is not an `Error` instance.

***

#### unwrapAsync

> **unwrapAsync**: \<`T`, `E`\>(`resultPromise`) => `Promise`\<`T`\>

Defined in: [src/like-neverthrow.ts:586](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L586)

Async variant of [unwrap](../functions/unwrap.md).

##### Type Parameters

###### T

`T`

###### E

`E`

##### Parameters

###### resultPromise

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

##### Returns

`Promise`\<`T`\>

##### Throws

The original error if it is an `Error` instance.

##### Throws

If the error is not an `Error` instance.

***

#### unwrapOr

> **unwrapOr**: \<`T`, `E`, `D`\>(`result`, `defaultValue`) => `T` \| `D`

Defined in: [src/like-neverthrow.ts:584](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L584)

Return the value if `Ok`, otherwise return `defaultValue`.

##### Type Parameters

###### T

`T`

###### E

`E`

###### D

`D`

##### Parameters

###### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

###### defaultValue

`D`

##### Returns

`T` \| `D`

***

#### unwrapOrAsync

> **unwrapOrAsync**: \<`T`, `E`, `D`\>(`resultPromise`, `defaultValue`) => `Promise`\<`T` \| `D`\>

Defined in: [src/like-neverthrow.ts:587](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L587)

Async variant of [unwrapOr](../functions/unwrapOr.md).

##### Type Parameters

###### T

`T`

###### E

`E`

###### D

`D`

##### Parameters

###### resultPromise

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

###### defaultValue

`D`

##### Returns

`Promise`\<`T` \| `D`\>

***

#### unwrapOrElse

> **unwrapOrElse**: \<`T`, `E`, `U`\>(`result`, `onErr`) => `T` \| `U`

Defined in: [src/like-neverthrow.ts:585](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L585)

Return the value if `Ok`, otherwise call `onErr` and return its result.

##### Type Parameters

###### T

`T`

###### E

`E`

###### U

`U`

##### Parameters

###### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

###### onErr

(`error`) => `U`

##### Returns

`T` \| `U`

***

#### unwrapOrElseAsync

> **unwrapOrElseAsync**: \<`T`, `E`, `U`\>(`resultPromise`, `onErr`) => `Promise`\<`T` \| `U`\>

Defined in: [src/like-neverthrow.ts:588](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L588)

Async variant of [unwrapOrElse](../functions/unwrapOrElse.md).

##### Type Parameters

###### T

`T`

###### E

`E`

###### U

`U`

##### Parameters

###### resultPromise

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

###### onErr

(`error`) => `U` \| `PromiseLike`\<`U`\>

##### Returns

`Promise`\<`T` \| `U`\>

## Methods

### err()

> **err**(`error`): [`Err`](Err.md)\<`E`\>

Defined in: [src/like-neverthrow.ts:511](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L511)

#### Parameters

##### error

`E`

#### Returns

[`Err`](Err.md)\<`E`\>

***

### errAsync()

> **errAsync**(`error`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`never`, `E`\>

Defined in: [src/like-neverthrow.ts:513](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L513)

#### Parameters

##### error

`E`

#### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`never`, `E`\>

***

### flatMap()

> **flatMap**\<`T`, `U`\>(`result`, `fn`): [`Result`](../type-aliases/Result.md)\<`U`, `E`\>

Defined in: [src/like-neverthrow.ts:571](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L571)

#### Type Parameters

##### T

`T`

##### U

`U`

#### Parameters

##### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

##### fn

(`value`) => [`Result`](../type-aliases/Result.md)\<`U`, `E`\>

#### Returns

[`Result`](../type-aliases/Result.md)\<`U`, `E`\>

***

### flatMapAsync()

> **flatMapAsync**\<`T`, `U`\>(`result`, `fn`): `Promise`\<[`Result`](../type-aliases/Result.md)\<`U`, `E`\>\>

Defined in: [src/like-neverthrow.ts:575](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L575)

#### Type Parameters

##### T

`T`

##### U

`U`

#### Parameters

##### result

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

##### fn

(`value`) => [`Result`](../type-aliases/Result.md)\<`U`, `E`\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`U`, `E`\>

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<`U`, `E`\>\>

***

### from()

#### Call Signature

> **from**\<`T`, `F`\>(`fn`, `options`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`\>\>

Defined in: [src/like-neverthrow.ts:521](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L521)

Unified capture entry point. Accepts a sync/async factory or a `PromiseLike`.

##### Type Parameters

###### T

`T`

###### F

`F` = `E`

##### Parameters

###### fn

() => `T`

###### options

[`CaptureOptions`](CaptureOptions.md)\<`T`, `F`\> & `object`

##### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`\>\>

#### Call Signature

> **from**\<`T`, `F`\>(`fn`, `options?`): [`Result`](../type-aliases/Result.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`\>\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`\>\>

Defined in: [src/like-neverthrow.ts:527](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L527)

##### Type Parameters

###### T

`T`

###### F

`F` = `E`

##### Parameters

###### fn

() => `T`

###### options?

[`CaptureOptions`](CaptureOptions.md)\<`T`, `F`\>

##### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`\>\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`\>\>

#### Call Signature

> **from**\<`T`, `F`\>(`fn`, `options?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`\>\>

Defined in: [src/like-neverthrow.ts:531](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L531)

##### Type Parameters

###### T

`T`

###### F

`F` = `E`

##### Parameters

###### fn

() => `PromiseLike`\<`T`\>

###### options?

[`CaptureOptions`](CaptureOptions.md)\<`T`, `F`\>

##### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`\>\>

#### Call Signature

> **from**\<`T`, `F`\>(`promise`, `options?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`\>\>

Defined in: [src/like-neverthrow.ts:535](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L535)

##### Type Parameters

###### T

`T`

###### F

`F` = `E`

##### Parameters

###### promise

`PromiseLike`\<`T`\>

###### options?

[`CaptureOptions`](CaptureOptions.md)\<`T`, `F`\>

##### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`\>\>

***

### fromAsyncThrowable()

> **fromAsyncThrowable**\<`T`, `F`\>(`fn`, `options?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`\>\>

Defined in: [src/like-neverthrow.ts:556](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L556)

#### Type Parameters

##### T

`T`

##### F

`F` = `E`

#### Parameters

##### fn

() => `PromiseLike`\<`T`\>

##### options?

[`CaptureOptions`](CaptureOptions.md)\<`T`, `F`\>

#### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`\>\>

***

### fromPromise()

> **fromPromise**\<`T`, `F`\>(`promise`, `options?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`\>\>

Defined in: [src/like-neverthrow.ts:551](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L551)

#### Type Parameters

##### T

`T`

##### F

`F` = `E`

#### Parameters

##### promise

`PromiseLike`\<`T`\>

##### options?

[`CaptureOptions`](CaptureOptions.md)\<`T`, `F`\>

#### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`\>\>

***

### fromThrowable()

#### Call Signature

> **fromThrowable**\<`T`, `F`\>(`fn`, `options`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`\>\>

Defined in: [src/like-neverthrow.ts:540](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L540)

##### Type Parameters

###### T

`T`

###### F

`F` = `E`

##### Parameters

###### fn

() => `T`

###### options

[`CaptureOptions`](CaptureOptions.md)\<`T`, `F`\> & `object`

##### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`\>\>

#### Call Signature

> **fromThrowable**\<`T`, `F`\>(`fn`, `options?`): [`Result`](../type-aliases/Result.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`\>\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`\>\>

Defined in: [src/like-neverthrow.ts:546](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L546)

##### Type Parameters

###### T

`T`

###### F

`F` = `E`

##### Parameters

###### fn

() => `T`

###### options?

[`CaptureOptions`](CaptureOptions.md)\<`T`, `F`\>

##### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`\>\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`\>\>

***

### map()

> **map**\<`T`, `U`\>(`result`, `fn`): [`Result`](../type-aliases/Result.md)\<`U`, `E`\>

Defined in: [src/like-neverthrow.ts:561](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L561)

#### Type Parameters

##### T

`T`

##### U

`U`

#### Parameters

##### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

##### fn

(`value`) => `U`

#### Returns

[`Result`](../type-aliases/Result.md)\<`U`, `E`\>

***

### mapAsync()

> **mapAsync**\<`T`, `U`\>(`result`, `fn`): `Promise`\<[`Result`](../type-aliases/Result.md)\<`U`, `E`\>\>

Defined in: [src/like-neverthrow.ts:562](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L562)

#### Type Parameters

##### T

`T`

##### U

`U`

#### Parameters

##### result

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

##### fn

(`value`) => `U` \| `PromiseLike`\<`U`\>

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<`U`, `E`\>\>

***

### mapErr()

> **mapErr**\<`T`, `F`\>(`result`, `fn`): [`Result`](../type-aliases/Result.md)\<`T`, `F`\>

Defined in: [src/like-neverthrow.ts:566](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L566)

#### Type Parameters

##### T

`T`

##### F

`F`

#### Parameters

##### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

##### fn

(`error`) => `F`

#### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `F`\>

***

### mapErrAsync()

> **mapErrAsync**\<`T`, `F`\>(`result`, `fn`): `Promise`\<[`Result`](../type-aliases/Result.md)\<`T`, `F`\>\>

Defined in: [src/like-neverthrow.ts:567](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/like-neverthrow.ts#L567)

#### Type Parameters

##### T

`T`

##### F

`F`

#### Parameters

##### result

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

##### fn

(`error`) => `F` \| `PromiseLike`\<`F`\>

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<`T`, `F`\>\>
