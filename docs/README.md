# super-result API Documentation

Welcome to the documentation for **super-result**, a lightweight and powerful library for railway-oriented error handling in TypeScript.

## 🚀 Choose Your Style

One library, three ways to use it. Pick the style that fits your project and your brain. All styles are **fully tree-shakeable** — you only pay for what you use.

### 1. [Default (Class-based)](https://github.com/simwai/super-result/blob/master/docs/index/README.md)
The primary style. Provides a fluent, `PromiseLike` wrapper around results. Ideal for developers who love chainable, method-heavy APIs.

### 2. [Functional API](https://github.com/simwai/super-result/blob/master/docs/functions/README.md)
Pure functions for a composable, functional programming style. Best for performance-sensitive applications and developers who prefer `pipe` operators or standalone helpers.

### 3. [Neverthrow-compatible](https://github.com/simwai/super-result/blob/master/docs/like-neverthrow/README.md)
A familiar API for users coming from the `neverthrow` library. Uses the same discriminator (`type: 'ok' | 'err'`) and method names you already know, but with a leaner, more modern implementation.

---

## 🛠️ Key Features

- **Discriminated Unions**: Type-safe error handling without unsafe casts or `any`.
- **Async First**: Handle synchronous and asynchronous results with a unified mental model.
- **Zero Dependencies**: Keeps your bundle size minimal.
- **Modern JS**: Built for ESM, with full support for `await` on Result objects.

## 📖 Useful Links

- [GitHub Repository](https://github.com/simwai/super-result)
- [Example Guide](https://github.com/simwai/super-result/blob/master/docs/examples/README.md)
- [**Library Philosophy**](https://github.com/simwai/super-result/blob/master/PHILOSOPHY.md)
