# websocket/ - Network Communication

## Overview

This module handles all WebSocket communication with the game server. It allows sending actions (plant, harvest, buy...) and intercepting incoming/outgoing messages.

## Structure

```
websocket/
├── connection.ts     # WebSocket capture and transport
├── api.ts            # Game actions (plantSeed, harvestCrop...)
├── protocol.ts       # Message types (ClientToServerMessageType)
├── bootstrap.ts      # Initialization
├── middlewares/      # Outgoing message interceptors
│   ├── base.ts       # Middleware system + registry
│   ├── garden.ts     # Garden middlewares
│   ├── inventory.ts  # Inventory middlewares
│   ├── pets.ts       # Pet middlewares
│   ├── session.ts    # Session middlewares
│   └── social.ts     # Chat/social middlewares
└── handlers/         # Incoming message handlers
    ├── base.ts       # Handler system + registry
    ├── serverMessages.ts  # Main handler
    └── closeCodes.ts      # WebSocket close codes
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      User Code                              │
│              WebSocketAPI.plantSeed(...)                    │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                       api.ts                                │
│     Transforms call into WebSocket message                  │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    middlewares/                             │
│     Can modify, log, or block the message                   │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    connection.ts                            │
│     Sends via RoomConnection or direct WebSocket            │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
                      [ SERVER ]
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     handlers/                               │
│     Dispatches incoming messages to handlers                │
└─────────────────────────────────────────────────────────────┘
```

## Using the API

### Available Actions

```typescript
import * as WS from "./websocket/api";

// Movement
WS.move(x, y);
WS.teleport(x, y);

// Garden
WS.plantSeed(seedId, x, y);
WS.waterPlant(plantId);
WS.harvestCrop(cropId);
WS.sellAllCrops();

// Purchases
WS.purchaseSeed(seedId);
WS.purchaseEgg(eggId);
WS.purchaseTool(toolId);
WS.purchaseDecor(decorId);

// Pets
WS.placePet(petId, x, y);
WS.feedPet(petId, foodItemId);
WS.namePet(petId, name);
WS.sellPet(petId);
WS.storePet(petId);

// Eggs
WS.plantEgg(eggId, x, y);
WS.hatchEgg(eggId);

// Decorations
WS.placeDecor(decorId, x, y);
WS.pickupDecor(decorInstanceId);

// Inventory
WS.moveInventoryItem(fromIndex, toIndex);
WS.toggleFavoriteItem(itemId, favorite);
WS.putItemInStorage(itemId);
WS.retrieveItemFromStorage(itemId);

// Social
WS.chat(message);
WS.emote(emoteType);
```

### Send Result

```typescript
type SendResult =
  | { ok: true }
  | { ok: false; reason: "no-ws" | "not-open" | "error"; error?: unknown };

const result = WS.plantSeed("carrot-seed-id", 10, 20);
if (!result.ok) {
  console.error("Failed:", result.reason);
}
```

## Middlewares (Outgoing Messages)

### Creating a Middleware

```typescript
// middlewares/myMiddleware.ts
import { middleware } from "./base";

// Simple middleware: log all PlantSeed
middleware("PlantSeed", (message, ctx) => {
  console.log("Planting:", message);
  // return undefined = let it pass
});

// Middleware that blocks
middleware("Chat", (message, ctx) => {
  const payload = message as { message?: string };
  if (payload.message?.includes("spam")) {
    return { kind: "drop" };  // Block the message
  }
});

// Middleware that modifies
middleware("PlayerPosition", (message, ctx) => {
  const pos = message as { x: number; y: number };
  return {
    kind: "replace",
    message: { ...pos, x: Math.round(pos.x), y: Math.round(pos.y) }
  };
});
```

### Middleware API

