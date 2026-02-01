# Workflow: Add WebSocket Action

Follow this checklist to add a new outgoing WebSocket action (user → server).

See [.claude/rules/websocket/websocket.md](.claude/rules/websocket/websocket.md) for detailed rules.

## 1. Add the action to the API

In `src/websocket/api.ts`:

```typescript
import { ClientToServerMessageType } from './protocol';
import { send } from './connection';

/**
 * Perform some action
 * @param param1 - Description of param1
 * @param param2 - Description of param2
 */
export function myAction(param1: string, param2: number): void {
  send({
    type: ClientToServerMessageType.MY_ACTION,
    data: {
      param1,
      param2,
    },
  });
}
```

## 2. Use message types from protocol

**REQUIRED:** Always use enums from `protocol.ts`, never hardcoded strings.

In `src/websocket/protocol.ts`:

```typescript
export enum ClientToServerMessageType {
  // ... existing types
  MY_ACTION = 'myAction',  // Add this
}

export interface ClientToServerMessage {
  type: ClientToServerMessageType;
  data: unknown;
}
```

## 3. Add TypeScript type for payload (recommended)

In `src/websocket/protocol.ts`:

```typescript
export interface MyActionPayload {
  param1: string;
  param2: number;
}

// Update the message type map
export interface ClientToServerMessageMap {
  [ClientToServerMessageType.MY_ACTION]: MyActionPayload;
  // ... other types
}
```

Then use it in `api.ts`:

```typescript
import type { MyActionPayload } from './protocol';

export function myAction(payload: MyActionPayload): void {
  send({
    type: ClientToServerMessageType.MY_ACTION,
    data: payload,
  });
}
```

## 4. Keep the API simple (façade)

**BAD** - Exposing low-level payload construction:
```typescript
// ❌ Don't do this
export function myAction(data: unknown): void {
  send({ type: '...', data });  // User builds payload manually
}
```

**GOOD** - Simple, typed API:
```typescript
// ✅ Do this
export function myAction(userId: string, amount: number): void {
  send({
    type: ClientToServerMessageType.MY_ACTION,
    data: { userId, amount },
  });
}
```

## 5. Expose in public API

In `src/api/index.ts`:

```typescript
import { myAction } from '../websocket/api';

export const GeminiAPI = {
  // ...
  WebSocket: {
    // ... other actions
    myAction,
  },
};
```

Now accessible via `window.Gemini.WebSocket.myAction(...)`.

## 6. Optional: Add middleware

If the action needs outgoing message filtering/modification:

Create `src/websocket/middlewares/myAction.ts`:

```typescript
import { registerMiddleware } from './registry';
import { ClientToServerMessageType } from '../protocol';
import type { ClientToServerMessage } from '../protocol';

registerMiddleware((message: ClientToServerMessage) => {
  if (message.type !== ClientToServerMessageType.MY_ACTION) {
    return message;  // Pass through
  }

  // Modify or block the message
  console.log('[Middleware] Intercepted MY_ACTION:', message);

  // Return modified message or null to block
  return message;
});
```

Import in `src/websocket/bootstrap.ts`:
```typescript
import './middlewares/myAction';
```

## 7. Test the action

Verify:
- Action is callable: `window.Gemini.WebSocket.myAction(...)`
- Message is sent with correct type
- Payload is correctly structured
- TypeScript enforces correct parameters
- Middleware processes the message (if added)

## Quick checklist

- [ ] Action added to `src/websocket/api.ts`
- [ ] Message type added to `ClientToServerMessageType` enum
- [ ] Payload type defined (recommended)
- [ ] API is simple and typed (no raw `unknown` data)
- [ ] No hardcoded message type strings
- [ ] Exposed in `src/api/index.ts`
- [ ] Middleware added (optional)
- [ ] Tests passing (action sends correct message)
