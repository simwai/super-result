[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / Ok

# Class: Ok\<T\>

Defined in: [src/like-neverthrow.ts:48](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L48)

Successful Result variant.

## Type Parameters

### T

`T`

## Implements

- [`ResultBase`](../interfaces/ResultBase.md)\<`T`, `never`\>

## Constructors

### Constructor

> **new Ok**\<`T`\>(`value`): `Ok`\<`T`\>

Defined in: [src/like-neverthrow.ts:50](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L50)

#### Parameters

##### value

`T`

#### Returns

`Ok`\<`T`\>

## Properties

### type

> `readonly` **type**: `"ok"`

Defined in: [src/like-neverthrow.ts:49](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L49)

#### Implementation of

[`ResultBase`](../interfaces/ResultBase.md).[`type`](../interfaces/ResultBase.md#type)

***

### value

> `readonly` **value**: `T`

Defined in: [src/like-neverthrow.ts:50](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L50)

## Methods

### andThen()

> **andThen**\<`U`, `F`\>(`fn`): [`Result`](../type-aliases/Result.md)\<`U`, `F`\>

Defined in: [src/like-neverthrow.ts:68](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L68)

Alias for flatMap.

#### Type Parameters

##### U

`U`

##### F

`F`

#### Parameters

##### fn

(`value`) => [`Result`](../type-aliases/Result.md)\<`U`, `F`\>

#### Returns

[`Result`](../type-aliases/Result.md)\<`U`, `F`\>

#### Implementation of

[`ResultBase`](../interfaces/ResultBase.md).[`andThen`](../interfaces/ResultBase.md#andthen)

***

### flatMap()

> **flatMap**\<`U`, `F`\>(`fn`): [`Result`](../type-aliases/Result.md)\<`U`, `F`\>

Defined in: [src/like-neverthrow.ts:65](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L65)

Map and flatten the success value.

#### Type Parameters

##### U

`U`

##### F

`F`

#### Parameters

##### fn

(`value`) => [`Result`](../type-aliases/Result.md)\<`U`, `F`\>

#### Returns

[`Result`](../type-aliases/Result.md)\<`U`, `F`\>

#### Implementation of

[`ResultBase`](../interfaces/ResultBase.md).[`flatMap`](../interfaces/ResultBase.md#flatmap)

***

### isErr()

> **isErr**(): `this is Err<never>`

Defined in: [src/like-neverthrow.ts:55](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L55)

Check if the result is a failure.

#### Returns

`this is Err<never>`

#### Implementation of

[`ResultBase`](../interfaces/ResultBase.md).[`isErr`](../interfaces/ResultBase.md#iserr)

***

### isOk()

> **isOk**(): `this is Ok<T>`

Defined in: [src/like-neverthrow.ts:52](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L52)

Check if the result is successful.

#### Returns

`this is Ok<T>`

#### Implementation of

[`ResultBase`](../interfaces/ResultBase.md).[`isOk`](../interfaces/ResultBase.md#isok)

***

### map()

> **map**\<`U`\>(`fn`): [`Result`](../type-aliases/Result.md)\<`U`, `never`\>

Defined in: [src/like-neverthrow.ts:59](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L59)

Map the success value.

#### Type Parameters

##### U

`U`

#### Parameters

##### fn

(`value`) => `U`

#### Returns

[`Result`](../type-aliases/Result.md)\<`U`, `never`\>

#### Implementation of

[`ResultBase`](../interfaces/ResultBase.md).[`map`](../interfaces/ResultBase.md#map)

***

### mapErr()

> **mapErr**\<`F`\>(): [`Result`](../type-aliases/Result.md)\<`T`, `F`\>

Defined in: [src/like-neverthrow.ts:62](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L62)

Map the error value.

#### Type Parameters

##### F

`F`

#### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `F`\>

#### Implementation of

[`ResultBase`](../interfaces/ResultBase.md).[`mapErr`](../interfaces/ResultBase.md#maperr)

***

### match()

> **match**\<`U`, `V`\>(`onOk`): `U` \| `V`

Defined in: [src/like-neverthrow.ts:74](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L74)

Branch logic based on result type.

#### Type Parameters

##### U

`U`

##### V

`V`

#### Parameters

##### onOk

(`value`) => `U`

#### Returns

`U` \| `V`

#### Implementation of

[`ResultBase`](../interfaces/ResultBase.md).[`match`](../interfaces/ResultBase.md#match)

***

### orElse()

> **orElse**\<`U`, `F`\>(): [`Result`](../type-aliases/Result.md)\<`T` \| `U`, `F`\>

Defined in: [src/like-neverthrow.ts:71](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L71)

Handle the error value by returning a new Result.

#### Type Parameters

##### U

`U`

##### F

`F`

#### Returns

[`Result`](../type-aliases/Result.md)\<`T` \| `U`, `F`\>

#### Implementation of

[`ResultBase`](../interfaces/ResultBase.md).[`orElse`](../interfaces/ResultBase.md#orelse)

***

### unwrapOr()

> **unwrapOr**\<`D`\>(): `T` \| `D`

Defined in: [src/like-neverthrow.ts:77](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L77)

Unwrap value or return default.

#### Type Parameters

##### D

`D`

#### Returns

`T` \| `D`

#### Implementation of

[`ResultBase`](../interfaces/ResultBase.md).[`unwrapOr`](../interfaces/ResultBase.md#unwrapor)

***

### unwrapOrElse()

> **unwrapOrElse**\<`D`\>(): `T` \| `D`

Defined in: [src/like-neverthrow.ts:80](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L80)

Unwrap value or call fallback.

#### Type Parameters

##### D

`D`

#### Returns

`T` \| `D`

#### Implementation of

[`ResultBase`](../interfaces/ResultBase.md).[`unwrapOrElse`](../interfaces/ResultBase.md#unwraporelse)
