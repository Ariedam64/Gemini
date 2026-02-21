import { BaseSection } from "../core/Section";
import type { SectionsDeps } from "../core/Types";
import { Card } from "../../components/Card/Card";
import { Label } from "../../components/Label/Label";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { Slider } from "../../components/Slider/Slider";
import { Switch } from "../../components/Switch/Switch";
import { element } from "../../styles/helpers";
import { injectStyleOnce } from "../../styles/inject";
import { skinChangerCss } from "./styles.css";
import { MGData } from "../../../modules/data";
import { MGSprite } from "../../../modules/sprite";
import { MGSkinChanger } from "../../../features/skinChanger";

function readFileFromPicker(accept: string): Promise<File> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.onchange = () => {
      const f = input.files?.[0];
      if (!f) reject(new Error("No file selected"));
      else resolve(f);
    };
    input.click();
  });
}

type SpriteEntry = { spriteId: string; label: string };

function collectSpriteIdsFromMGData(): Record<string, SpriteEntry[]> {
  const out: Record<string, SpriteEntry[]> = {};

  const add = (group: string, spriteId: unknown, label: string) => {
    const id = String(spriteId || "").trim();
    if (!id.startsWith("sprite/")) return;
    out[group] ??= [];
    out[group].push({ spriteId: id, label });
  };

  const pets = MGData.get("pets") as Record<string, any> | null;
  if (pets) {
    for (const [id, entry] of Object.entries(pets)) {
      add("Pets", (entry as any)?.spriteId, String((entry as any)?.name || id));
    }
  }

  const items = MGData.get("items") as Record<string, any> | null;
  if (items) {
    for (const [id, entry] of Object.entries(items)) {
      add("Items", (entry as any)?.spriteId, String((entry as any)?.name || id));
    }
  }

  const decor = MGData.get("decor") as Record<string, any> | null;
  if (decor) {
    for (const [id, entry] of Object.entries(decor)) {
      add("Decor", (entry as any)?.spriteId, String((entry as any)?.name || id));
    }
  }

  const eggs = MGData.get("eggs") as Record<string, any> | null;
  if (eggs) {
    for (const [id, entry] of Object.entries(eggs)) {
      add("Eggs", (entry as any)?.spriteId, String((entry as any)?.name || id));
    }
  }

  const mutations = MGData.get("mutations") as Record<string, any> | null;
  if (mutations) {
    for (const [id, entry] of Object.entries(mutations)) {
      add("Mutations", (entry as any)?.spriteId, String((entry as any)?.name || id));
      add("Mutation Overlays", (entry as any)?.overlaySpriteId, `${String((entry as any)?.name || id)} (Overlay)`);
    }
  }

  const plants = MGData.get("plants") as Record<string, any> | null;
  if (plants) {
    for (const [id, entry] of Object.entries(plants)) {
      const e = entry as any;
      add("Plants (Seed)", e?.seed?.spriteId, `${String(e?.seed?.name || id)} (Seed)`);
      add("Plants (Plant)", e?.plant?.spriteId, `${String(e?.plant?.name || id)} (Plant)`);
      add("Plants (Crop)", e?.crop?.spriteId, `${String(e?.crop?.name || id)} (Crop)`);
    }
  }

  for (const k of Object.keys(out)) {
    const uniq = new Map<string, SpriteEntry>();
    for (const e of out[k]!) uniq.set(e.spriteId, e);
    out[k] = [...uniq.values()].sort((a, b) => a.label.localeCompare(b.label));
  }

  return out;
}

