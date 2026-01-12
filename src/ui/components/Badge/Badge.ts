import { element } from "../../styles/helpers";
import { MGData } from "../../../modules";
import type { AbilityColor } from "../../../modules/data";

export type BadgeType = "neutral" | "info" | "success" | "warning" | "danger";
export type BadgeTone = "soft" | "outline" | "solid";
export type BadgeVariant = "default" | "rarity" | "ability";

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

  // Ability mode
  abilityId?: string;
  abilityName?: string;
};

export type BadgeHandle = {
  root: HTMLSpanElement;
  setLabel: (t: string) => void;
  setType: (t: BadgeType, tone?: BadgeTone) => void;
  setBorder: (cssBorder?: string) => void;
  setWithBorder: (on: boolean) => void;
  setRarity: (r: string | null | undefined) => void;
  setAbility: (abilityId: string, abilityName?: string) => void;
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
    abilityId = "",
    abilityName = "",
  } = opts;

  const root = element("span", { className: "badge", id }) as HTMLSpanElement;

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

    // "Unknown" literally displays "???"
    root.textContent = key;
    root.classList.add("badge--rarity", `badge--rarity-${rarityClassSuffix(key)}`);
  }

  function setAbility(id: string, name?: string) {
    // Get ability colors from MGData
    const abilities = MGData.get("abilities") as Record<string, { name?: string; color?: AbilityColor }> | null;
    const ability = abilities?.[id];
    const colors = ability?.color;

    // Default gray if no color found
    const bgColor = colors?.bg || "rgba(100, 100, 100, 0.9)";
    const hoverColor = colors?.hover || "rgba(150, 150, 150, 1)";

    // Reset classes
    root.classList.remove(
      "badge--neutral","badge--info","badge--success","badge--warning","badge--danger",
      "badge--soft","badge--outline","badge--solid",
      "badge--rarity",
      "badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare",
      "badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine",
      "badge--rarity-celestial","badge--rarity-unknown"
    );

    // Add ability class
    root.classList.add("badge--ability");

    // Set text
    root.textContent = name || ability?.name || id || "Unknown Ability";

    // Set colors
    root.style.background = bgColor;
    root.style.color = "white";
    root.style.border = "none";
    root.style.webkitTextStroke = "";
    root.style.animation = "";
    root.style.backgroundSize = "";

    // Add hover listeners
    const handleMouseEnter = () => { root.style.background = hoverColor; };
    const handleMouseLeave = () => { root.style.background = bgColor; };

    // Remove old listeners if any
    root.removeEventListener("mouseenter", handleMouseEnter);
    root.removeEventListener("mouseleave", handleMouseLeave);

    // Add new listeners
    root.addEventListener("mouseenter", handleMouseEnter);
    root.addEventListener("mouseleave", handleMouseLeave);
  }

  // init
  if (variant === "rarity") {
    setRarity(rarity);
  } else if (variant === "ability") {
    setAbility(abilityId, abilityName);
  } else {
    root.textContent = label;
    applyType(type, tone);
    if (typeof withBorder === "boolean") setWithBorder(withBorder);
    if (border) setBorder(border);
  }

  return { root, setLabel, setType, setBorder, setWithBorder, setRarity, setAbility };
}