```typescript
// Basic signature
middleware(type: string, handler: TypedHandler): OutgoingMiddleware;

// With default control
middleware(type: string, defaultAllowSend: boolean, handler: TypedHandler): OutgoingMiddleware;

// TypedHandler
type TypedHandler = (message: unknown, ctx: MiddlewareCtx) =>
  | void           // Let it pass
  | boolean        // true = send, false = block
  | { kind: "drop" }
  | { kind: "replace"; message: unknown };

// Context
type MiddlewareCtx = {
  ws: WebSocket | null;
  pageWindow: any;
  debug: boolean;
};
```

### Auto-Registration

Middlewares are auto-registered when the file is imported. Add the import in `bootstrap.ts`:

```typescript
// bootstrap.ts
import "./middlewares/myMiddleware";
```

## Handlers (Incoming Messages)

### Creating a Handler

```typescript
// handlers/myHandler.ts
import { handle, handleAnyMessage } from "./base";

// Handler for a specific message type
handle("Welcome", (payload, ctx) => {
  console.log("Welcome!", payload.data);
});

// Handler for a WebSocket close code
handle(4700, (payload, ctx) => {
  console.log("Version mismatch:", payload.code, payload.reason);
});

// Catch-all handler (all messages)
handleAnyMessage((payload, ctx) => {
  if (ctx.debug) {
    console.log("Message received:", payload.type, payload.data);
  }
});
```

### Payload Types

```typescript
// Normal message
type IncomingMessagePayload = {
  kind: "message";
  raw: any;           // Raw data
  data: any;          // Parsed JSON
  type?: string;      // Extracted type
};

// WebSocket close
type IncomingClosePayload = {
  kind: "close";
  code: number;
  reason: string;
  wasClean: boolean;
  event: CloseEvent;
};

// Connection opened
type IncomingOpenPayload = {
  kind: "open";
  event: Event;
};

// Error
type IncomingErrorPayload = {
  kind: "error";
  event: Event;
};
```

### Handler API

```typescript
// By message type
handle(type: string, fn: IncomingHandlerFn<IncomingMessagePayload>);

// By close code
handle(code: number, fn: IncomingHandlerFn<IncomingClosePayload>);

// Catch-all
handleAnyMessage(fn);
handleAnyClose(fn);
handleOpen(fn);
handleError(fn);
```

## Adding a New API Action

### 1. Add the message type

```typescript
// protocol.ts
export const ClientToServerMessageType = {
  // ... existing
  MyNewAction: "MyNewAction",
} as const;
```

### 2. Create the API function

```typescript
// api.ts
export function myNewAction(param1: string, param2: number, win: any = pageWindow): SendResult {
  return send(T.MyNewAction, { param1, param2 }, win);
}
```

### 3. Expose in public API (optional)

```typescript
// src/api/index.ts
WebSocket: {
  // ... existing
  myNewAction: WebSocketAPI.myNewAction,
}
```

## Connection (Transport Layer)

### WebSocket Capture

The module intercepts WebSocket creation to attach handlers:

```typescript
installWebSocketCapture(pageWindow, { debug: true });
```

### Getting the Best WebSocket

```typescript
import { getBestWebSocket } from "./connection";

const { ws, source } = getBestWebSocket();
// source: "captured" | "roomConnection" | null
```

### Sending Directly

```typescript
import { sendToServer, sendType } from "./connection";

// Complete object
sendToServer({ type: "MyType", data: "..." });

// Separate type + payload
sendType("MyType", { data: "..." });
```

## Best Practices

1. **Use the high-level API** - Prefer `api.ts` over `sendToServer` directly
2. **Keep middlewares lightweight** - Avoid heavy operations that would block sending
3. **Non-blocking handlers** - Don't return `true` unless you want to stop propagation
4. **Clean up handlers** - If you attach manually, keep the cleanup function

## Debug

Enable debug mode to see all messages:

```typescript
patchOutgoingMessages({ pageWindow, debug: true });
attachIncomingHandlers(ws, handlers, { debug: true });
```

## See Also

- [../api/README.md](../api/README.md) - Public API exposing WebSocket
- [../atoms/README.md](../atoms/README.md) - State updated by handlers
