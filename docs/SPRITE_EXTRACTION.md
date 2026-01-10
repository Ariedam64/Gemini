# Simple Sprite Extraction Instructions

## Method 1: Direct Canvas Export (Simplest!)

Instead of extracting sprites programmatically, let's do it the easy way:

1. Open Magic Garden with Gemini extension loaded
2. Press F12 → Console tab
3. Copy and paste this command:

```javascript
(async()=>{
  // Wait for game to load
  const canvas = document.querySelector('canvas');
  if (!canvas) { console.error('Game not loaded yet!'); return; }
  
  // Simple approach: just grab the pet images from the page
  const pets = ['Squirrel','Dragonfly','Goat','Pig','Turkey','Chicken','Peacock'];
  const sprites = {};
  
  console.log('Method 1: Looking for pet images on page...');
  const images = document.querySelectorAll('img[alt*="pet"], img[src*="pet"]');
  console.log(`Found ${images.length} pet-related images`);
  
  // If that doesn't work, let's try accessing the sprite system directly
  if (window.Gemini?.sprite) {
    console.log('Method 2: Using Gemini sprite system...');
    for (const pet of pets) {
      try {
        const sprite = await window.Gemini.sprite.get('pet', pet);
        if (sprite) {
          sprites[pet] = sprite;
          console.log(`✓ ${pet}`);
        }
      } catch(e) { console.log(`✗ ${pet}`, e); }
    }
  }
  
  console.log('\n📋 Copy this sprite data:');
  console.log(JSON.stringify(sprites, null, 2));
  return sprites;
})();
```

## Method 2: Manual Screenshot (Most Reliable)

The easiest guaranteed method:

1. Open Gemini extension's sprite viewer (if it has one)
2. OR find pets in your inventory
3. Right-click each pet → "Inspect"
4. Find the image/canvas element
5. Right-click → "Copy image" or "Save as PNG"
6. Save each as: `squirrel.png`, `dragonfly.png`, etc.

Then use an online base64 encoder to convert them!

## Method 3: Check Gemini's Bundled Assets

Your extension likely already has the sprites! Check:
- `Feeder-Extension/Gemini-main/Gemini-main/assets/`
- `Feeder-Extension/Gemini-main/Gemini-main/src/assets/`
- Look for a `sprites/` or `pets/` folder

If you find them, just copy the PNG files to the `docs/` folder and use relative paths!
