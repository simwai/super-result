[**super-result API v0.1.0**](../README.md)

***

[super-result API](../README.md) / like-neverthrow

# like-neverthrow

## Classes

### Core Classes

- [Err](classes/Err.md)
- [Ok](classes/Ok.md)

## Interfaces

### Factory

- [CaptureOptions](interfaces/CaptureOptions.md)
- [ResultInterface](interfaces/ResultInterface.md)

### Other

- [ResultBase](interfaces/ResultBase.md)

## Type Aliases

### Core Types

- [Result](type-aliases/Result.md)
- [ResultAsync](type-aliases/ResultAsync.md)

### Factory

- [ResultConfig](type-aliases/ResultConfig.md)

### Utility Types

- [ResultAsyncErr](type-aliases/ResultAsyncErr.md)
- [ResultAsyncOk](type-aliases/ResultAsyncOk.md)
- [ResultErr](type-aliases/ResultErr.md)
- [ResultOk](type-aliases/ResultOk.md)

## Variables

### Transformation

- [andThen](variables/andThen.md)
- [andThenAsync](variables/andThenAsync.md)

## Functions

### Capture

- [fromAsyncThrowable](functions/fromAsyncThrowable.md)
- [fromPromise](functions/fromPromise.md)
- [fromThrowable](functions/fromThrowable.md)

### Combination

- [combine](functions/combine.md)
- [combineAsync](functions/combineAsync.md)

### Constructors

- [err](functions/err.md)
- [errAsync](functions/errAsync.md)
- [ok](functions/ok.md)
- [okAsync](functions/okAsync.md)

### Factory

- [createResult](functions/createResult.md)

### Guards

- [isErr](functions/isErr.md)
- [isOk](functions/isOk.md)

### Lifecycle

- [onFinally](functions/onFinally.md)
- [onFinallyAsync](functions/onFinallyAsync.md)

### Mapping

- [map](functions/map.md)
- [mapAsync](functions/mapAsync.md)
- [mapErr](functions/mapErr.md)
- [mapErrAsync](functions/mapErrAsync.md)
- [orElse](functions/orElse.md)
- [orElseAsync](functions/orElseAsync.md)

### Pattern Matching

- [match](functions/match.md)
- [matchAsync](functions/matchAsync.md)

### Transformation

- [flatMap](functions/flatMap.md)
- [flatMapAsync](functions/flatMapAsync.md)

### Unwrap

- [unwrap](functions/unwrap.md)
- [unwrapAsync](functions/unwrapAsync.md)
- [unwrapOr](functions/unwrapOr.md)
- [unwrapOrAsync](functions/unwrapOrAsync.md)
- [unwrapOrElse](functions/unwrapOrElse.md)
- [unwrapOrElseAsync](functions/unwrapOrElseAsync.md)

## References

### FinallyError

Re-exports [FinallyError](../index/classes/FinallyError.md)

***

### NonErrorThrown

Re-exports [NonErrorThrown](../index/classes/NonErrorThrown.md)