function collectAllSpriteIdsFromMGSprite(): Record<string, SpriteEntry[]> {
  const out: Record<string, SpriteEntry[]> = {};
  try {
    if (!MGSprite.isReady()) return out;
    const cats = MGSprite.getCategories();
    for (const cat of cats) {
      const ids = MGSprite.getCategoryId(cat);
      const group = `Sprites: ${cat}`;
      out[group] = ids
        .map((id) => ({
          spriteId: MGSprite.getIdPath(cat, id),
          label: id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
    }
  } catch {
    // ignore
  }
  return out;
}

function collectLoadedSpriteIdsFromMGSprite(): Record<string, SpriteEntry[]> {
  const out: Record<string, SpriteEntry[]> = {};
  try {
    if (!MGSprite.isReady()) return out;
    const keys: string[] = (MGSprite as any)?._internal?.listLoadedKeys?.() ?? [];
    for (const k of keys) {
      const m = /^sprite\/([^/]+)\/(.+)$/.exec(String(k));
      if (!m) continue;
      const cat = m[1];
      const id = m[2];
      const group = `Loaded: ${cat}`;
      out[group] ??= [];
      out[group].push({ spriteId: k, label: id });
    }
    for (const g of Object.keys(out)) {
      out[g] = out[g]!.sort((a, b) => a.label.localeCompare(b.label));
    }
  } catch {}
  return out;
}

function collectAllKeysFromMGSprite(): string[] {
  const keys: string[] = [];
  try {
    if (!MGSprite.isReady()) return [];
    const cats = MGSprite.getCategories();
    for (const cat of cats) {
      try {
        const ids = MGSprite.getCategoryId(cat);
        for (const id of ids) {
          try {
            keys.push(MGSprite.getIdPath(cat, id));
          } catch {}
        }
      } catch {}
    }
  } catch {}
  return [...new Set(keys)];
}

function makeCategoryCardKey(name: string): string {
  return `skinChanger:category:${name}`;
}

export class SkinChangerSection extends BaseSection {
  constructor(private deps: SectionsDeps) {
    super({ id: "tab-skin-changer", label: "Skins" });
  }

  protected async build(container: HTMLElement): Promise<void> {
    const shadow = container.getRootNode() as ShadowRoot;
    injectStyleOnce(shadow, skinChangerCss, "skin-changer-styles");

    // Ensure the sprite catalog is ready so we can list ALL categories/ids.
    try {
      if (!MGSprite.isReady()) await MGSprite.init();
    } catch {}

    const root = element("div", { className: "skin-grid" }) as HTMLDivElement;
    container.appendChild(root);
    this.buildUI(root);
  }

  private rerender(root: HTMLElement): void {
    root.replaceChildren();
    this.buildUI(root);
  }

  private buildUI(root: HTMLElement): void {
    const enabledRow = element("div", { className: "row" }) as HTMLDivElement;
    const enabledLeft = element("div", { className: "row-main" }) as HTMLDivElement;
    const enabledTitle = element("div", { className: "row-title" }, "Enable Skin Changer");
    const enabledSub = element(
      "div",
      { className: "row-sub" },
      `Overrides sprite textures client-side (other players do not see it). Hook: ${
        MGSkinChanger.isHookInstalled() ? "installed" : "not installed yet"
      }.`
    );
    enabledLeft.append(enabledTitle, enabledSub);

    const controls = element("div", { style: "display:flex; gap:8px; align-items:center; justify-content:flex-end;" }) as HTMLDivElement;
    const enabledSwitch = Switch({
      checked: MGSkinChanger.isEnabled(),
      onChange: (v) => {
        MGSkinChanger.setEnabled(v);
        this.rerender(root);
      },
    });

    const clearAllBtn = Button({
      label: "Clear All",
      variant: "danger",
      onClick: () => {
        MGSkinChanger.clearAllSkins();
        if (this.container) this.render(this.container);
      },
    });

    controls.append(clearAllBtn, enabledSwitch.root);

    enabledRow.append(enabledLeft, controls);

    const hint = element(
      "div",
      { className: "hint" },
      "Tip: pick a pet skin from the list, upload an image, and it should refresh immediately. If a pet has mutations, the game may use baked textures; this feature forces cache refreshes to update those."
    );

    const captureBody = element("div", { className: "capture-controls" }) as HTMLDivElement;
    const captureGrid = element("div", { className: "capture-grid" }) as HTMLDivElement;
    captureBody.appendChild(captureGrid);

    let filterValue = "";

    const filterInput = Input({
      label: "Filter keys",
      placeholder: "sprite/…",
      value: "",
      onChange: (v) => {
        filterValue = String(v || "");
        renderCaptureList();
      },
    });

    const capControlsRow = element("div", { className: "capture-row" }) as HTMLDivElement;
    const capControlsLeft = element("div", { style: "display:grid; gap:8px; min-width:240px; flex:1;" }) as HTMLDivElement;
    capControlsLeft.appendChild(filterInput.root);

    const capActions = element("div", { className: "capture-actions" }) as HTMLDivElement;
    const capSwitch = Switch({
      checked: MGSkinChanger.isCaptureEnabled(),
      onChange: async (v) => {
        if (v) {
          try {
            if (!MGSprite.isReady()) await MGSprite.init();
          } catch {}
          MGSkinChanger.installCaptureHook();
        }

        MGSkinChanger.setCaptureEnabled(v);
        renderCaptureList();
      },
    });

    const capClearBtn = Button({
      label: "Clear captured",
      variant: "default",
      onClick: () => {
        MGSkinChanger.clearCapturedKeys();
        renderCaptureList();
      },
    });

    capActions.append(element("div", { style: "display:flex; gap:8px; align-items:center;" }, element("span", {}, "Capture"), capSwitch.root));
    capActions.appendChild(capClearBtn);

    let strictOnlyObserved = false;
    const strictSwitch = Switch({
      checked: false,
      onChange: (v) => {
        strictOnlyObserved = !!v;
        renderCaptureList();
      },
    });
    capActions.appendChild(
      element("div", { style: "display:flex; gap:8px; align-items:center;" }, element("span", {}, "Strict: only observed"), strictSwitch.root)
    );
    capControlsRow.append(capControlsLeft, capActions);

    const unsubCapture = MGSkinChanger.subscribeCapturedKeys(() => {
      // Avoid rerender storm: only update while capture is enabled.
      if (MGSkinChanger.isCaptureEnabled()) renderCaptureList();
    });
    this.addCleanup(unsubCapture);

    const self = this;

    function renderCaptureList() {
      const q = filterValue.trim().toLowerCase();
      const captured = MGSkinChanger.listCapturedKeys();
      const catalogKeys = collectAllKeysFromMGSprite();
      const catalogSet = new Set(catalogKeys);

      const keys = strictOnlyObserved
        ? captured.filter((e) => catalogSet.has(e.key))
        : captured;

      captureGrid.replaceChildren();

      const limited = keys
        .filter((e) => !q || e.key.toLowerCase().includes(q))
        .slice(0, 120);

      captureGrid.appendChild(
        element(
          "div",
          { className: "hint" },
          `Captured ${captured.length} unique keys. Showing ${strictOnlyObserved ? "only observed atlas keys" : "all captured keys"}.`
        )
      );

      for (const e of limited) {
        const preview = element("div", { className: "cap-preview" }) as HTMLDivElement;
        let canPreview = false;
        try {
          if (String(e.key).startsWith("sprite/")) {
            const canvas = MGSprite.toCanvas(e.key, { scale: 0.9, pad: 14, boundsMode: "base" });
            preview.appendChild(canvas);
            canPreview = true;
          }
        } catch {}

        if (!canPreview) {
          preview.appendChild(element("div", { style: "font-size:12px; opacity:.7;" }, "n/a"));
        }

        const meta = element("div", { className: "cap-meta" }) as HTMLDivElement;
        meta.appendChild(element("div", { className: "cap-key", title: e.key }, e.key));
        meta.appendChild(
          element(
            "div",
            { className: "cap-sub" },
            element("span", {}, `count: ${e.count}`),
            element("span", {}, `last: ${new Date(e.lastSeenAt).toLocaleTimeString()}`)
          )
        );

        const addBtn = Button({
          label: "Create skin…",
          variant: "primary",
          onClick: async () => {
            try {
              const file = await readFileFromPicker("image/*");
              await MGSkinChanger.addOrReplaceSkin(e.key, file);
              if (self.container) self.render(self.container);
            } catch (err) {
              console.warn("[SkinChangerSection] Create skin from key failed", err);
            }
          },
        });

        const card = Card({ padding: "sm", variant: "glass", className: "cap-card" }, preview, meta, addBtn);
        captureGrid.appendChild(card);
      }
    }

    const debugCard = Card(
      {
        title: "Discover Texture Keys",
        subtitle: "Capture Texture.from(\"…\") calls and create skins from them.",
        padding: "lg",
        variant: "soft",
        expandable: true,
        defaultExpanded: false,
        stateKey: "skinChanger:discover",
      },
      capControlsRow,
      captureBody
    );

    // Initial render
    renderCaptureList();

    root.appendChild(Card({ title: "Skin Changer", padding: "lg" }, enabledRow, hint));
    root.appendChild(debugCard);

    const listCardBody = element("div", { className: "skin-grid" }) as HTMLDivElement;
    root.appendChild(Card({ title: "Sprite Catalog", padding: "lg" }, listCardBody));
    this.renderList(listCardBody);
  }

  private renderList(container: HTMLElement): void {
    // Ensure we don't stack filter cards on rerender
    container.replaceChildren();

    const current = MGSkinChanger.listSkins();
    const currentMap = new Map(current.map((s) => [s.spriteId, s] as const));

    // Full catalog as default: list ALL MGSprite atlas categories/ids.
    // Strict mode lists only textures/animations currently loaded this session.
    const allGroups = collectAllSpriteIdsFromMGSprite();

    // Persisted strict toggle to avoid losing state on rerender
    const strictStateKey = "skinChanger:catalogFilters:strict";
    let strictCatalogOnly = localStorage.getItem(strictStateKey) === "1";
    const strictCatalogSwitch = Switch({
      checked: strictCatalogOnly,
      onChange: (v) => {
        strictCatalogOnly = !!v;
        try {
          localStorage.setItem(strictStateKey, strictCatalogOnly ? "1" : "0");
        } catch {}
        if (this.container) this.render(this.container);
      },
    });

    container.appendChild(
      Card(
        {
          title: "Catalog Filters",
          padding: "md",
          variant: "soft",
          expandable: true,
          defaultExpanded: false,
          stateKey: "skinChanger:catalogFilters",
        },
        element(
          "div",
          { style: "display:flex; gap:10px; align-items:center; justify-content:space-between; flex-wrap:wrap;" },
          element("div", {}, "Strict: only changeable in this session"),
          strictCatalogSwitch.root
        ),
        element(
          "div",
          { className: "hint" },
          "When enabled, only shows sprite IDs that are currently loaded this session (textures + animations)."
        )
      )
    );

    const groups = strictCatalogOnly ? collectLoadedSpriteIdsFromMGSprite() : allGroups;

    const groupKeys = Object.keys(groups).filter((k) => (groups[k]?.length ?? 0) > 0);

    if (!groupKeys.length) {
      container.appendChild(
        element(
          "div",
          { className: "hint" },
          "Sprite catalog not available yet. Wait for MGSprite to finish initializing."
        )
      );
      return;
    }

    for (const group of groupKeys.sort((a, b) => a.localeCompare(b))) {
      const grid = element("div", { className: "cat-grid" }) as HTMLDivElement;

      const card = Card(
        {
          title: group,
          padding: "lg",
          variant: "soft",
          expandable: true,
          defaultExpanded: false,
          stateKey: makeCategoryCardKey(group),
        },
        grid
      );

      for (const entry of groups[group]!) {
        const spriteId = entry.spriteId;
        const currentSkin = currentMap.get(spriteId) || null;

        const preview = element("div", { className: "skin-preview" }) as HTMLDivElement;
        try {
          const canvas = MGSprite.toCanvas(spriteId, { scale: 0.9, pad: 14, boundsMode: "base" });
          preview.appendChild(canvas);
        } catch {}

        const title = element("div", { className: "skin-title" }, entry.label);
        const sub = element("div", { className: "skin-sub" }, spriteId);

        const status = Label({
          text: currentSkin ? `Custom (x${currentSkin.scale.toFixed(2)})` : "Default",
          tone: currentSkin ? "info" : "muted",
          size: "sm",
        });

        const scaleSlider = Slider({
          min: 0.25,
          max: 4,
          step: 0.05,
          value: currentSkin?.scale ?? 1,
          label: "Scale",
          onChange: (v) => {
            if (!currentSkin) return;
            MGSkinChanger.setSkinScale(spriteId, v);
            if (this.container) this.render(this.container);
          },
        });

        const uploadBtn = Button({
          label: "Upload",
          variant: "primary",
          onClick: async () => {
            try {
              const file = await readFileFromPicker("image/*");
              await MGSkinChanger.addOrReplaceSkin(spriteId, file);
              if (this.container) this.render(this.container);
            } catch (err) {
              console.warn("[SkinChangerSection] Upload failed", err);
            }
          },
        });

        const clearBtn = Button({
          label: "Clear",
          variant: "default",
          onClick: () => {
            MGSkinChanger.removeSkin(spriteId);
            if (this.container) this.render(this.container);
          },
        });

        const actions = element("div", { className: "skin-actions" }) as HTMLDivElement;
        actions.append(uploadBtn, clearBtn);

        const controls = element("div", { className: "skin-controls" }) as HTMLDivElement;
        controls.append(status.root, scaleSlider.root, actions);

        const right = element("div", { className: "skin-right" }) as HTMLDivElement;
        right.append(title, sub, controls);

        const skinCard = Card(
          { padding: "md", variant: "glass", className: "skin-card" },
          preview,
          right
        );

        grid.appendChild(skinCard);
      }

      container.appendChild(card);
    }
  }
}
