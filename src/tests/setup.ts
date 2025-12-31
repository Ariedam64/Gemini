import { vi } from 'vitest';

// Mock Game Globals
(globalThis as any).window = {
    addEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
};

(globalThis as any).G_Players = vi.fn(() => ({
    get: () => ({
        all: [],
        myPlayer: { journal: { produce: [], pets: [] } }
    })
}));

(globalThis as any).MGData = {
    get: vi.fn((key: string) => {
        if (key === 'plants') return {};
        if (key === 'mutations') return {};
        return null;
    })
};

(globalThis as any).Gemini = {
    Store: {
        select: vi.fn(),
        set: vi.fn(),
    },
    WebSocket: {
        send: vi.fn(),
    }
};
