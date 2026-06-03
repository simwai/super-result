[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [like-neverthrow](../README.md) / ResultBase

# Interface: ResultBase\<T, E\>

Defined in: [src/like-neverthrow.ts:10](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L10)

Base interface for Result variants in the neverthrow-compatible API.

## Type Parameters

### T

`T`

### E

`E`

## Properties

### type

> `readonly` **type**: `"ok"` \| `"err"`

Defined in: [src/like-neverthrow.ts:11](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L11)

## Methods

### andThen()

> **andThen**\<`U`, `F`\>(`fn`): [`Result`](../type-aliases/Result.md)\<`U`, `E` \| `F`\>

Defined in: [src/like-neverthrow.ts:29](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L29)

Alias for flatMap.

#### Type Parameters

##### U

`U`

##### F

`F` = `E`

#### Parameters

##### fn

(`value`) => [`Result`](../type-aliases/Result.md)\<`U`, `F`\>

#### Returns

[`Result`](../type-aliases/Result.md)\<`U`, `E` \| `F`\>

***

### flatMap()

> **flatMap**\<`U`, `F`\>(`fn`): [`Result`](../type-aliases/Result.md)\<`U`, `E` \| `F`\>

Defined in: [src/like-neverthrow.ts:26](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L26)

Map and flatten the success value.

#### Type Parameters

##### U

`U`

##### F

`F` = `E`

#### Parameters

##### fn

(`value`) => [`Result`](../type-aliases/Result.md)\<`U`, `F`\>

#### Returns

[`Result`](../type-aliases/Result.md)\<`U`, `E` \| `F`\>

***

### isErr()

> **isErr**(): `this is Err<E>`

Defined in: [src/like-neverthrow.ts:17](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L17)

Check if the result is a failure.

#### Returns

`this is Err<E>`

***

### isOk()

> **isOk**(): `this is Ok<T>`

Defined in: [src/like-neverthrow.ts:14](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L14)

Check if the result is successful.

#### Returns

`this is Ok<T>`

***

### map()

> **map**\<`U`\>(`fn`): [`Result`](../type-aliases/Result.md)\<`U`, `E`\>

Defined in: [src/like-neverthrow.ts:20](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L20)

Map the success value.

#### Type Parameters

##### U

`U`

#### Parameters

##### fn

(`value`) => `U`

#### Returns

[`Result`](../type-aliases/Result.md)\<`U`, `E`\>

***

### mapErr()

> **mapErr**\<`F`\>(`fn`): [`Result`](../type-aliases/Result.md)\<`T`, `F`\>

Defined in: [src/like-neverthrow.ts:23](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L23)

Map the error value.

#### Type Parameters

##### F

`F`

#### Parameters

##### fn

(`error`) => `F`

#### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `F`\>

***

### match()

> **match**\<`U`, `V`\>(`onOk`, `onErr`): `U` \| `V`

Defined in: [src/like-neverthrow.ts:35](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L35)

Branch logic based on result type.

#### Type Parameters

##### U

`U`

##### V

`V`

#### Parameters

##### onOk

(`value`) => `U`

##### onErr

(`error`) => `V`

#### Returns

`U` \| `V`

***

### orElse()

> **orElse**\<`U`, `F`\>(`fn`): [`Result`](../type-aliases/Result.md)\<`T` \| `U`, `F`\>

Defined in: [src/like-neverthrow.ts:32](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L32)

Handle the error value by returning a new Result.

#### Type Parameters

##### U

`U` = `T`

##### F

`F` = `E`

#### Parameters

##### fn

(`error`) => [`Result`](../type-aliases/Result.md)\<`U`, `F`\>

#### Returns

[`Result`](../type-aliases/Result.md)\<`T` \| `U`, `F`\>

***

### unwrapOr()

> **unwrapOr**\<`D`\>(`defaultValue`): `T` \| `D`

Defined in: [src/like-neverthrow.ts:38](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L38)

Unwrap value or return default.

#### Type Parameters

##### D

`D`

#### Parameters

##### defaultValue

`D`

#### Returns

`T` \| `D`

***

### unwrapOrElse()

> **unwrapOrElse**\<`D`\>(`fn`): `T` \| `D`

Defined in: [src/like-neverthrow.ts:41](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/like-neverthrow.ts#L41)

Unwrap value or call fallback.

#### Type Parameters

##### D

`D`

#### Parameters

##### fn

(`error`) => `D`

#### Returns

`T` \| `D`
