[**super-result API v0.1.0**](../../README.md)

***

[super-result API](../../README.md) / [functions](../README.md) / createResult

# Function: createResult()

> **createResult**\<`E`, `FE`\>(`options?`): `object`

Defined in: [src/functions.ts:299](https://github.com/simwai/super-result/blob/f46d5c2afbce2ea4a7eacc418bb34e4c8a37b1f1/src/functions.ts#L299)

Creates a bound functional API with pre-configured error mapping.
Useful for ensuring consistent error structures across a module or service.

## Type Parameters

### E

`E` = `unknown`

### FE

`FE` = `unknown`

## Parameters

### options?

[`ResultConfig`](../type-aliases/ResultConfig.md)\<`E`, `FE`\>

Mapping configuration or a single mapError function.

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

Maps the success value to a new RawResult and flattens it.
Works with both synchronous RawResult and Promise of RawResult.

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

The Result or Promise of a Result to flatMap.

###### fn

(`v`) => [`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>

The function returning a new Result.

##### Returns

[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>

##### Example

```ts
const res = ok('/api/user')
const data = await flatMap(res, url => fromPromise(fetch(url), e => e))
```

#### Call Signature

> \<`T`, `E`, `U`\>(`input`, `fn`): `Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>\>

Maps the success value to a new RawResult and flattens it.
Works with both synchronous RawResult and Promise of RawResult.

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

The Result or Promise of a Result to flatMap.

###### fn

(`v`) => [`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>

The function returning a new Result.

##### Returns

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>\>

##### Example

```ts
const res = ok('/api/user')
const data = await flatMap(res, url => fromPromise(fetch(url), e => e))
```

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
Works with both synchronous RawResult and Promise of RawResult.

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

The Result or Promise of a Result to map.

###### fn

(`v`) => `U`

The transformation function for the success value.

##### Returns

[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>

##### Example

```ts
const res = ok(21)
const doubled = map(res, n => n * 2) // { ok: true, value: 42 }
```

#### Call Signature

> \<`T`, `E`, `U`\>(`input`, `fn`): `Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>\>

Maps the success value using the provided function.
Works with both synchronous RawResult and Promise of RawResult.

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

The Result or Promise of a Result to map.

###### fn

(`v`) => `U`

The transformation function for the success value.

##### Returns

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`U`, `E`\>\>

##### Example

```ts
const res = ok(21)
const doubled = map(res, n => n * 2) // { ok: true, value: 42 }
```

### ok

> **ok**: \<`T`\>(`value`) => [`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `never`\>

Creates a successful RawResult.

#### Type Parameters

##### T

`T`

#### Parameters

##### value

`T`

The success value.

#### Returns

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `never`\>

#### Example

```ts
const res = ok(42)
if (res.ok) {
  console.log(res.value) // 42
}
```

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
Works with both synchronous and asynchronous inputs.

##### Type Parameters

###### T

`T`

###### E

`E`

##### Parameters

###### input

[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>

The Result or Promise of a Result to unwrap.

##### Returns

`T`

#### Call Signature

> \<`T`, `E`\>(`input`): `Promise`\<`T`\>

Returns the value if success, otherwise throws the error.
Works with both synchronous and asynchronous inputs.

##### Type Parameters

###### T

`T`

###### E

`E`

##### Parameters

###### input

`Promise`\<[`RawResult`](../../index/type-aliases/RawResult.md)\<`T`, `E`\>\>

The Result or Promise of a Result to unwrap.

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

The Result or Promise of a Result.

###### defaultValue

`D`

The fallback value.

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

The Result or Promise of a Result.

###### defaultValue

`D`

The fallback value.

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

The Result or Promise of a Result.

###### fallback

(`e`) => `D`

The function to call if result is an error.

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

The Result or Promise of a Result.

###### fallback

(`e`) => `D`

The function to call if result is an error.

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

The synchronous RawResult to unwrap.

#### Returns

`T`

## Example

```ts
const { result, map } = createResult(e => new AppError(String(e)))

const data = await result(fetchUser(1))
```
