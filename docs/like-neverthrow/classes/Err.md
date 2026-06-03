[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / Err

# Class: Err\<E\>

Defined in: [src/like-neverthrow.ts:89](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L89)

Failed Result variant.

## Type Parameters

### E

`E`

## Implements

- [`ResultBase`](../interfaces/ResultBase.md)\<`never`, `E`\>

## Constructors

### Constructor

> **new Err**\<`E`\>(`error`): `Err`\<`E`\>

Defined in: [src/like-neverthrow.ts:91](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L91)

#### Parameters

##### error

`E`

#### Returns

`Err`\<`E`\>

## Properties

### error

> `readonly` **error**: `E`

Defined in: [src/like-neverthrow.ts:91](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L91)

***

### type

> `readonly` **type**: `"err"`

Defined in: [src/like-neverthrow.ts:90](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L90)

#### Implementation of

[`ResultBase`](../interfaces/ResultBase.md).[`type`](../interfaces/ResultBase.md#type)

## Methods

### andThen()

> **andThen**\<`U`, `F`\>(): [`Result`](../type-aliases/Result.md)\<`U`, `E` \| `F`\>

Defined in: [src/like-neverthrow.ts:109](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L109)

Alias for flatMap.

#### Type Parameters

##### U

`U`

##### F

`F`

#### Returns

[`Result`](../type-aliases/Result.md)\<`U`, `E` \| `F`\>

#### Implementation of

[`ResultBase`](../interfaces/ResultBase.md).[`andThen`](../interfaces/ResultBase.md#andthen)

***

### flatMap()

> **flatMap**\<`U`, `F`\>(): [`Result`](../type-aliases/Result.md)\<`U`, `E` \| `F`\>

Defined in: [src/like-neverthrow.ts:106](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L106)

Map and flatten the success value.

#### Type Parameters

##### U

`U`

##### F

`F`

#### Returns

[`Result`](../type-aliases/Result.md)\<`U`, `E` \| `F`\>

#### Implementation of

[`ResultBase`](../interfaces/ResultBase.md).[`flatMap`](../interfaces/ResultBase.md#flatmap)

***

### isErr()

> **isErr**(): `this is Err<E>`

Defined in: [src/like-neverthrow.ts:96](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L96)

Check if the result is a failure.

#### Returns

`this is Err<E>`

#### Implementation of

[`ResultBase`](../interfaces/ResultBase.md).[`isErr`](../interfaces/ResultBase.md#iserr)

***

### isOk()

> **isOk**(): `this is Ok<never>`

Defined in: [src/like-neverthrow.ts:93](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L93)

Check if the result is successful.

#### Returns

`this is Ok<never>`

#### Implementation of

[`ResultBase`](../interfaces/ResultBase.md).[`isOk`](../interfaces/ResultBase.md#isok)

***

### map()

> **map**\<`U`\>(): [`Result`](../type-aliases/Result.md)\<`U`, `E`\>

Defined in: [src/like-neverthrow.ts:100](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L100)

Map the success value.

#### Type Parameters

##### U

`U`

#### Returns

[`Result`](../type-aliases/Result.md)\<`U`, `E`\>

#### Implementation of

[`ResultBase`](../interfaces/ResultBase.md).[`map`](../interfaces/ResultBase.md#map)

***

### mapErr()

> **mapErr**\<`F`\>(`fn`): [`Result`](../type-aliases/Result.md)\<`never`, `F`\>

Defined in: [src/like-neverthrow.ts:103](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L103)

Map the error value.

#### Type Parameters

##### F

`F`

#### Parameters

##### fn

(`error`) => `F`

#### Returns

[`Result`](../type-aliases/Result.md)\<`never`, `F`\>

#### Implementation of

[`ResultBase`](../interfaces/ResultBase.md).[`mapErr`](../interfaces/ResultBase.md#maperr)

***

### match()

> **match**\<`U`, `V`\>(`_`, `onErr`): `U` \| `V`

Defined in: [src/like-neverthrow.ts:115](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L115)

Branch logic based on result type.

#### Type Parameters

##### U

`U`

##### V

`V`

#### Parameters

##### \_

`any`

##### onErr

(`error`) => `V`

#### Returns

`U` \| `V`

#### Implementation of

[`ResultBase`](../interfaces/ResultBase.md).[`match`](../interfaces/ResultBase.md#match)

***

### orElse()

> **orElse**\<`T`, `F`\>(`fn`): [`Result`](../type-aliases/Result.md)\<`T`, `F`\>

Defined in: [src/like-neverthrow.ts:112](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L112)

Handle the error value by returning a new Result.

#### Type Parameters

##### T

`T`

##### F

`F`

#### Parameters

##### fn

(`error`) => [`Result`](../type-aliases/Result.md)\<`T`, `F`\>

#### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `F`\>

#### Implementation of

[`ResultBase`](../interfaces/ResultBase.md).[`orElse`](../interfaces/ResultBase.md#orelse)

***

### unwrapOr()

> **unwrapOr**\<`D`\>(`defaultValue`): `D`

Defined in: [src/like-neverthrow.ts:118](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L118)

Unwrap value or return default.

#### Type Parameters

##### D

`D`

#### Parameters

##### defaultValue

`D`

#### Returns

`D`

#### Implementation of

[`ResultBase`](../interfaces/ResultBase.md).[`unwrapOr`](../interfaces/ResultBase.md#unwrapor)

***

### unwrapOrElse()

> **unwrapOrElse**\<`D`\>(`fn`): `D`

Defined in: [src/like-neverthrow.ts:121](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L121)

Unwrap value or call fallback.

#### Type Parameters

##### D

`D`

#### Parameters

##### fn

(`error`) => `D`

#### Returns

`D`

#### Implementation of

[`ResultBase`](../interfaces/ResultBase.md).[`unwrapOrElse`](../interfaces/ResultBase.md#unwraporelse)
