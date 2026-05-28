[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [functions](../README.md) / createResult

# Function: createResult()

> **createResult**\<`E`, `FE`\>(`options?`): `object`

Defined in: [src/functions.ts:250](https://github.com/simwai/super-result/blob/826302294b2f8dec4f3b605b2dd1d8ab1c4c08e4/src/functions.ts#L250)

Creates a bound functional API with pre-configured error mapping.

## Type Parameters

### E

`E` = `unknown`

### FE

`FE` = `unknown`

## Parameters

### options?

[`ResultConfig`](../type-aliases/ResultConfig.md)\<`E`, `FE`\>

## Returns

### err

> **err**: (`e`) => [`RawResult`](../../index/type-aliases/RawResult.md)\<`never`, `E`\>

#### Parameters

##### e

`E`

#### Returns

[`RawResult`](../../index/type-aliases/RawResult.md)\<`never`, `E`\>

### flatMap

> **flatMap**: \{\<`T`, `E`, `U`\>(`input`, `fn`): [`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>; \<`T`, `E`, `U`\>(`input`, `fn`): `Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>\>; \}

#### Call Signature

> \<`T`, `E`, `U`\>(`input`, `fn`): [`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>

Maps the success value to a new [RawResult](../../index/type-aliases/RawResult.md) and flattens it.

##### Type Parameters

###### T

`T`

###### E

`E`

###### U

`U`

##### Parameters

###### input

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>

###### fn

(`v`) => [`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>

##### Returns

[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>

#### Call Signature

> \<`T`, `E`, `U`\>(`input`, `fn`): `Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>\>

Maps the success value to a new [RawResult](../../index/type-aliases/RawResult.md) and flattens it.

##### Type Parameters

###### T

`T`

###### E

`E`

###### U

`U`

##### Parameters

###### input

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>

###### fn

(`v`) => [`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>

##### Returns

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>\>

### fromPromise

> **fromPromise**: \<`T`\>(`p`) => `Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>

#### Type Parameters

##### T

`T`

#### Parameters

##### p

`PromiseLike`\<`T`\>

#### Returns

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>

### fromThrowable

> **fromThrowable**: \<`T`\>(`fn`) => [`Err`](../../index/interfaces/Err.md)\<`E`\> \| [`Ok`](../../index/interfaces/Ok.md)\<`T`\>

#### Type Parameters

##### T

`T`

#### Parameters

##### fn

() => `T`

#### Returns

[`Err`](../../index/interfaces/Err.md)\<`E`\> \| [`Ok`](../../index/interfaces/Ok.md)\<`T`\>

### map

> **map**: \{\<`T`, `E`, `U`\>(`input`, `fn`): [`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>; \<`T`, `E`, `U`\>(`input`, `fn`): `Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>\>; \}

#### Call Signature

> \<`T`, `E`, `U`\>(`input`, `fn`): [`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>

Maps the success value using the provided function.

##### Type Parameters

###### T

`T`

###### E

`E`

###### U

`U`

##### Parameters

###### input

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>

###### fn

(`v`) => `U`

##### Returns

[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>

#### Call Signature

> \<`T`, `E`, `U`\>(`input`, `fn`): `Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>\>

Maps the success value using the provided function.

##### Type Parameters

###### T

`T`

###### E

`E`

###### U

`U`

##### Parameters

###### input

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>

###### fn

(`v`) => `U`

##### Returns

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>\>

### ok

> **ok**: \<`T`\>(`value`) => [`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `never`\>

Creates a successful [RawResult](../../index/type-aliases/RawResult.md).

#### Type Parameters

##### T

`T`

#### Parameters

##### value

`T`

The success value.

#### Returns

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `never`\>

### onFinally

> **onFinally**: (`input`, `callback`) => [`RawResult`](../../index/type-aliases/RawResult.md)\<`unknown`, `unknown`\>

#### Parameters

##### input

`any`

##### callback

`any`

#### Returns

[`RawResult`](../../index/type-aliases/RawResult.md)\<`unknown`, `unknown`\>

### result

> **result**: \<`T`\>(`input`) => `Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`unknown`, `E`\>\>

#### Type Parameters

##### T

`T`

#### Parameters

##### input

`any`

#### Returns

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`unknown`, `E`\>\>

### unwrap

> **unwrap**: \{\<`T`, `E`\>(`input`): `T`; \<`T`, `E`\>(`input`): `Promise`\<`T`\>; \}

#### Call Signature

> \<`T`, `E`\>(`input`): `T`

Returns the value if success, otherwise throws the error.

##### Type Parameters

###### T

`T`

###### E

`E`

##### Parameters

###### input

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>

##### Returns

`T`

#### Call Signature

> \<`T`, `E`\>(`input`): `Promise`\<`T`\>

Returns the value if success, otherwise throws the error.

##### Type Parameters

###### T

`T`

###### E

`E`

##### Parameters

###### input

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>

##### Returns

`Promise`\<`T`\>

### unwrapOr

> **unwrapOr**: \{\<`T`, `E`, `D`\>(`input`, `defaultValue`): `T` \| `D`; \<`T`, `E`, `D`\>(`input`, `defaultValue`): `Promise`\<`T` \| `D`\>; \}

#### Call Signature

> \<`T`, `E`, `D`\>(`input`, `defaultValue`): `T` \| `D`

Returns the value if success, otherwise returns the provided default value.

##### Type Parameters

###### T

`T`

###### E

`E`

###### D

`D`

##### Parameters

###### input

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>

###### defaultValue

`D`

##### Returns

`T` \| `D`

#### Call Signature

> \<`T`, `E`, `D`\>(`input`, `defaultValue`): `Promise`\<`T` \| `D`\>

Returns the value if success, otherwise returns the provided default value.

##### Type Parameters

###### T

`T`

###### E

`E`

###### D

`D`

##### Parameters

###### input

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>

###### defaultValue

`D`

##### Returns

`Promise`\<`T` \| `D`\>

### unwrapOrElse

> **unwrapOrElse**: \{\<`T`, `E`, `D`\>(`input`, `fallback`): `T` \| `D`; \<`T`, `E`, `D`\>(`input`, `fallback`): `Promise`\<`T` \| `D`\>; \}

#### Call Signature

> \<`T`, `E`, `D`\>(`input`, `fallback`): `T` \| `D`

Returns the value if success, otherwise calls the fallback function with the error.

##### Type Parameters

###### T

`T`

###### E

`E`

###### D

`D`

##### Parameters

###### input

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>

###### fallback

(`e`) => `D`

##### Returns

`T` \| `D`

#### Call Signature

> \<`T`, `E`, `D`\>(`input`, `fallback`): `Promise`\<`T` \| `D`\>

Returns the value if success, otherwise calls the fallback function with the error.

##### Type Parameters

###### T

`T`

###### E

`E`

###### D

`D`

##### Parameters

###### input

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>

###### fallback

(`e`) => `D`

##### Returns

`Promise`\<`T` \| `D`\>

### unwrapSync

> **unwrapSync**: \<`T`, `E`\>(`input`) => `T`

Synchronously returns the value if success, otherwise throws the error.

#### Type Parameters

##### T

`T`

##### E

`E`

#### Parameters

##### input

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>

#### Returns

`T`
