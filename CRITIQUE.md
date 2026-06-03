# Code Critique: super-result

Hey there! 👋 I took a look at the codebase. Here's a breakdown of my thoughts on the current implementation, following my usual philosophy of "keep it simple, keep it fast, and keep it type-safe."

---

## `src/index.ts`

This is the core of the library. It defines the basic `RawResult` types and the main `Result` class.

### Pros
- **Discriminated Unions**: Using `ok: true | false` is the classic, reliable way to do this in TypeScript. Good job keeping it simple.
- **Fluent API**: The `Result` class provides a very readable chainable API (`.map().flatMap().finally()`).
- **PromiseLike Implementation**: I love that you can `await` a `Result` directly. It's very "modern JS".

### Suggestions
- **The Hybrid Result Class**: The `Result` class tries to handle both synchronous and asynchronous states in the same container using `instanceof Promise` checks. While this is convenient, it can be a bit unpredictable. In functional programming, we usually prefer to be explicit about whether we're dealing with a sync value or a promise. It might also make tree-shaking harder if someone only wants sync results.
- **Bundle Size**: Classes tend to not tree-shake as well as pure functions. If someone only uses `ok()` and `err()`, they might still be pulling in the whole `Result` class if they are not careful.
- **Internal Helper Overlap**: You have `isOk` and `isErr` defined internally, but also as methods. Maybe consider exporting these helpers more prominently?

---
## `src/class.ts` & `src/fn.ts`

These seem to be just proxy exports for `index.ts` and `functions.ts`.

### Thoughts
- **Naming**: `fn.ts` vs `functions.ts`. It's a bit redundant to have both. Usually, it's better to pick one convention and stick with it. If they are for subpath exports, that's fine, but it might be cleaner to just have one canonical entry point for the functional API.

---
## `src/functions.ts`

This provides the functional/composable API.

### Pros
- **Tree-shakeable**: This is the way to go for modern web apps. Small, focused functions.
- **`createResult`**: This is a brilliant pattern. Being able to pre-configured an error mapper for a whole module/service saves so much boilerplate.

### Suggestions
- **The `result()` helper**: It's a bit "magical". It tries to be a Swiss army knife (handling sync values, promises, functions, results). I'd personally prefer more explicit names like `from()` or `wrap()`. When a function does too many things, it can lead to subtle bugs or confusing type errors when you pass it something unexpected.
- **Overload Complexity**: The sync/async overloads are nice for the user, but they make the implementation quite heavy with type casting (`as any`). Sometimes keeping sync and async functions separate (e.g., `map` vs `mapAsync`) is cleaner for both the dev and the compiler.

---

## `src/like-neverthrow.ts`

A compatibility layer for `neverthrow` users.

### Pros
- **Onboarding**: Makes it super easy for people to switch or use both libraries in the same monorepo.
- **Lightweight `ResultAsync`**: I like that it's just a type alias for a Promise. It keeps things "native" and fast.

### Suggestions
- **Code Duplication**: It seems to re-implement a lot of logic that's similar to the core API. If this library grows, maintaining two slightly different implementations of `map`, `flatMap`, etc., will become a headache. Maybe the core could be generalized to handle any discriminator?

---

## Tests (`src/*.test.ts`)

### Thoughts
- **Vitest**: Good choice. It's fast and has a great DX.
- **Coverage**: The tests look thorough. You're covering both the "happy path" and the error cases well.
- **Clarity**: The tests are easy to read. One small thing: I'd group them a bit more by feature using `describe` blocks if they get any larger.

---

## General Observations

- **Documentation**: You have JSDoc comments everywhere! That's excellent for IDE support.
- **Build Setup**: Using `unbuild` (or `tsup`) is the right move for a library. ESM/CJS compatibility is handled.
- **Tooling**: Biome and Vitest are top-tier choices for performance and modern standards.

Overall, this is a very solid and well-thought-out library. My main advice would be to decide how much "magic" (like the `result()` function) you want versus being explicit, and to keep an eye on code duplication between the different API styles.

Keep up the great work! ✨

---

## Type Safety Deep Dive 🛡️

As an external user, I want to trust that the types are doing the heavy lifting without hiding bugs behind `any`.

### The `any` Tax
In `src/functions.ts` and `src/like-neverthrow.ts`, I noticed a fair amount of `any` in the implementations.
- **Implementation vs. Interface**: While it's common to use `any` inside a function with complex overloads to satisfy the compiler, it's a "trust me" contract. If the implementation logic drifts from the overloads, the compiler won't save you.
- **Recommendation**: Try to use `unknown` and type guards (`isPromise`, etc.) even in the implementation. It's more work but keeps the internals honest.

### Overload Overload
The `result()` helper in `src/functions.ts` is a bit of a "god function." It handles:
1. Sync values
2. Promises
3. Sync factories
4. Async factories
5. Existing Results

This leads to a massive stack of overloads. While "easy" for the user, it makes the library harder to maintain and can lead to confusing "No overload matches this call" errors that are 20 lines long. Splitting these into `fromPromise`, `fromSync`, etc., would be more "boring" but much more predictable.

