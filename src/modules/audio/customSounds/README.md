# Custom Sounds Module

Manages a user-customizable library of notification sounds for the Gemini mod.

## Features

- ✅ Store up to **50 custom sounds**
- ✅ Support **external URLs** and **uploaded files** (base64 data URLs)
- ✅ Maximum file size: **250KB**
- ✅ Supported formats: MP3, WAV, OGG
- ✅ Built-in **default notification sound**
- ✅ Persistent storage via `GM_setValue`
- ✅ One-shot or loop playback modes

## Architecture

```
src/modules/audio/customSounds/
├── types.ts          # Types, limits, validation errors
├── storage.ts        # Load/save library from GM_* storage
├── defaults.ts       # Built-in default sounds
├── validation.ts     # Input validation (name, source, size)
├── index.ts          # Public API
└── README.md         # This file
```

## Usage

### Initialize (automatic)

The module is automatically initialized when `MGAudio.init()` is called.

```typescript
await MGAudio.init();
// CustomSounds is now ready
```

### Add a sound

```typescript
// Add from external URL
const sound1 = MGAudio.CustomSounds.add(
  'Notification',
  'https://example.com/notify.mp3',
  'url'
);

// Add from uploaded file (base64 data URL)
const sound2 = MGAudio.CustomSounds.add(
  'Alert',
  'data:audio/mp3;base64,//uQxAAA...',
  'upload'
);
```

### Get all sounds

```typescript
const sounds = MGAudio.CustomSounds.getAll();
// [{ id: '...', name: 'Default', source: '...', type: 'url', createdAt: 0 }, ...]
```

### Get sound by ID

```typescript
const sound = MGAudio.CustomSounds.getById('sound-id');
if (sound) {
  console.log(sound.name, sound.source);
}
```

### Update a sound

```typescript
// Update name
MGAudio.CustomSounds.update('sound-id', { name: 'New Name' });

// Update source
MGAudio.CustomSounds.update('sound-id', {
  source: 'https://new-url.com/audio.mp3'
});
```

### Remove a sound

```typescript
const removed = MGAudio.CustomSounds.remove('sound-id');
// true if removed, false if not found

// Note: Cannot remove default sounds (will throw error)
```

### Play a sound

```typescript
// Play one-shot (stops automatically)
await MGAudio.CustomSounds.play('sound-id', {
  volume: 0.5,
  loop: false
});

// Play in loop (continues until stopped)
await MGAudio.CustomSounds.play('sound-id', {
  volume: 0.7,
  loop: true
});
```

### Stop current sound

```typescript
MGAudio.CustomSounds.stop();
```

## Types

```typescript
interface CustomSound {
  id: string;              // UUID
  name: string;            // User-facing label
  source: string;          // URL or data URL
  type: 'url' | 'upload';  // Source type
  createdAt: number;       // Timestamp
}
```

## Limits

```typescript
const LIMITS = {
  MAX_SOUNDS: 50,             // Max custom sounds (excluding defaults)
  MAX_SIZE_BYTES: 250 * 1024, // 250KB max per file
  ALLOWED_TYPES: [
    'audio/mpeg',
    'audio/mp3',
    'audio/wav',
    'audio/ogg',
  ],
};
```

## Errors

```typescript
// Thrown when max sounds limit reached
class SoundLimitError extends CustomSoundError

// Thrown when file size exceeds 250KB
class SoundSizeError extends CustomSoundError

// Thrown when sound ID not found
class SoundNotFoundError extends CustomSoundError
```

## Storage

The library is stored in Tampermonkey storage under:

```
Key: gemini:module:audio:customSounds
Format: { sounds: CustomSound[], version: 1 }
```

## Default Sounds

The module includes a built-in default notification sound that:
- Is automatically added on first init
- Cannot be removed or updated
- Has ID: `'default-notification'`
- Name: `'Default'`

## Playback Behavior

The module uses `MGAudio.playCustom()` internally, which has **singleton behavior**:

- Only **one custom sound** can play at a time
- Playing a new sound **automatically stops** the previous one
- **One-shot mode**: Sound plays once and auto-cleanup
- **Loop mode**: Sound continues until `stop()` is called

## Example: ShopNotifier Integration

```typescript
// In shopNotifier feature
import { MGAudio } from '@/modules/audio';

async function playNotification(shopType: ShopType): Promise<void> {
  const config = loadConfig();
  const settings = config.notifications[shopType];

  if (!settings.enabled || !settings.soundId) return;

  try {
    await MGAudio.CustomSounds.play(settings.soundId, {
      volume: settings.volume,
      loop: settings.loop,
    });
  } catch (error) {
    console.error(`[ShopNotifier] Failed to play sound:`, error);
  }
}
```

## Notes

- **No UI included** in this module (UI should be in features)
- **No file upload helpers** (handle in UI layer)
- **Thread-safe**: All operations sync to storage immediately
- **Validation**: Automatic validation on add/update
- **Type-safe**: Full TypeScript support
