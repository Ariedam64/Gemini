---
paths: src/websocket/**/*
---

# WebSocket rules

The WebSocket layer handles bidirectional communication between the mod and the game server.

## Structure

```
src/websocket/
├── protocol.ts      # Types/constants only (no runtime logic)
├── connection.ts    # Transport/capture only (WS wrapping)
├── api.ts           # Public outgoing actions (ONLY place to send)
├── middlewares/     # Outgoing message interceptors
│   ├── registry.ts  # Middleware registration
│   └── *.ts         # Individual middlewares
├── handlers/        # Incoming message handlers
│   ├── registry.ts  # Handler registration
│   └── *.ts         # Individual handlers
└── index.ts         # Public exports
```

## File responsibilities

### `protocol.ts` - Types only

Contains ONLY types and constants, NO runtime logic:

```typescript
// Message type enums
export enum ClientToServerMessageType {
  CHAT = 'chat',
  MOVE = 'move',
  PLANT_SEED = 'plantSeed',
  HARVEST_CROP = 'harvestCrop',
}

export enum ServerToClientMessageType {
  CHAT_MESSAGE = 'chatMessage',
  PLAYER_MOVED = 'playerMoved',
  TILE_UPDATED = 'tileUpdated',
}

// Close codes
export enum WebSocketCloseCode {
  NORMAL = 1000,
  GOING_AWAY = 1001,
}

// Payload types
export interface ChatPayload {
  message: string;
  channel?: string;
}

export interface MovePayload {
  x: number;
  y: number;
}

// Message type maps
export interface ClientToServerMessageMap {
  [ClientToServerMessageType.CHAT]: ChatPayload;
  [ClientToServerMessageType.MOVE]: MovePayload;
}
```

**Rules:**
- No runtime logic (no functions that execute)
- No side effects
- Pure type definitions and constants

### `connection.ts` - Transport only

Handles WebSocket capture and low-level transport:

```typescript
let ws: WebSocket | null = null;

export function captureWebSocket(): void {
  // Hook into game's WebSocket
  const OriginalWebSocket = window.WebSocket;

  window.WebSocket = function(url: string, protocols?: string[]) {
    const socket = new OriginalWebSocket(url, protocols);
    ws = socket;

    // Intercept messages
    socket.addEventListener('message', handleIncomingMessage);

    return socket;
  } as unknown as typeof WebSocket;
}

export function send(message: ClientToServerMessage): void {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    console.warn('[WebSocket] Not connected');
    return;
  }

  // Run through middlewares
  const processed = runMiddlewares(message);
  if (!processed) return;  // Blocked by middleware

  ws.send(JSON.stringify(processed));
}
```

**Rules:**
- Transport/capture ONLY
- No domain logic (no knowledge of what messages mean)
- Exposes `send()` for internal use only

### `api.ts` - Public actions

The ONLY place for outgoing actions:

```typescript
import { send } from './connection';
import { ClientToServerMessageType } from './protocol';
import type { ChatPayload, MovePayload } from './protocol';

/**
 * Send a chat message
 */
export function chat(message: string, channel?: string): void {
  send({
    type: ClientToServerMessageType.CHAT,
    data: { message, channel },
  });
}

/**
 * Move to a position
 */
export function move(x: number, y: number): void {
  send({
    type: ClientToServerMessageType.MOVE,
    data: { x, y },
  });
}

/**
 * Plant a seed at the current position
 */
export function plantSeed(seedId: string): void {
  send({
    type: ClientToServerMessageType.PLANT_SEED,
    data: { seedId },
  });
}
```

