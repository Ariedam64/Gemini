// Extract Pet Sprites from Gemini Extension
// Run with: node extract-sprites.js
// This will create base64-encoded sprites that can be embedded in the HTML

const fs = require('fs');
const path = require('path');

// Instructions:
// 1. Open the Gemini extension in your browser
// 2. Open the browser console
// 3. Run this code in the console to extract sprites as base64:

const extractionScript = `
(async () => {
  // Import MGSprite from your extension
  const { MGSprite } = await import(chrome.runtime.getURL('modules/sprite/index.js'));
  
  // Initialize if needed
  if (!MGSprite.isReady()) {
    await MGSprite.init();
  }
  
  const pets = ['Squirrel', 'Dragonfly', 'Goat', 'Pig', 'Turkey', 'Chicken', 'Peacock'];
  const sprites = {};
  
  for (const pet of pets) {
    try {
      // Get the canvas for this pet
      const canvas = MGSprite.toCanvas('pet', pet, { scale: 2 });
      
      // Convert to base64
      const base64 = canvas.toDataURL('image/png');
      sprites[pet] = base64;
      
      console.log(\`Extracted \${pet}\`);
    } catch (err) {
      console.error(\`Failed to extract \${pet}:\`, err);
    }
  }
  
  // Output as JavaScript object
  console.log('Copy this into your HTML:');
  console.log('const SPRITE_DATA = ' + JSON.stringify(sprites, null, 2) + ';');
  
  return sprites;
})();
`;

console.log('='.repeat(80));
console.log('PET SPRITE EXTRACTION GUIDE');
console.log('='.repeat(80));
console.log('');
console.log('INSTRUCTIONS:');
console.log('1. Open Magic Garden in your browser WITH the Gemini extension loaded');
console.log('2. Open the browser Developer Console (F12)');
console.log('3. Copy and paste the following code into the console:');
console.log('');
console.log('-'.repeat(80));
console.log(extractionScript);
console.log('-'.repeat(80));
console.log('');
console.log('4. Copy the output "SPRITE_DATA" object');
console.log('5. Paste it into the HTML file to replace the SPRITE_MAPPINGS');
console.log('');
console.log('This will create base64-encoded sprites that work offline!');
console.log('='.repeat(80));

// Save the extraction script to a file
fs.writeFileSync(
    path.join(__dirname, 'extract-sprites-console.js'),
    extractionScript,
    'utf8'
);

console.log('');
console.log('Extraction script saved to: extract-sprites-console.js');
console.log('You can also just copy it from that file!');
