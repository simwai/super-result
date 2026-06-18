# Philosophy

The core philosophy of `super-result` is **Explicit Failure**.

In many languages, errors are treated as side effects (Exceptions). In `super-result`, errors are **Data**.

## Inspired by Rust

We love how Rust handles errors with the `Result` enum. It makes code robust and easy to reason about. `super-result` brings that same peace of mind to the TypeScript ecosystem without the overhead of complex classes or heavy dependencies.

## Key Principles

1. **Simplicity over abstraction**: We don't use custom `ResultAsync` classes with dozens of methods. We use native Promises and Types.
2. **Standard-first**: We use raw object literals for results (`{ ok: true, value }`). This makes them easy to serialize, log, and inspect.
3. **No magic**: The library is transparent. You can see exactly how `from` works by reading a few lines of code.

For a deeper dive into the "Why", read our [Full Philosophy Document](https://github.com/simwai/super-result/blob/master/PHILOSOPHY.md).