**Rules:**
- Simple façade (users don't build payloads manually)
- Always use message type enums (no hardcoded strings)
- Document each action with JSDoc

### `middlewares/` - Outgoing interceptors

Middlewares can modify or block outgoing messages:

```typescript
// middlewares/chatFilter.ts
import { registerMiddleware } from './registry';
import { ClientToServerMessageType } from '../protocol';
import type { ClientToServerMessage } from '../protocol';

registerMiddleware((message: ClientToServerMessage) => {
  // Only process chat messages
  if (message.type !== ClientToServerMessageType.CHAT) {
    return message;  // Pass through unchanged
  }

  // Filter bad words (example)
  const data = message.data as ChatPayload;
  const filtered = filterBadWords(data.message);

  return {
    ...message,
    data: { ...data, message: filtered },
  };
});
```

**Registration pattern:**

```typescript
// middlewares/registry.ts
type Middleware = (message: ClientToServerMessage) => ClientToServerMessage | null;

const middlewares: Middleware[] = [];

export function registerMiddleware(middleware: Middleware): void {
  middlewares.push(middleware);
}

export function runMiddlewares(message: ClientToServerMessage): ClientToServerMessage | null {
  let result: ClientToServerMessage | null = message;

  for (const middleware of middlewares) {
    if (!result) return null;  // Blocked
    result = middleware(result);
  }

  return result;
}
```

### `handlers/` - Incoming handlers

Handlers process incoming messages from the server:

```typescript
// handlers/chatHandler.ts
import { registerHandler } from './registry';
import { ServerToClientMessageType } from '../protocol';
import type { ServerToClientMessage } from '../protocol';

registerHandler((message: ServerToClientMessage) => {
  if (message.type !== ServerToClientMessageType.CHAT_MESSAGE) {
    return;  // Not interested
  }

  // Process chat message
  const { sender, text } = message.data;
  console.log(`[Chat] ${sender}: ${text}`);

  // Dispatch event for other systems
  window.dispatchEvent(new CustomEvent('gemini:chat', {
    detail: { sender, text },
  }));
});
```

## Rules

### 1. No hardcoded message types

```typescript
// ❌ BAD - Hardcoded string
send({ type: 'chat', data: { message: 'Hello' } });

// ✅ GOOD - Use enum
send({ type: ClientToServerMessageType.CHAT, data: { message: 'Hello' } });
```

### 2. No direct ws.send() outside transport

```typescript
// ❌ BAD - Direct send outside connection.ts
ws.send(JSON.stringify({ type: 'chat', ... }));

// ✅ GOOD - Use api.ts
import { chat } from '../websocket/api';
chat('Hello');
```

### 3. Middlewares/handlers must not throw

```typescript
// ❌ BAD - Can crash the message pipeline
registerMiddleware((message) => {
  if (message.type === 'chat') {
    throw new Error('oops');  // Breaks all messaging!
  }
  return message;
});

// ✅ GOOD - Catch errors internally
registerMiddleware((message) => {
  try {
    if (message.type === 'chat') {
      // Risky operation
    }
    return message;
  } catch (error) {
    console.error('[Middleware] Error:', error);
    return message;  // Pass through on error
  }
});
```

### 4. No side effects on import

```typescript
// ❌ BAD - Registers on import
// middlewares/myMiddleware.ts
registerMiddleware((m) => m);  // Runs when file is imported!

// ✅ GOOD - Register in bootstrap
// middlewares/myMiddleware.ts
export function initMyMiddleware(): void {
  registerMiddleware((m) => m);
}

// bootstrap.ts
import { initMyMiddleware } from './middlewares/myMiddleware';
initMyMiddleware();  // Explicit registration
```

### 5. API should be façade-style

```typescript
// ❌ BAD - User builds payload
export function send(type: string, data: unknown): void {
  ws.send(JSON.stringify({ type, data }));
}
// Usage: send('chat', { message: 'hello', channel: 'global' });

// ✅ GOOD - Simple API
export function chat(message: string, channel?: string): void {
  send({
    type: ClientToServerMessageType.CHAT,
    data: { message, channel },
  });
}
// Usage: chat('hello', 'global');
```

## Common mistakes

### ❌ Forgetting to handle disconnection
```typescript
// ❌ BAD - No connection check
export function chat(message: string): void {
  ws.send(...);  // Crashes if not connected!
}

// ✅ GOOD - Check connection state
export function chat(message: string): void {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    console.warn('[Chat] Not connected');
    return;
  }
  ws.send(...);
}
```

### ❌ Middleware blocking everything
```typescript
// ❌ BAD - Returns null for everything
registerMiddleware((message) => {
  if (someCondition) {
    return null;  // Blocks this message
  }
  // Forgot to return message! Returns undefined = blocks all
});

// ✅ GOOD - Always return something
registerMiddleware((message) => {
  if (someCondition) {
    return null;  // Intentionally block
  }
  return message;  // Pass through
});
```

### ❌ Race condition on capture
```typescript
// ❌ BAD - Game might open WS before capture
bootstrap();  // Starts mod
captureWebSocket();  // Too late! Game already connected

// ✅ GOOD - Capture before anything else
captureWebSocket();  // Hook into WebSocket constructor
bootstrap();  // Now start mod
```
