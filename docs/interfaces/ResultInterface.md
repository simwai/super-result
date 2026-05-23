[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / ResultInterface

# Interface: ResultInterface\<E, FE\>

Defined in: [src/index.ts:515](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L515)

Interface returned by [createResult](../functions/createResult.md).

## Type Parameters

### E

`E` = `unknown`

The bound error type.

### FE

`FE` = `unknown`

The bound finally-error type.

## Capture

### onFinally

> **onFinally**: \{\<`T`, `E`, `FE`\>(`result`, `callback`, `mapFinallyError?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`, `FE`\>\>; \<`T`, `E`, `FE`\>(`result`, `callback`, `mapFinallyError?`): [`Result`](../type-aliases/Result.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`, `FE`\>\>; \}

Defined in: [src/index.ts:600](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L600)

#### Call Signature

> \<`T`, `E`, `FE`\>(`result`, `callback`, `mapFinallyError?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`, `FE`\>\>

Attach a cleanup callback to a result. The callback runs regardless of `Ok`/`Err`.
If the callback itself throws or rejects, the original result is replaced with
`Err<FinallyError>` carrying both the original result and the cleanup error.

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

Attach a cleanup callback to a result. The callback runs regardless of `Ok`/`Err`.
If the callback itself throws or rejects, the original result is replaced with
`Err<FinallyError>` carrying both the original result and the cleanup error.

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

### onFinallyAsync

> **onFinallyAsync**: \<`T`, `E`, `FE`\>(`resultPromise`, `callback`, `mapFinallyError`) => [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `E`, `FE`\>\>

Defined in: [src/index.ts:601](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L601)

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

## Constructors

### ok

> **ok**: \<`T`\>(`value`) => [`Ok`](Ok.md)\<`T`\>

Defined in: [src/index.ts:516](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L516)

Create a successful [Ok](Ok.md) result.

#### Type Parameters

##### T

`T`

#### Parameters

##### value

`T`

#### Returns

[`Ok`](Ok.md)\<`T`\>

***

### okAsync

> **okAsync**: \<`T`\>(`value`) => [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `never`\>

Defined in: [src/index.ts:518](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L518)

Create a resolved `Promise` of [Ok](Ok.md).

#### Type Parameters

##### T

`T`

#### Parameters

##### value

`T`

#### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `never`\>

## Guards

### isErr

> **isErr**: \<`T`, `E`\>(`result`) => `result is Err<E>`

Defined in: [src/index.ts:522](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L522)

Returns `true` if `result` is [Err](Err.md).

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

Defined in: [src/index.ts:521](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L521)

Returns `true` if `result` is [Ok](Ok.md).

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

## Other

### err()

> **err**(`error`): [`Err`](Err.md)\<`E`\>

Defined in: [src/index.ts:517](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L517)

#### Parameters

##### error

`E`

#### Returns

[`Err`](Err.md)\<`E`\>

***

### errAsync()

> **errAsync**(`error`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`never`, `E`\>

Defined in: [src/index.ts:519](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L519)

#### Parameters

##### error

`E`

#### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`never`, `E`\>

***

### flatMap()

> **flatMap**\<`T`, `U`\>(`result`, `fn`): [`Result`](../type-aliases/Result.md)\<`U`, `E`\>

Defined in: [src/index.ts:581](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L581)

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

Defined in: [src/index.ts:585](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L585)

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

Defined in: [src/index.ts:527](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L527)

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

###### options

[`CaptureOptions`](CaptureOptions.md)\<`T`, `F`, `G`\> & `object`

##### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`, `G`\>\>

#### Call Signature

> **from**\<`T`, `F`, `G`\>(`fn`, `options?`): [`Result`](../type-aliases/Result.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`, `G`\>\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../classes/FinallyError.md)\<`T`, `F`, `G`\>\>

Defined in: [src/index.ts:533](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L533)

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

Defined in: [src/index.ts:539](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L539)

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

Defined in: [src/index.ts:543](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L543)

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

Defined in: [src/index.ts:566](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L566)

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

Defined in: [src/index.ts:561](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L561)

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

Defined in: [src/index.ts:548](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L548)

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

Defined in: [src/index.ts:554](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L554)

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

Defined in: [src/index.ts:571](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L571)

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

Defined in: [src/index.ts:572](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L572)

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

Defined in: [src/index.ts:576](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L576)

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

Defined in: [src/index.ts:577](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L577)

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

## Pattern Matching

### match

> **match**: \<`T`, `E`, `U`, `V`\>(`result`, `onOk`, `onErr`) => `U` \| `V`

Defined in: [src/index.ts:590](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L590)

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

##### onOk

(`value`) => `U`

##### onErr

(`error`) => `V`

#### Returns

`U` \| `V`

***

### matchAsync

> **matchAsync**: \<`T`, `E`, `U`, `V`\>(`resultPromise`, `onOk`, `onErr`) => `Promise`\<`U` \| `V`\>

Defined in: [src/index.ts:591](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L591)

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

##### onOk

(`value`) => `U` \| `PromiseLike`\<`U`\>

##### onErr

(`error`) => `V` \| `PromiseLike`\<`V`\>

#### Returns

`Promise`\<`U` \| `V`\>

## Unwrap

### unwrap

> **unwrap**: \<`T`, `E`\>(`result`) => `T`

Defined in: [src/index.ts:593](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L593)

Return the value if `Ok`, otherwise throw.

#### Type Parameters

##### T

`T`

##### E

`E`

#### Parameters

##### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

#### Returns

`T`

#### Throws

The original error if it is an `Error` instance.

#### Throws

If the error is not an `Error` instance.

***

### unwrapAsync

> **unwrapAsync**: \<`T`, `E`\>(`resultPromise`) => `Promise`\<`T`\>

Defined in: [src/index.ts:596](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L596)

Async variant of [unwrap](../functions/unwrap.md).

#### Type Parameters

##### T

`T`

##### E

`E`

#### Parameters

##### resultPromise

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

#### Returns

`Promise`\<`T`\>

#### Throws

The original error if it is an `Error` instance.

#### Throws

If the error is not an `Error` instance.

***

### unwrapOr

> **unwrapOr**: \<`T`, `E`, `D`\>(`result`, `defaultValue`) => `T` \| `D`

Defined in: [src/index.ts:594](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L594)

Return the value if `Ok`, otherwise return `defaultValue`.

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

##### defaultValue

`D`

#### Returns

`T` \| `D`

***

### unwrapOrAsync

> **unwrapOrAsync**: \<`T`, `E`, `D`\>(`resultPromise`, `defaultValue`) => `Promise`\<`T` \| `D`\>

Defined in: [src/index.ts:597](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L597)

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

##### defaultValue

`D`

#### Returns

`Promise`\<`T` \| `D`\>

***

### unwrapOrElse

> **unwrapOrElse**: \<`T`, `E`, `U`\>(`result`, `onErr`) => `T` \| `U`

Defined in: [src/index.ts:595](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L595)

Return the value if `Ok`, otherwise call `onErr` and return its result.

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

##### onErr

(`error`) => `U`

#### Returns

`T` \| `U`

***

### unwrapOrElseAsync

> **unwrapOrElseAsync**: \<`T`, `E`, `U`\>(`resultPromise`, `onErr`) => `Promise`\<`T` \| `U`\>

Defined in: [src/index.ts:598](https://github.com/simwai/super-result/blob/7c6decd2e66977e74be2a0f16a75bb0178c61947/src/index.ts#L598)

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

##### onErr

(`error`) => `U` \| `PromiseLike`\<`U`\>

#### Returns

`Promise`\<`T` \| `U`\>
