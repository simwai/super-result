[**super-result API v0.1.0**](../README.md)

***

[super-result API](../README.md) / like-neverthrow

# like-neverthrow

## Classes

### Errors

- [FinallyError](classes/FinallyError.md)
- [NonErrorThrown](classes/NonErrorThrown.md)

## Interfaces

### Capture

- [CaptureOptions](interfaces/CaptureOptions.md)

### Factory

- [ResultInterface](interfaces/ResultInterface.md)

### Result

- [Err](interfaces/Err.md)
- [Ok](interfaces/Ok.md)

## Type Aliases

### Factory

- [ResultConfig](type-aliases/ResultConfig.md)

### Result

- [Result](type-aliases/Result.md)
- [ResultAsync](type-aliases/ResultAsync.md)

### Utility Types

- [ResultAsyncErr](type-aliases/ResultAsyncErr.md)
- [ResultAsyncOk](type-aliases/ResultAsyncOk.md)
- [ResultErr](type-aliases/ResultErr.md)
- [ResultOk](type-aliases/ResultOk.md)

## Functions

### Capture

- [fromAsyncThrowable](functions/fromAsyncThrowable.md)
- [fromPromise](functions/fromPromise.md)
- [fromThrowable](functions/fromThrowable.md)

### Constructors

- [err](functions/err.md)
- [errAsync](functions/errAsync.md)
- [ok](functions/ok.md)
- [okAsync](functions/okAsync.md)

### Factory

- [createResult](functions/createResult.md)

### Lifecycle

- [onFinally](functions/onFinally.md)
- [onFinallyAsync](functions/onFinallyAsync.md)

### Pattern Matching

- [match](functions/match.md)
- [matchAsync](functions/matchAsync.md)

### Predicates

- [isErr](functions/isErr.md)
- [isOk](functions/isOk.md)

### Transformation

- [flatMap](functions/flatMap.md)
- [flatMapAsync](functions/flatMapAsync.md)
- [map](functions/map.md)
- [mapAsync](functions/mapAsync.md)
- [mapErr](functions/mapErr.md)
- [mapErrAsync](functions/mapErrAsync.md)

### Unwrap

- [unwrap](functions/unwrap.md)
- [unwrapAsync](functions/unwrapAsync.md)
- [unwrapOr](functions/unwrapOr.md)
- [unwrapOrAsync](functions/unwrapOrAsync.md)
- [unwrapOrElse](functions/unwrapOrElse.md)
- [unwrapOrElseAsync](functions/unwrapOrElseAsync.md)
