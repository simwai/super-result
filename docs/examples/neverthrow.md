# Neverthrow-style API Examples

This API is inspired by the popular `neverthrow` library, using `type: 'ok' | 'err'` discriminators and method-based chaining.

## Beginner: Safe JSON Parsing

Handling synchronous errors and chaining transformations.

```ts
import { fromThrowable } from 'super-result/like-neverthrow'

interface Config {
  apiUrl: string;
}

function parseConfig(json: string) {
  return fromThrowable(
    () => {
        const data = JSON.parse(json);
        if (!data.apiUrl) throw new Error('Missing apiUrl');
        return data as Config;
    },
    (err) => err instanceof Error ? err : new Error(String(err))
  );
}

const res = parseConfig('{ "apiUrl": "https://api.example.com" }')
  .map(cfg => cfg.apiUrl)

if (res.isOk()) {
  // .value is narrowed in this block
  console.log('API URL:', res.value);
} else {
  // .error is narrowed in this block
  console.error('Error:', res.error.message);
}
```

## Advanced: Standardized Enterprise Error Handling

Using `createResult` to pre-bind error mapping logic for the whole application.

```ts
import { createResult } from 'super-result/like-neverthrow'

class AppError extends Error {
  constructor(public code: string, message: string) {
    super(message);
  }
}

const R = createResult((err) => {
  return new AppError('INTERNAL_ERROR', err instanceof Error ? err.message : 'Unknown');
});

async function fetchData() {
  // R.fromPromise uses the bound error mapper
  return R.fromPromise(fetch('https://api.example.com/data').then(r => r.json()));
}

const res = await fetchData();
if (res.isErr()) {
  console.error(`[${res.error.code}] ${res.error.message}`);
}
```

## Complex: Multi-step Order Processing with Rollback

Chaining async operations and handling failures with standard methods.

```ts
import { ok, err } from 'super-result/like-neverthrow'

interface Order { id: string }

async function processOrder(order: Order) {
  // 1. Check Inventory
  const inventoryRes = ok(true);

  // 2. Charge (Async)
  // Note: Since ResultAsync is just a Promise, we await the check
  const chargeRes = await inventoryRes.andThen(async () => {
    return ok({ txId: 'abc-123' });
  });

  if (chargeRes.isErr()) return chargeRes;
  const payment = chargeRes.value;

  // 3. Save to DB
  const saveRes = err(new Error('DB Timeout'));

  if (saveRes.isErr()) {
    // 4. Rollback
    console.log(`Refunding ${payment.txId}`);
    return saveRes;
  }

  return ok({ success: true });
}
```
