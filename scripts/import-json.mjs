import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "data");
const EVENTS_FILE = path.join(DATA_DIR, "events.json");
const META_FILE = path.join(DATA_DIR, "meta.json");

const MAX_EVENTS = 200000;

function readJson(file, fallback) {
  try {
    if (!fs.existsSync(file)) return fallback;
    const raw = fs.readFileSync(file, "utf8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(file, value) {
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n", "utf8");
}

function parseTimestamp(value) {
  if (!value) return null;
  if (typeof value === "number") return value;
  const ms = Date.parse(String(value));
  return Number.isFinite(ms) ? ms : null;
}

function normalizeText(text) {
  return String(text || "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeToken(text) {
  return normalizeText(text).replace(/^@+/, "").trim();
}

function extractTokens(text) {
  if (!text) return [];
  return text
    .split("|")
    .map((part) => normalizeToken(part))
    .filter(Boolean);
}

function normalizeKey(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[\u2019']/g, "")
    .replace(/[^a-z0-9]/g, "");
}

const WEATHER_ALIASES = new Map([
  ["rain", "Rain"],
  ["snow", "Frost"],
  ["frost", "Frost"],
  ["dawn", "Dawn"],
  ["ambermoon", "AmberMoon"],
  ["amber", "AmberMoon"],
  ["ambermoonweather", "AmberMoon"],
]);

function extractWeatherToken(tokens) {
  for (const token of tokens) {
    const key = normalizeKey(token);
    if (!key) continue;
    const mapped = WEATHER_ALIASES.get(key);
    if (mapped) return mapped;
  }
  return null;
}

function parseItemToken(token) {
  const cleaned = normalizeToken(token);
  if (!cleaned) return null;

  const match =
    cleaned.match(/^(.+?)\s*[xX]?\s*(\d+)\s*$/) ||
    cleaned.match(/^(.+?)\s*[:\-]\s*(\d+)\s*$/);
  if (!match) return null;

  const name = normalizeText(match[1]);
  const qty = Number(match[2]);
  if (!name || !Number.isFinite(qty)) return null;
  return { itemId: name, quantity: qty };
}

function extractContent(message) {
  if (!message || typeof message !== "object") return "";
  if (typeof message.content === "string" && message.content.trim()) return message.content;
  if (Array.isArray(message.embeds)) {
    for (const embed of message.embeds) {
      if (embed?.description) return String(embed.description);
      if (Array.isArray(embed?.fields)) {
        const field = embed.fields.find((f) => f?.value);
        if (field?.value) return String(field.value);
      }
    }
  }
  return "";
}

function parseMessages(json) {
  const events = [];
  const messages = Array.isArray(json?.messages) ? json.messages : [];
  for (const msg of messages) {
    const timestamp = parseTimestamp(msg?.timestamp);
    if (!timestamp) continue;

    const content = extractContent(msg);
    const tokens = extractTokens(content);
    if (!tokens.length) continue;

    const items = tokens.map(parseItemToken).filter(Boolean);
    if (!items.length) continue;

    events.push({
      id: msg?.id ?? null,
      source: "discord-json",
      timestamp,
      items,
    });
  }
  return events;
}

function main() {
  const inputPath = process.argv[2];
  if (!inputPath) {
    console.error("Usage: node scripts/import-json.mjs <path-to-discord-export.json>");
    process.exit(1);
  }

  if (!fs.existsSync(inputPath)) {
    console.error(`File not found: ${inputPath}`);
    process.exit(1);
  }

  const json = readJson(inputPath, null);
  if (!json) {
    console.error("Invalid JSON export.");
    process.exit(1);
  }

  const parsedEvents = parseMessages(json);
  if (!parsedEvents.length) {
    console.log("No events parsed from JSON.");
    return;
  }

  const events = readJson(EVENTS_FILE, []);
  const meta = readJson(META_FILE, {});

  const existingIds = new Set(events.map((e) => String(e.id ?? "")));
  for (const ev of parsedEvents) {
    const key = String(ev.id ?? "");
    if (key && existingIds.has(key)) continue;
    events.push(ev);
    if (key) existingIds.add(key);
  }

  events.sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0));
  if (events.length > MAX_EVENTS) events.length = MAX_EVENTS;

  writeJson(EVENTS_FILE, events);
  writeJson(META_FILE, {
    ...meta,
    importedAt: meta.importedAt ?? Date.now(),
    importSource: meta.importSource ?? "discord-json",
    importFile: meta.importFile ?? path.basename(inputPath),
  });

  console.log(`Imported ${parsedEvents.length} events from JSON. Total events: ${events.length}`);
}

main();
