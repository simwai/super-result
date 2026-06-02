# Class-based API Examples

The Class-based API is the primary style for `super-result`, providing a fluent, chainable interface for both sync and async operations.

## Beginner: Safe JSON Parsing

In enterprise applications, handling untrusted input from external APIs or configuration files is a common task.

```ts
import { Result } from 'super-result'

interface Config {
  apiUrl: string;
  retries: number;
}

function parseConfig(json: string): Result<Config, Error> {
  // Capture potential JSON.parse errors
  return Result.fromThrowable(() => {
    const data = JSON.parse(json);
    if (!data.apiUrl) throw new Error('Missing apiUrl');
    return data as Config;
  }).mapErr(err => err instanceof Error ? err : new Error(String(err)));
}

// Usage
const result = parseConfig('{ "apiUrl": "https://api.example.com", "retries": 3 }');

if (result.isOkSync()) {
  // .value is available after successful check
  console.log('Config loaded:', result.value.apiUrl);
} else {
  // .error is available after failed check
  console.error('Failed to load config:', result.error.message);
}
```

## Advanced: Standardized Enterprise Error Handling

Large organizations often require consistent error structures. You can use `createResult` from the functional entry point to create a factory, or simply wrap your logic in a class-based `Result`.

```ts
import { Result } from 'super-result'

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

// 2. Wrap async operations safely
async function getUser(id: string): Promise<Result<any, AppError>> {
  // Result.fromPromiseLike captures rejections
  return Result.fromPromiseLike(
    fetch(`/api/users/${id}`).then(r => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
    }),
    (err) => new AppError(
        err instanceof Error ? err.message : 'Unknown error',
        'NOT_FOUND'
    )
  );
}

const res = await getUser('123');
if (await res.isErr()) {
    const error = res.error!;
    console.error(`[${error.code}] ${error.message} (ID: ${error.correlationId})`);
}
```

## Complex: Multi-step Order Processing with Rollback

This example demonstrates a complex business flow involving multiple async steps, data transformation, and manual rollback logic when a later stage fails.

```ts
import { Result } from 'super-result'

interface Order { id: string; amount: number }
interface Payment { transactionId: string }

class OrderService {
  // Step 1: Validate & Inventory
  async checkInventory(order: Order): Promise<Result<boolean, Error>> {
    return Result.ok(true);
  }

  // Step 2: Charge Payment
  async chargePayment(order: Order): Promise<Result<Payment, Error>> {
    return Result.ok({ transactionId: 'tx_999' });
  }

  // Step 3: Refund (Rollback action)
  async refundPayment(txId: string) {
    console.log(`Refunding transaction ${txId}...`);
  }

  // Step 4: Save Order
  async saveToDb(order: Order, txId: string): Promise<Result<void, Error>> {
    // Simulate a failure to trigger rollback
    return Result.err(new Error('Database connection lost'));
  }

  async processOrder(order: Order): Promise<Result<{ orderId: string }, Error>> {
    // 1. Check inventory
    const inventoryRes = await this.checkInventory(order);
    if (await inventoryRes.isErr()) return inventoryRes as any;

    // 2. Charge payment
    const chargeRes = await this.chargePayment(order);
    if (await chargeRes.isErr()) return chargeRes as any;

    const payment = await chargeRes.unwrap();

    // 3. Save to DB
    const saveRes = await this.saveToDb(order, payment.transactionId);

    if (await saveRes.isErr()) {
      // 4. Manual Rollback if DB fails
      await this.refundPayment(payment.transactionId);
      return saveRes as any;
    }

    return Result.ok({ orderId: order.id });
  }
}
```
