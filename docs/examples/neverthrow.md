# Neverthrow-style API Examples

This API is inspired by the popular `neverthrow` library, using `type: 'ok' | 'err'` discriminators and familiar function names.

## Beginner: Safe JSON Parsing

Handling synchronous errors with `fromThrowable`.

```ts
import { fromThrowable, isOk } from 'super-result/like-neverthrow'

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

const res = parseConfig('{ "apiUrl": "https://api.example.com" }');

if (isOk(res)) {
  console.log('API URL:', res.value.apiUrl);
} else {
  console.error('Error:', res.error.message);
}
```

## Advanced: Standardized Enterprise Error Handling

Using `createResult` to pre-bind error mapping logic for the whole application.

```ts
import { createResult, isOk } from 'super-result/like-neverthrow'

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
if (!isOk(res)) {
  console.error(`[${res.error.code}] ${res.error.message}`);
}
```

## Complex: Multi-step Order Processing with Rollback

Chaining async operations with `flatMapAsync` (or manual checks) and handling failures.

```ts
import { ok, err, isOk, flatMapAsync } from 'super-result/like-neverthrow'

interface Order { id: string }

async function processOrder(order: Order) {
  // 1. Check Inventory
  const inventoryRes = ok(true);

  // 2. Charge (Async)
  const chargeRes = await flatMapAsync(inventoryRes, async () => {
    return ok({ txId: 'abc-123' });
  });

  if (!isOk(chargeRes)) return chargeRes;
  const payment = chargeRes.value;

  // 3. Save to DB
  const saveRes = err(new Error('DB Timeout'));

  if (!isOk(saveRes)) {
    // 4. Rollback
    console.log(`Refunding ${payment.txId}`);
    return saveRes;
  }

  return ok({ success: true });
}
```
