[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / ResultInterface

# Interface: ResultInterface\<E, FE\>

Defined in: [src/index.ts:417](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L417)

Interface returned by [createResult](../functions/createResult.md).

## Type Parameters

### E

`E` = `unknown`

The bound error type.

### FE

`FE` = `unknown`

The bound finally error type.

## Properties

### finally

> **finally**: \{\<`T`, `E`, `FE`\>(`result`, `callback`, `mapFinallyError?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`, `FE`\>\>; \<`T`, `E`, `FE`\>(`result`, `callback`, `mapFinallyError?`): [`Result`](../type-aliases/Result.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`, `FE`\>\>; \}

Defined in: [src/index.ts:503](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L503)

#### Call Signature

> \<`T`, `E`, `FE`\>(`result`, `callback`, `mapFinallyError?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`, `FE`\>\>

Executes a callback after a result is determined.

##### Type Parameters

###### T

`T`

###### E

`E`

###### FE

`FE` = `unknown`

##### Parameters

###### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

###### callback

(`result`) => `Promise`\<`void`\>

###### mapFinallyError?

(`error`) => `FE`

##### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`, `FE`\>\>

#### Call Signature

> \<`T`, `E`, `FE`\>(`result`, `callback`, `mapFinallyError?`): [`Result`](../type-aliases/Result.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`, `FE`\>\>

Executes a callback after a result is determined.

##### Type Parameters

###### T

`T`

###### E

`E`

###### FE

`FE` = `unknown`

##### Parameters

###### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

###### callback

(`result`) => `void`

###### mapFinallyError?

(`error`) => `FE`

##### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`, `FE`\>\>

***

### finallyAsync

> **finallyAsync**: \<`T`, `E`, `FE`\>(`resultPromise`, `callback`, `mapFinallyError`) => [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`, `FE`\>\>

Defined in: [src/index.ts:504](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L504)

Async variant of [onFinally](../functions/onFinally.md).

#### Type Parameters

##### T

`T`

##### E

`E`

##### FE

`FE` = `unknown`

#### Parameters

##### resultPromise

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

##### callback

(`result`) => `void` \| `Promise`\<`void`\>

##### mapFinallyError?

(`error`) => `FE`

#### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`, `FE`\>\>

***

### isErr

> **isErr**: \<`T`, `E`\>(`result`) => `result is Err<E>`

Defined in: [src/index.ts:424](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L424)

#### Type Parameters

##### T

`T`

##### E

`E`

#### Parameters

##### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

#### Returns

`result is Err<E>`

***

### isOk

> **isOk**: \<`T`, `E`\>(`result`) => `result is Ok<T>`

Defined in: [src/index.ts:423](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L423)

#### Type Parameters

##### T

`T`

##### E

`E`

#### Parameters

##### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

#### Returns

`result is Ok<T>`

***

### match

> **match**: \<`T`, `E`, `U`, `V`\>(`result`, `onOk`, `onErr`) => `U` \| `V`

Defined in: [src/index.ts:493](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L493)

Exhaustive match over a [Result](../type-aliases/Result.md). Exactly one branch runs.

#### Type Parameters

##### T

`T`

##### E

`E`

##### U

`U`

##### V

`V`

#### Parameters

##### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

The result to match.

##### onOk

(`value`) => `U`

Called with the value when `Ok`.

##### onErr

(`error`) => `V`

Called with the error when `Err`.

#### Returns

`U` \| `V`

The return value of whichever branch ran.

***

### matchAsync

> **matchAsync**: \<`T`, `E`, `U`, `V`\>(`resultPromise`, `onOk`, `onErr`) => `Promise`\<`U` \| `V`\>

Defined in: [src/index.ts:494](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L494)

Async variant of [match](../functions/match.md). Awaits `resultPromise` before branching.

#### Type Parameters

##### T

`T`

##### E

`E`

##### U

`U`

##### V

`V`

#### Parameters

##### resultPromise

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

The async result to match.

##### onOk

(`value`) => `U` \| `PromiseLike`\<`U`\>

Called with the value when `Ok`.

##### onErr

(`error`) => `V` \| `PromiseLike`\<`V`\>

Called with the error when `Err`.

#### Returns

`Promise`\<`U` \| `V`\>

The return value of whichever branch ran.

***

### ok

> **ok**: \<`T`\>(`value`) => [`Ok`](../type-aliases/Ok.md)\<`T`\>

Defined in: [src/index.ts:418](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L418)

#### Type Parameters

##### T

`T`

#### Parameters

##### value

`T`

#### Returns

[`Ok`](../type-aliases/Ok.md)\<`T`\>

***

### okAsync

> **okAsync**: \<`T`\>(`value`) => [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `never`\>

Defined in: [src/index.ts:420](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L420)

#### Type Parameters

##### T

`T`

#### Parameters

##### value

`T`

#### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `never`\>

***

### unwrap

> **unwrap**: \<`T`, `E`\>(`result`) => `T`

Defined in: [src/index.ts:496](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L496)

Returns the value if `Ok`.

#### Type Parameters

##### T

`T`

##### E

`E`

#### Parameters

##### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

The result to unwrap.

#### Returns

`T`

The success value.

#### Throws

The original error if it is an `Error` instance.

#### Throws

If the error is not an `Error` instance.

***

### unwrapAsync

> **unwrapAsync**: \<`T`, `E`\>(`resultPromise`) => `Promise`\<`T`\>

Defined in: [src/index.ts:499](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L499)

Async variant of [unwrap](../functions/unwrap.md).

#### Type Parameters

##### T

`T`

##### E

`E`

#### Parameters

##### resultPromise

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

The async result to unwrap.

#### Returns

`Promise`\<`T`\>

#### Throws

The original error if it is an `Error` instance.

#### Throws

If the error is not an `Error` instance.

***

### unwrapOr

> **unwrapOr**: \<`T`, `E`, `D`\>(`result`, `defaultValue`) => `T` \| `D`

Defined in: [src/index.ts:497](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L497)

Returns the value if `Ok`, otherwise returns `defaultValue`.

#### Type Parameters

##### T

`T`

##### E

`E`

##### D

`D`

#### Parameters

##### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

The result to unwrap.

##### defaultValue

`D`

Fallback value returned when `Err`.

#### Returns

`T` \| `D`

***

### unwrapOrAsync

> **unwrapOrAsync**: \<`T`, `E`, `D`\>(`resultPromise`, `defaultValue`) => `Promise`\<`T` \| `D`\>

Defined in: [src/index.ts:500](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L500)

Async variant of [unwrapOr](../functions/unwrapOr.md).

#### Type Parameters

##### T

`T`

##### E

`E`

##### D

`D`

#### Parameters

##### resultPromise

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

The async result to unwrap.

##### defaultValue

`D`

Fallback value returned when `Err`.

#### Returns

`Promise`\<`T` \| `D`\>

***

### unwrapOrElse

> **unwrapOrElse**: \<`T`, `E`, `U`\>(`result`, `onErr`) => `T` \| `U`

Defined in: [src/index.ts:498](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L498)

Returns the value if `Ok`, otherwise calls `onErr` with the error and returns its result.

#### Type Parameters

##### T

`T`

##### E

`E`

##### U

`U`

#### Parameters

##### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

The result to unwrap.

##### onErr

(`error`) => `U`

Called with the error when `Err`.

#### Returns

`T` \| `U`

***

### unwrapOrElseAsync

> **unwrapOrElseAsync**: \<`T`, `E`, `U`\>(`resultPromise`, `onErr`) => `Promise`\<`T` \| `U`\>

Defined in: [src/index.ts:501](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L501)

Async variant of [unwrapOrElse](../functions/unwrapOrElse.md).

#### Type Parameters

##### T

`T`

##### E

`E`

##### U

`U`

#### Parameters

##### resultPromise

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

The async result to unwrap.

##### onErr

(`error`) => `U` \| `PromiseLike`\<`U`\>

Called with the error when `Err`.

#### Returns

`Promise`\<`T` \| `U`\>

## Methods

### err()

> **err**(`error`): [`Err`](../type-aliases/Err.md)\<`E`\>

Defined in: [src/index.ts:419](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L419)

#### Parameters

##### error

`E`

#### Returns

[`Err`](../type-aliases/Err.md)\<`E`\>

***

### errAsync()

> **errAsync**(`error`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`never`, `E`\>

Defined in: [src/index.ts:421](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L421)

#### Parameters

##### error

`E`

#### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`never`, `E`\>

***

### flatMap()

> **flatMap**\<`T`, `U`\>(`result`, `fn`): [`Result`](../type-aliases/Result.md)\<`U`, `E`\>

Defined in: [src/index.ts:484](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L484)

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

Defined in: [src/index.ts:488](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L488)

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

> **from**\<`T`, `F`, `G`\>(`fn`, `options`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`, `G`\>\>

Defined in: [src/index.ts:431](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L431)

Unified capture entry point. Accepts a sync/async factory or a `PromiseLike`.

##### Type Parameters

###### T

`T`

###### F

`F` = `E`

###### G

`G` = `FE`

##### Parameters

###### fn

() => `T`

Sync or async factory, or a `PromiseLike`.

###### options

[`CaptureOptions`](CaptureOptions.md)\<`T`, `F`, `G`\> & `object`

Optional catch and finally configuration.

##### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`, `G`\>\>

#### Call Signature

> **from**\<`T`, `F`, `G`\>(`fn`, `options?`): [`Result`](../type-aliases/Result.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`, `G`\>\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`, `G`\>\>

Defined in: [src/index.ts:437](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L437)

##### Type Parameters

###### T

`T`

###### F

`F` = `E`

###### G

`G` = `FE`

##### Parameters

###### fn

() => `T`

###### options?

[`CaptureOptions`](CaptureOptions.md)\<`T`, `F`, `G`\>

##### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`, `G`\>\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`, `G`\>\>

#### Call Signature

> **from**\<`T`, `F`, `G`\>(`fn`, `options?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`, `G`\>\>

Defined in: [src/index.ts:443](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L443)

##### Type Parameters

###### T

`T`

###### F

`F` = `E`

###### G

`G` = `FE`

##### Parameters

###### fn

() => `PromiseLike`\<`T`\>

###### options?

[`CaptureOptions`](CaptureOptions.md)\<`T`, `F`, `G`\>

##### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`, `G`\>\>

#### Call Signature

> **from**\<`T`, `F`, `G`\>(`promise`, `options?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`, `G`\>\>

Defined in: [src/index.ts:447](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L447)

##### Type Parameters

###### T

`T`

###### F

`F` = `E`

###### G

`G` = `FE`

##### Parameters

###### promise

`PromiseLike`\<`T`\>

###### options?

[`CaptureOptions`](CaptureOptions.md)\<`T`, `F`, `G`\>

##### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`, `G`\>\>

***

### fromAsyncThrowable()

> **fromAsyncThrowable**\<`T`, `F`, `G`\>(`fn`, `options?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`, `G`\>\>

Defined in: [src/index.ts:469](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L469)

#### Type Parameters

##### T

`T`

##### F

`F` = `E`

##### G

`G` = `FE`

#### Parameters

##### fn

() => `PromiseLike`\<`T`\>

##### options?

[`CaptureOptions`](CaptureOptions.md)\<`T`, `F`, `G`\>

#### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`, `G`\>\>

***

### fromPromise()

> **fromPromise**\<`T`, `F`, `G`\>(`promise`, `options?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`, `G`\>\>

Defined in: [src/index.ts:465](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L465)

#### Type Parameters

##### T

`T`

##### F

`F` = `E`

##### G

`G` = `FE`

#### Parameters

##### promise

`PromiseLike`\<`T`\>

##### options?

[`CaptureOptions`](CaptureOptions.md)\<`T`, `F`, `G`\>

#### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`, `G`\>\>

***

### fromThrowable()

#### Call Signature

> **fromThrowable**\<`T`, `F`, `G`\>(`fn`, `options`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`, `G`\>\>

Defined in: [src/index.ts:452](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L452)

##### Type Parameters

###### T

`T`

###### F

`F` = `E`

###### G

`G` = `FE`

##### Parameters

###### fn

() => `T`

###### options

[`CaptureOptions`](CaptureOptions.md)\<`T`, `F`, `G`\> & `object`

##### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`, `G`\>\>

#### Call Signature

> **fromThrowable**\<`T`, `F`, `G`\>(`fn`, `options?`): [`Result`](../type-aliases/Result.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`, `G`\>\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`, `G`\>\>

Defined in: [src/index.ts:458](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L458)

##### Type Parameters

###### T

`T`

###### F

`F` = `E`

###### G

`G` = `FE`

##### Parameters

###### fn

() => `T`

###### options?

[`CaptureOptions`](CaptureOptions.md)\<`T`, `F`, `G`\>

##### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`, `G`\>\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`, `G`\>\>

***

### map()

> **map**\<`T`, `U`\>(`result`, `fn`): [`Result`](../type-aliases/Result.md)\<`U`, `E`\>

Defined in: [src/index.ts:474](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L474)

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

Defined in: [src/index.ts:475](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L475)

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

Defined in: [src/index.ts:479](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L479)

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

Defined in: [src/index.ts:480](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L480)

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
