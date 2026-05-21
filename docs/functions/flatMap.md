[**super-result API v1.0.0**](../README.md)

***

[super-result API](../README.md) / flatMap

# Function: flatMap()

> **flatMap**\<`T`, `E`, `U`\>(`result`, `fn`): [`Result`](../type-aliases/Result.md)\<`U`, `E`\>

Defined in: [src/index.ts:267](https://github.com/simwai/super-result/blob/509b23f0e70cff470eb13653fe080f8125a78a9b/src/index.ts#L267)

Applies `fn` to the value if `Ok` and returns the inner `Result`, flattening one level.
Passes `Err` through unchanged. Use this to chain fallible operations without nesting.

## Type Parameters

### T

`T`

### E

`E`

### U

`U`

## Parameters

### result

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

The result to chain.

### fn

(`value`) => [`Result`](../type-aliases/Result.md)\<`U`, `E`\>

Maps the success value to a new `Result<U, E>`.

## Returns

[`Result`](../type-aliases/Result.md)\<`U`, `E`\>

The `Result<U, E>` returned by `fn` if `Ok`, the original `Err<E>` otherwise.
