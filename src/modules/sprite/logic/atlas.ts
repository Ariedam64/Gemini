// src/modules/sprite/atlas.ts
// Atlas loading and texture building

import type { PixiTexture, PixiRectangle, PixiConstructors, AtlasJson, AtlasFrame } from "../types";
import { getJSON, getBlob, blobToImage } from "../../utils/network";
import { joinPath, relPath } from "../../utils/path";
import { MGManifest } from "../../manifest";

// ─────────────────────────────────────────────────────────────────────────────
// Atlas Validation
// ─────────────────────────────────────────────────────────────────────────────

export function isAtlas(json: any): json is AtlasJson {
  return (
    json &&
    typeof json === "object" &&
    json.frames &&
    json.meta &&
    typeof json.meta.image === "string"
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Texture Construction
// ─────────────────────────────────────────────────────────────────────────────

function mkRect(
  Rectangle: new (x: number, y: number, w: number, h: number) => PixiRectangle,
  x: number,
  y: number,
  w: number,
  h: number
): PixiRectangle {
  return new Rectangle(x, y, w, h);
}

function mkSubTex(
  Texture: any,
  baseTex: PixiTexture,
  frame: PixiRectangle,
  orig: PixiRectangle,
  trim: PixiRectangle | null,
  rotate: number,
  anchor: { x: number; y: number } | null
): PixiTexture {
  let tex: PixiTexture;

  try {
    tex = new Texture({
      source: baseTex.source,
      frame,
      orig,
      trim: trim || undefined,
      rotate: rotate || 0,
    });
  } catch {
    tex = new Texture(baseTex.baseTexture || baseTex, frame, orig, trim || undefined, rotate || 0);
  }

  if (anchor) {
    if (tex.defaultAnchor?.set) {
      try {
        tex.defaultAnchor.set(anchor.x, anchor.y);
      } catch {}
    } else if (tex.defaultAnchor) {
      tex.defaultAnchor.x = anchor.x;
      tex.defaultAnchor.y = anchor.y;
    } else {
      tex.defaultAnchor = { x: anchor.x, y: anchor.y };
    }
  }

  try {
    tex.updateUvs?.();
  } catch {}

  return tex;
}

// ─────────────────────────────────────────────────────────────────────────────
// Build Atlas Textures
// ─────────────────────────────────────────────────────────────────────────────

export function buildAtlasTextures(
  atlasJson: AtlasJson,
  baseTex: PixiTexture,
  outTexMap: Map<string, PixiTexture>,
  ctors: PixiConstructors
): void {
  const { Texture, Rectangle } = ctors;

  for (const [key, fd] of Object.entries(atlasJson.frames)) {
    const fr = fd.frame;
    const rotated = !!fd.rotated;
    const rot = rotated ? 2 : 0;
    const w = rotated ? fr.h : fr.w;
    const h = rotated ? fr.w : fr.h;

    const frame = mkRect(Rectangle, fr.x, fr.y, w, h);
    const ss = fd.sourceSize || { w: fr.w, h: fr.h };
    const orig = mkRect(Rectangle, 0, 0, ss.w, ss.h);

    let trim: PixiRectangle | null = null;
    if (fd.trimmed && fd.spriteSourceSize) {
      const s = fd.spriteSourceSize;
      trim = mkRect(Rectangle, s.x, s.y, s.w, s.h);
    }

    outTexMap.set(key, mkSubTex(Texture, baseTex, frame, orig, trim, rot, fd.anchor || null));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Build Animations from Atlas
// ─────────────────────────────────────────────────────────────────────────────

export function buildAtlasAnimations(
  atlasJson: AtlasJson,
  textures: Map<string, PixiTexture>,
  outAnimMap: Map<string, PixiTexture[]>
): void {
  if (!atlasJson.animations || typeof atlasJson.animations !== "object") return;

  for (const [animKey, frames] of Object.entries(atlasJson.animations)) {
    if (!Array.isArray(frames)) continue;

    const texFrames = (frames as string[])
      .map((k) => textures.get(k))
      .filter(Boolean) as PixiTexture[];

    if (texFrames.length >= 2) {
      outAnimMap.set(animKey, texFrames);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Category Indexing
// ─────────────────────────────────────────────────────────────────────────────

export function buildCategoryIndex(
  atlasJson: AtlasJson,
  categoryIndex: Map<string, Set<string>>
): void {
  const addCategory = (cat: string, id: string) => {
    const c = String(cat || "").trim();
    const i = String(id || "").trim();
    if (!c || !i) return;
    if (!categoryIndex.has(c)) categoryIndex.set(c, new Set());
    categoryIndex.get(c)!.add(i);
  };

  for (const key of Object.keys(atlasJson.frames || {})) {
    const m = /^sprite\/([^/]+)\/(.+)$/.exec(key);
    if (m) addCategory(m[1], m[2]);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Load All Atlases from Manifest
// ─────────────────────────────────────────────────────────────────────────────

export interface LoadAtlasesResult {
  textures: Map<string, PixiTexture>;
  animations: Map<string, PixiTexture[]>;
  categoryIndex: Map<string, Set<string>>;
}

export async function loadAtlasesFromManifest(
  baseUrl: string,
  ctors: PixiConstructors
): Promise<LoadAtlasesResult> {
  const manifest = await MGManifest.load({ baseUrl });
  const bundle = MGManifest.getBundle(manifest, "default");
  if (!bundle) throw new Error("No default bundle in manifest");

  const jsonPaths = MGManifest.listJsonFromBundle(bundle);
  const seen = new Set<string>();

  const textures = new Map<string, PixiTexture>();
  const animations = new Map<string, PixiTexture[]>();
  const categoryIndex = new Map<string, Set<string>>();

  async function loadAtlasJson(path: string): Promise<void> {
    if (seen.has(path)) return;
    seen.add(path);

    const atlas = await getJSON<any>(joinPath(baseUrl, path));
    if (!isAtlas(atlas)) return;

    const rels = atlas.meta?.related_multi_packs;
    if (Array.isArray(rels)) {
      for (const rel of rels) {
        await loadAtlasJson(relPath(path, rel));
      }
    }

    const imgPath = relPath(path, atlas.meta.image);
    const img = await blobToImage(await getBlob(joinPath(baseUrl, imgPath)));
    const baseTex = ctors.Texture.from(img);

    buildAtlasTextures(atlas, baseTex, textures, ctors);
    buildAtlasAnimations(atlas, textures, animations);
    buildCategoryIndex(atlas, categoryIndex);
  }

  for (const p of jsonPaths) {
    await loadAtlasJson(p);
  }

  return { textures, animations, categoryIndex };
}
