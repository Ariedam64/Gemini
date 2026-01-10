#!/bin/bash
# Download Magic Garden Pet Sprites
# Run this with: bash download-pet-sprites.sh

SPRITES_URL="https://gg-preview-pr-2329-router.magiccircle.workers.dev/magicgarden/bundles/sprites-0.png"
SPRITES_JSON="https://gg-preview-pr-2329-router.magiccircle.workers.dev/magicgarden/bundles/sprites-0.json"
OUTPUT_DIR="./pet-sprites"

mkdir -p "$OUTPUT_DIR"

echo "Downloading sprites..."
curl -o "$OUTPUT_DIR/sprites-0.png" "$SPRITES_URL"
curl -o "$OUTPUT_DIR/sprites-0.json" "$SPRITES_JSON"

echo "Pet sprites downloaded to $OUTPUT_DIR"
echo "Use the sprites-0.json file to extract individual pet sprites using the frame data"
