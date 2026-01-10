// Copy and paste this code into the browser console while on Magic Garden
// with the Gemini extension loaded

(async () => {
    // Import MGSprite from your extension
    const { MGSprite } = await import(chrome.runtime.getURL('src/modules/sprite/index.js'));

    // Initialize if needed
    if (!MGSprite.isReady()) {
        console.log('Initializing MGSprite...');
        await MGSprite.init();
    }

    const pets = ['Squirrel', 'Dragonfly', 'Goat', 'Pig', 'Turkey', 'Chicken', 'Peacock'];
    const sprites = {};

    console.log('Extracting pet sprites...');

    for (const pet of pets) {
        try {
            // Get the canvas for this pet
            const canvas = MGSprite.toCanvas('pet', pet, { scale: 2 });

            // Convert to base64
            const base64 = canvas.toDataURL('image/png');
            sprites[pet] = base64;

            console.log(`✓ Extracted ${pet}`);
        } catch (err) {
            console.error(`✗ Failed to extract ${pet}:`, err);
        }
    }

    // Output as JavaScript object
    console.log('\n' + '='.repeat(80));
    console.log('COPY THE FOLLOWING CODE INTO YOUR HTML:');
    console.log('='.repeat(80) + '\n');
    console.log('const SPRITE_DATA = ' + JSON.stringify(sprites, null, 2) + ';');
    console.log('\n' + '='.repeat(80));
    console.log('Replace the sprite URLs in the HTML with SPRITE_DATA[petName]');
    console.log('='.repeat(80));

    return sprites;
})();