### Discriminated Union Consistency
You're managing two different shapes of results:
1. `{ ok: true, value: T } | { ok: false, error: E }` (Core)
2. `{ type: 'ok', value: T } | { type: 'err', error: E }` (Neverthrow-style)

This is a bit of a "split personality" for the library. If I'm an external user, I might get confused which one I'm using if I just import `Result`. It might be better to rename the neverthrow-style ones to something like `LegacyResult` or `CompatResult` to make the distinction clear.

### The `unknown` Error Pattern
I like that you default to `unknown` for caught errors. This is the correct way to handle `try/catch` in modern TS. Forcing users to map these to a known error type via `createResult` is a great "pit of success" design.

### complexity vs. Utility
The `handleResult` in `src/like-neverthrow.ts` returns `any`. This is where the type safety "leaks." If I use the `finally` option, the return type becomes a bit of a mystery to the compiler unless the overloads are 100% perfect. This is a case where the complexity of the feature (binding `finally` into the capture call) might be outweighing the type-safety benefit.

---

## Neverthrow Comparison: `super-result` vs. `neverthrow` 🔄

Since `src/like-neverthrow.ts` exists, it's worth comparing how this stacks up against the original `neverthrow`.

### 1. Architectural Philosophy
- **`neverthrow`**: Very much class-oriented. `Result` and `ResultAsync` are dedicated classes with a rich set of methods. It feels like a port of Rust's `Result` or similar functional patterns into a OOP-friendly TypeScript wrapper.
- **`super-result`**: Functional-first. Even in the "neverthrow" mode, it prefers pure functions and simple type aliases. `ResultAsync` here is just `Promise<Result<T, E>>`, which is much lighter than `neverthrow`'s custom `ResultAsync` class.

### 2. `ResultAsync` Implementation
- **Original**: `neverthrow`'s `ResultAsync` is a "lazy" wrapper. It doesn't start execution until you call `.then()` or `.match()`. This allows for some cool optimizations but adds complexity.
- **This Lib**: `ResultAsync` is just a standard `Promise`. It's eager, easy to understand, and works out-of-the-box with all existing Promise utilities. However, you lose that "lazy" monadic chaining that some people love in `neverthrow`.

### 3. API Surface & Naming
- **Mapping**: `neverthrow` uses `andThen` (monadic bind). `super-result` uses `flatMap`. `flatMap` is more idiomatic in the JS/TS ecosystem (like `Array.prototype.flatMap`), whereas `andThen` is more common in traditional functional languages.
- **Factory Methods**: `neverthrow` uses `ResultAsync.fromPromise`. `super-result` provides `fromPromise` but also that "all-in-one" `result()` / `from()` helper.

### 4. Data Representation
- **Original**: `neverthrow` relies on class instances (`instanceof Ok`).
- **This Lib**: Uses a plain object with a discriminator (`type: 'ok'` or `ok: true`). This makes the results much easier to serialize over the wire (JSON) without losing their "result-ness." In `neverthrow`, you often have to manually convert to/from plain objects if you're sending results between a backend and frontend.

### 5. Missing Pieces?
- `neverthrow` has a lot of "through" methods (`andThrough`, `tee`) for side effects. `super-result` seems to focus more on the core `map/flatMap/match` flow. If you're a heavy `neverthrow` power user, you might miss some of those utility methods, but for 90% of use cases, `super-result` is a much leaner alternative.

---

## Design Philosophy: Why the Split? 🤔

You might wonder why we have three different API styles (Class-based, Functional, and Neverthrow-style) in one library.

### 1. Choice for the User
Every developer has their own preference. Some love the fluent, chainable style of classes. Others prefer the clean, composable nature of pure functions. By providing all three, we let the user pick the tool that fits their brain and their project best.

### 2. Full Tree-shakability 🌳
The magic here is that because we've designed the entry points carefully, **you only pay for what you use**. If you only use the functional API, the `Result` class won't end up in your final bundle. This makes the "different styles" approach a zero-cost abstraction for the end user.

---

## Why `super-result` instead of `neverthrow`? 🚀

It's a fair question. Why not just use the industry standard?

### 1. Maintenance & Future-proofing
The original `neverthrow` has become somewhat stagnant in terms of maintenance. Modern JS/TS moves fast, and having a library that is actively maintained and built with modern tooling (unbuild, vitest, biome) is a huge advantage for long-term stability.

### 2. Removing Unnecessary Complexity
`neverthrow` introduces a custom `ResultAsync` object which re-implements a lot of async logic. This creates a "dual-track" API where you have to learn one set of methods for sync and another for async.

In `super-result`, we keep it lean:
- **No `ResultAsync` wrapper**: We treat async results as standard Promises.
- **Native Interop**: Because it's just a Promise, it works seamlessly with every existing async tool in the JS ecosystem without needing a custom "adapter" layer.
- **Lower Cognitive Load**: You don't need to wrap/unwrap between standard Promises and a proprietary `ResultAsync` class.

---

## Links

- [GitHub Repository](https://github.com/simwai/super-result)
- [Library Philosophy](https://github.com/simwai/super-result/blob/master/PHILOSOPHY.md)
