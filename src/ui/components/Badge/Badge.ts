import { el } from "../../../core/dom";

export type BadgeType = "neutral" | "info" | "success" | "warning" | "danger";
export type BadgeTone = "soft" | "outline" | "solid";
export type BadgeVariant = "default" | "rarity";

export type BadgeOptions = {
  id?: string;
  label?: string;
  type?: BadgeType;
  tone?: BadgeTone;
  border?: string;
  withBorder?: boolean;
  size?: "sm" | "md" | "lg";
  pill?: boolean;
  onClick?: (ev: MouseEvent) => void;

  // Rarity mode
  variant?: BadgeVariant;
  rarity?: string | null; // "Common" | "Uncommon" | "Rare" | ... | "Unknown"
};

export type BadgeHandle = {
  root: HTMLSpanElement;
  setLabel: (t: string) => void;
  setType: (t: BadgeType, tone?: BadgeTone) => void;
  setBorder: (cssBorder?: string) => void;
  setWithBorder: (on: boolean) => void;
  setRarity: (r: string | null | undefined) => void;
};

type RarityKey =
  | "Common" | "Uncommon" | "Rare" | "Legendary"
  | "Mythical" | "Divine" | "Celestial"
  | "Unknown";

function normalizeRarity(raw: string | null | undefined): RarityKey | null {
  const k = String(raw ?? "").trim().toLowerCase();
  if (!k) return null;
  if (k === "common") return "Common";
  if (k === "uncommon") return "Uncommon";
  if (k === "rare") return "Rare";
  if (k === "legendary") return "Legendary";
  if (k === "mythical") return "Mythical";
  if (k === "divine") return "Divine";
  if (k === "celestial") return "Celestial";
  // Tolerate both, because humans
  if (k === "unknown" || k === "unknow") return "Unknown";
  return null;
}
function rarityClassSuffix(key: RarityKey) {
  return key.toLowerCase(); // "common" | "uncommon" | ... | "unknown"
}

export function Badge(opts: BadgeOptions = {}): BadgeHandle {
  const {
    id,
    label = "",
    type = "neutral",
    tone = "soft",
    border,
    withBorder,
    pill = true,
    size = "md",
    onClick,
    variant = "default",
    rarity = null,
  } = opts;

  const root = el("span", { className: "badge", id }) as HTMLSpanElement;

  if (pill) root.classList.add("badge--pill");
  if (size === "sm") root.classList.add("badge--sm");
  else if (size === "lg") root.classList.add("badge--lg");
  else root.classList.add("badge--md");

  if (onClick) root.addEventListener("click", onClick);

  let borderOverride = false;
  let borderForce: boolean | undefined = withBorder;

  function applyBorderPolicy() {
    if (borderOverride) return;
    if (borderForce === false) root.style.border = "none";
    else root.style.border = "";
  }

  function applyType(t: BadgeType, tn: BadgeTone = tone) {
    root.classList.remove(
      "badge--neutral","badge--info","badge--success","badge--warning","badge--danger",
      "badge--soft","badge--outline","badge--solid"
    );
    root.classList.add(`badge--${t}`, `badge--${tn}`);
    applyBorderPolicy();
  }

  function setBorder(cssBorder?: string) {
    const val = (cssBorder ?? "").trim();
    if (val) {
      root.style.border = val;
      borderOverride = true;
    } else {
      borderOverride = false;
      applyBorderPolicy();
    }
  }

  function setWithBorder(on: boolean) {
    borderForce = on;
    applyBorderPolicy();
  }

  function setLabel(t: string) { root.textContent = t; }
  function setType(t: BadgeType, tn: BadgeTone = tone) { applyType(t, tn); }

  function setRarity(r: string | null | undefined) {
    // reset
    root.classList.remove(
      "badge--rarity",
      "badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare",
      "badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine",
      "badge--rarity-celestial","badge--rarity-unknown"
    );
    root.style.background = "";
    root.style.backgroundSize = "";
    root.style.animation = "";
    root.style.color = "";
    root.style.webkitTextStroke = "";

    const key = normalizeRarity(r);
    if (!key) { root.textContent = String(r ?? "—"); return; }

    // “Unknown” literally displays “???”
    root.textContent = key;
    root.classList.add("badge--rarity", `badge--rarity-${rarityClassSuffix(key)}`);
  }

  // init
  if (variant === "rarity") {
    setRarity(rarity);
  } else {
    root.textContent = label;
    applyType(type, tone);
    if (typeof withBorder === "boolean") setWithBorder(withBorder);
    if (border) setBorder(border);
  }

  return { root, setLabel, setType, setBorder, setWithBorder, setRarity };
}
