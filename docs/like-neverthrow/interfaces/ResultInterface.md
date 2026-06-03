[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / ResultInterface

# Interface: ResultInterface\<E\>

Defined in: [src/like-neverthrow.ts:556](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L556)

Interface returned by createResult.

## Type Parameters

### E

`E` = `unknown`

## Properties

### Combination

#### combine

> **combine**: \<`T`\>(`results`) => [`Result`](../type-aliases/Result.md)\<\{ \[K in string \| number \| symbol\]: ResultOk\<T\[K\]\> \}, [`ResultErr`](../type-aliases/ResultErr.md)\<`T`\[`number`\]\>\>

Defined in: [src/like-neverthrow.ts:589](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L589)

Combine multiple Results into one Result with an array of values.

##### Type Parameters

###### T

`T` *extends* [`Result`](../type-aliases/Result.md)\<`any`, `any`\>[]

##### Parameters

###### results

`T`

##### Returns

[`Result`](../type-aliases/Result.md)\<\{ \[K in string \| number \| symbol\]: ResultOk\<T\[K\]\> \}, [`ResultErr`](../type-aliases/ResultErr.md)\<`T`\[`number`\]\>\>

***

#### combineAsync

> **combineAsync**: \<`T`\>(`results`) => `Promise`\<[`Result`](../type-aliases/Result.md)\<\{ \[K in string \| number \| symbol\]: ResultOk\<Awaited\<T\[K\]\>\> \}, [`ResultErr`](../type-aliases/ResultErr.md)\<`Awaited`\<`T`\[`number`\]\>\>\>\>

Defined in: [src/like-neverthrow.ts:590](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L590)

Combine multiple Results or ResultAsyncs into one.

##### Type Parameters

###### T

`T` *extends* ([`Result`](../type-aliases/Result.md)\<`any`, `any`\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`any`, `any`\>)[]

##### Parameters

###### results

`T`

##### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<\{ \[K in string \| number \| symbol\]: ResultOk\<Awaited\<T\[K\]\>\> \}, [`ResultErr`](../type-aliases/ResultErr.md)\<`Awaited`\<`T`\[`number`\]\>\>\>\>

### Constructors

#### err

> **err**: \<`E`\>(`error`) => [`Result`](../type-aliases/Result.md)\<`never`, `E`\>

Defined in: [src/like-neverthrow.ts:558](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L558)

Create a failed Result.

##### Type Parameters

###### E

`E`

##### Parameters

###### error

`E`

Error value.

##### Returns

[`Result`](../type-aliases/Result.md)\<`never`, `E`\>

##### Example

```ts
const res = err('fail')
```

***

#### errAsync

> **errAsync**: \<`E`\>(`error`) => [`ResultAsync`](../type-aliases/ResultAsync.md)\<`never`, `E`\>

Defined in: [src/like-neverthrow.ts:560](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L560)

Create a failed ResultAsync.

##### Type Parameters

###### E

`E`

##### Parameters

###### error

`E`

Error value.

##### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`never`, `E`\>

***

#### ok

> **ok**: \<`T`\>(`value`) => [`Result`](../type-aliases/Result.md)\<`T`, `never`\>

Defined in: [src/like-neverthrow.ts:557](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L557)

Create a successful Result.

##### Type Parameters

###### T

`T`

##### Parameters

###### value

`T`

Success value.

##### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `never`\>

##### Example

```ts
const res = ok(42)
```

***

#### okAsync

> **okAsync**: \<`T`\>(`value`) => [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `never`\>

Defined in: [src/like-neverthrow.ts:559](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L559)

Create a successful ResultAsync.

##### Type Parameters

###### T

`T`

##### Parameters

###### value

`T`

Success value.

##### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `never`\>

### Guards

#### isErr

> **isErr**: \<`T`, `E`\>(`res`) => `res is Err<E>`

Defined in: [src/like-neverthrow.ts:562](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L562)

Check if a Result is Err.

##### Type Parameters

###### T

`T`

###### E

`E`

##### Parameters

###### res

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

##### Returns

`res is Err<E>`

***

#### isOk

> **isOk**: \<`T`, `E`\>(`res`) => `res is Ok<T>`

Defined in: [src/like-neverthrow.ts:561](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L561)

Check if a Result is Ok.

##### Type Parameters

###### T

`T`

###### E

`E`

##### Parameters

###### res

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

##### Returns

`res is Ok<T>`

### Lifecycle

#### onFinally

> **onFinally**: \<`T`, `E`\>(`res`, `callback`, `mapFinallyError?`) => [`Result`](../type-aliases/Result.md)\<`T`, `unknown`\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `unknown`\>

Defined in: [src/like-neverthrow.ts:599](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L599)

Execute a callback regardless of success or failure.

##### Type Parameters

###### T

`T`

###### E

`E`

##### Parameters

###### res

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

###### callback

(`result`) => `void` \| `Promise`\<`void`\>

###### mapFinallyError?

(`error`) => `unknown`

##### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `unknown`\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `unknown`\>

***

#### onFinallyAsync

> **onFinallyAsync**: \<`T`, `E`\>(`res`, `callback`, `mapFinallyError?`) => [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `unknown`\>

Defined in: [src/like-neverthrow.ts:600](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L600)

Await ResultAsync and execute callback.

##### Type Parameters

###### T

`T`

###### E

`E`

##### Parameters

###### res

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

###### callback

(`result`) => `void` \| `Promise`\<`void`\>

###### mapFinallyError?

(`error`) => `unknown`

##### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `unknown`\>

### Mapping

#### map

> **map**: \<`T`, `E`, `U`\>(`res`, `fn`) => [`Result`](../type-aliases/Result.md)\<`U`, `E`\>

Defined in: [src/like-neverthrow.ts:579](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L579)

Map the success value.

##### Type Parameters

###### T

`T`

###### E

`E`

###### U

`U`

##### Parameters

###### res

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

###### fn

(`v`) => `U`

##### Returns

[`Result`](../type-aliases/Result.md)\<`U`, `E`\>

***

#### mapAsync

> **mapAsync**: \<`T`, `E`, `U`\>(`res`, `fn`) => [`ResultAsync`](../type-aliases/ResultAsync.md)\<`U`, `E`\>

Defined in: [src/like-neverthrow.ts:580](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L580)

Map the success value asynchronously.

##### Type Parameters

###### T

`T`

###### E

`E`

###### U

`U`

##### Parameters

###### res

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

###### fn

(`v`) => `U` \| `Promise`\<`U`\>

##### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`U`, `E`\>

***

#### mapErr

> **mapErr**: \<`T`, `E`, `F`\>(`res`, `fn`) => [`Result`](../type-aliases/Result.md)\<`T`, `F`\>

Defined in: [src/like-neverthrow.ts:581](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L581)

Map the error value.

##### Type Parameters

###### T

`T`

###### E

`E`

###### F

`F`

##### Parameters

###### res

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

###### fn

(`e`) => `F`

##### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `F`\>

***

#### mapErrAsync

> **mapErrAsync**: \<`T`, `E`, `F`\>(`res`, `fn`) => [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F`\>

Defined in: [src/like-neverthrow.ts:582](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L582)

Map the error value asynchronously.

##### Type Parameters

###### T

`T`

###### E

`E`

###### F

`F`

##### Parameters

###### res

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

###### fn

(`e`) => `F` \| `Promise`\<`F`\>

##### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F`\>

***

#### orElse

> **orElse**: \<`T`, `E`, `U`, `F`\>(`res`, `fn`) => [`Result`](../type-aliases/Result.md)\<`T` \| `U`, `F`\>

Defined in: [src/like-neverthrow.ts:587](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L587)

Handle error by returning a new Result.

##### Type Parameters

###### T

`T`

###### E

`E`

###### U

`U` = `T`

###### F

`F` = `E`

##### Parameters

###### res

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

###### fn

(`e`) => [`Result`](../type-aliases/Result.md)\<`U`, `F`\>

##### Returns

[`Result`](../type-aliases/Result.md)\<`T` \| `U`, `F`\>

***

#### orElseAsync

> **orElseAsync**: \<`T`, `E`, `U`, `F`\>(`res`, `fn`) => [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T` \| `U`, `F`\>

Defined in: [src/like-neverthrow.ts:588](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L588)

Handle error by returning a new Result asynchronously.

##### Type Parameters

###### T

`T`

###### E

`E`

###### U

`U` = `T`

###### F

`F` = `E`

##### Parameters

###### res

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

###### fn

(`e`) => [`Result`](../type-aliases/Result.md)\<`U`, `F`\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`U`, `F`\>

##### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T` \| `U`, `F`\>

### Pattern Matching

#### match

> **match**: \<`T`, `E`, `U`, `V`\>(`res`, `onOk`, `onErr`) => `U` \| `V`

Defined in: [src/like-neverthrow.ts:591](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L591)

Branch logic based on Result type.

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

###### res

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

###### onOk

(`v`) => `U`

###### onErr

(`e`) => `V`

##### Returns

`U` \| `V`

***

#### matchAsync

> **matchAsync**: \<`T`, `E`, `U`, `V`\>(`res`, `onOk`, `onErr`) => `Promise`\<`U` \| `V`\>

Defined in: [src/like-neverthrow.ts:592](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L592)

Branch logic based on ResultAsync resolution.

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

###### res

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

###### onOk

(`v`) => `U` \| `Promise`\<`U`\>

###### onErr

(`e`) => `V` \| `Promise`\<`V`\>

##### Returns

`Promise`\<`U` \| `V`\>

### Transformation

#### andThen

> **andThen**: \<`T`, `E`, `U`, `F`\>(`res`, `fn`) => [`Result`](../type-aliases/Result.md)\<`U`, `E` \| `F`\>

Defined in: [src/like-neverthrow.ts:585](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L585)

Map and flatten the success value.

##### Type Parameters

###### T

`T`

###### E

`E`

###### U

`U`

###### F

`F` = `E`

##### Parameters

###### res

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

###### fn

(`v`) => [`Result`](../type-aliases/Result.md)\<`U`, `F`\>

##### Returns

[`Result`](../type-aliases/Result.md)\<`U`, `E` \| `F`\>

***

#### andThenAsync

> **andThenAsync**: \<`T`, `E`, `U`, `F`\>(`res`, `fn`) => [`ResultAsync`](../type-aliases/ResultAsync.md)\<`U`, `E` \| `F`\>

Defined in: [src/like-neverthrow.ts:586](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L586)

Map and flatten the success value asynchronously.

##### Type Parameters

###### T

`T`

###### E

`E`

###### U

`U`

###### F

`F` = `E`

##### Parameters

###### res

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

###### fn

(`v`) => [`Result`](../type-aliases/Result.md)\<`U`, `F`\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`U`, `F`\>

##### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`U`, `E` \| `F`\>

***

#### flatMap

> **flatMap**: \<`T`, `E`, `U`, `F`\>(`res`, `fn`) => [`Result`](../type-aliases/Result.md)\<`U`, `E` \| `F`\>

Defined in: [src/like-neverthrow.ts:583](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L583)

Map and flatten the success value.

##### Type Parameters

###### T

`T`

###### E

`E`

###### U

`U`

###### F

`F` = `E`

##### Parameters

###### res

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

###### fn

(`v`) => [`Result`](../type-aliases/Result.md)\<`U`, `F`\>

##### Returns

[`Result`](../type-aliases/Result.md)\<`U`, `E` \| `F`\>

***

#### flatMapAsync

> **flatMapAsync**: \<`T`, `E`, `U`, `F`\>(`res`, `fn`) => [`ResultAsync`](../type-aliases/ResultAsync.md)\<`U`, `E` \| `F`\>

Defined in: [src/like-neverthrow.ts:584](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L584)

Map and flatten the success value asynchronously.

##### Type Parameters

###### T

`T`

###### E

`E`

###### U

`U`

###### F

`F` = `E`

##### Parameters

###### res

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

###### fn

(`v`) => [`Result`](../type-aliases/Result.md)\<`U`, `F`\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`U`, `F`\>

##### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`U`, `E` \| `F`\>

### Unwrap

#### unwrap

> **unwrap**: \<`T`, `E`\>(`res`) => `T`

Defined in: [src/like-neverthrow.ts:593](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L593)

Return Ok value or throw.

##### Type Parameters

###### T

`T`

###### E

`E`

##### Parameters

###### res

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

##### Returns

`T`

***

#### unwrapAsync

> **unwrapAsync**: \<`T`, `E`\>(`res`) => `Promise`\<`T`\>

Defined in: [src/like-neverthrow.ts:596](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L596)

Await and unwrap value or throw.

##### Type Parameters

###### T

`T`

###### E

`E`

##### Parameters

###### res

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

##### Returns

`Promise`\<`T`\>

***

#### unwrapOr

> **unwrapOr**: \<`T`, `E`, `D`\>(`res`, `defaultValue`) => `T` \| `D`

Defined in: [src/like-neverthrow.ts:594](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L594)

Return value or default.

##### Type Parameters

###### T

`T`

###### E

`E`

###### D

`D`

##### Parameters

###### res

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

###### defaultValue

`D`

##### Returns

`T` \| `D`

***

#### unwrapOrAsync

> **unwrapOrAsync**: \<`T`, `E`, `D`\>(`res`, `defaultValue`) => `Promise`\<`T` \| `D`\>

Defined in: [src/like-neverthrow.ts:597](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L597)

Await and return value or default.

##### Type Parameters

###### T

`T`

###### E

`E`

###### D

`D`

##### Parameters

###### res

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

###### defaultValue

`D`

##### Returns

`Promise`\<`T` \| `D`\>

***

#### unwrapOrElse

> **unwrapOrElse**: \<`T`, `E`, `D`\>(`res`, `fn`) => `T` \| `D`

Defined in: [src/like-neverthrow.ts:595](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L595)

Return value or call fallback.

##### Type Parameters

###### T

`T`

###### E

`E`

###### D

`D`

##### Parameters

###### res

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

###### fn

(`e`) => `D`

##### Returns

`T` \| `D`

***

#### unwrapOrElseAsync

> **unwrapOrElseAsync**: \<`T`, `E`, `D`\>(`res`, `fn`) => `Promise`\<`T` \| `D`\>

Defined in: [src/like-neverthrow.ts:598](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L598)

Await and return value or call fallback.

##### Type Parameters

###### T

`T`

###### E

`E`

###### D

`D`

##### Parameters

###### res

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `E`\>

###### fn

(`e`) => `D` \| `Promise`\<`D`\>

##### Returns

`Promise`\<`T` \| `D`\>

## Methods

### from()

> **from**\<`T`, `F`\>(`input`, `opts?`): [`Result`](../type-aliases/Result.md)\<`T`, `F` \| [`FinallyError`](../../index/classes/FinallyError.md)\<`T`, `F`\>\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../../index/classes/FinallyError.md)\<`T`, `F`\>\>

Defined in: [src/like-neverthrow.ts:563](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L563)

#### Type Parameters

##### T

`T`

##### F

`F` = `E`

#### Parameters

##### input

`PromiseLike`\<`T`\> \| (() => `T` \| `PromiseLike`\<`T`\>)

##### opts?

[`CaptureOptions`](CaptureOptions.md)\<`T`, `F`\>

#### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `F` \| [`FinallyError`](../../index/classes/FinallyError.md)\<`T`, `F`\>\> \| [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../../index/classes/FinallyError.md)\<`T`, `F`\>\>

***

### fromAsyncThrowable()

> **fromAsyncThrowable**\<`T`, `F`\>(`fn`, `opts?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../../index/classes/FinallyError.md)\<`T`, `F`\>\>

Defined in: [src/like-neverthrow.ts:575](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L575)

#### Type Parameters

##### T

`T`

##### F

`F` = `E`

#### Parameters

##### fn

() => `PromiseLike`\<`T`\>

##### opts?

[`CaptureOptions`](CaptureOptions.md)\<`T`, `F`\>

#### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../../index/classes/FinallyError.md)\<`T`, `F`\>\>

***

### fromPromise()

> **fromPromise**\<`T`, `F`\>(`promise`, `opts?`): [`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../../index/classes/FinallyError.md)\<`T`, `F`\>\>

Defined in: [src/like-neverthrow.ts:571](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L571)

#### Type Parameters

##### T

`T`

##### F

`F` = `E`

#### Parameters

##### promise

`PromiseLike`\<`T`\>

##### opts?

[`CaptureOptions`](CaptureOptions.md)\<`T`, `F`\>

#### Returns

[`ResultAsync`](../type-aliases/ResultAsync.md)\<`T`, `F` \| [`FinallyError`](../../index/classes/FinallyError.md)\<`T`, `F`\>\>

***

### fromThrowable()

> **fromThrowable**\<`T`, `F`\>(`fn`, `opts?`): [`Result`](../type-aliases/Result.md)\<`T`, `F` \| [`FinallyError`](../../index/classes/FinallyError.md)\<`T`, `F`\>\>

Defined in: [src/like-neverthrow.ts:567](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L567)

#### Type Parameters

##### T

`T`

##### F

`F` = `E`

#### Parameters

##### fn

() => `T`

##### opts?

[`CaptureOptions`](CaptureOptions.md)\<`T`, `F`\>

#### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `F` \| [`FinallyError`](../../index/classes/FinallyError.md)\<`T`, `F`\>\>
