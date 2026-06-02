# Functional API Examples

The Functional API provides pure functions for a composable, functional programming style. It is highly tree-shakeable and fits well with pipes or standard function composition.

## Beginner: Safe JSON Parsing

Using pure functions to handle synchronous errors and transformations.

```ts
import { fromThrowable, isOk } from 'super-result/functions'

interface Config {
  apiUrl: string;
  retries: number;
}

function parseConfig(json: string) {
  return fromThrowable(() => {
    const data = JSON.parse(json);
    if (!data.apiUrl) throw new Error('Missing apiUrl');
    return data as Config;
  });
}

// Usage
const result = parseConfig('{ "apiUrl": "https://api.example.com", "retries": 3 }');

if (isOk(result)) {
  console.log('Config loaded:', result.value.apiUrl);
} else {
  // .error is used for error access after checks
  console.error('Failed to load config:', (result.error as any).message);
}
```

## Advanced: Standardized Enterprise Error Handling

Leverage `createResult` to build a customized, reusable Result toolkit for your organization.

```ts
import { createResult, isOk } from 'super-result/functions'

// 1. Define a standard error structure
class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly code: 'NOT_FOUND' | 'VALIDATION' | 'INTERNAL',
    public readonly correlationId = Math.random().toString(36).slice(2)
  ) {
    super(message);
  }
}

// 2. Create a pre-configured Result toolkit
const R = createResult({
  mapError: (err): AppError => {
    if (err instanceof AppError) return err;
    return new AppError(
      err instanceof Error ? err.message : 'Unknown error',
      'INTERNAL'
    );
  }
});

// 3. Use the toolkit
async function getUser(id: string) {
  // R.fromPromise automatically uses the mapError defined above
  return R.fromPromise(
    fetch(`/api/users/${id}`).then(r => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
    })
  );
}

const userRes = await getUser('123');
if (isOk(userRes)) {
    console.log(userRes.value);
} else {
    // .error is used for error access after checks
    console.error(`[${userRes.error.code}] ${userRes.error.message}`);
}
```

## Complex: Multi-step Order Processing with Rollback

Using `flatMap` and manual checks in a functional style to manage complex async flows.

```ts
import * as R from 'super-result/functions'

interface Order { id: string; amount: number }
interface Payment { transactionId: string }

async function processOrder(order: Order) {
  // 1. Check Inventory
  const inventoryRes = R.ok(true);

  // 2. Charge (Async)
  const chargeRes = await R.flatMap(inventoryRes, async () => {
    return R.ok({ transactionId: 'tx_555' } as Payment);
  });

  if (!R.isOk(chargeRes)) return chargeRes;
  const payment = chargeRes.value;

  // 3. Save to DB
  const saveRes = await R.fromPromise(
    (async () => {
        throw new Error('DB Fail'); // Simulate failure
    })(),
    (err) => err instanceof Error ? err : new Error(String(err))
  );

  if (!R.isOk(saveRes)) {
    // 4. Rollback logic
    console.log(`Rolling back payment ${payment.transactionId}`);
    return saveRes;
  }

  return R.ok({ orderId: order.id, status: 'success' });
}
```
