// src/modules/bugReport/types.ts
// Types and constants of the bug report module

import type { BugReportPayload, BugReportProject } from "./core";

/** Who sends the reports, as the backend knows them (docs/bug-reports.md in aries-mod-backend). */
export const BUG_REPORT_PROJECT = { id: "gemini", name: "Gemini" } as const satisfies {
  id: BugReportProject;
  name: string;
};

/** The backend that stores the reports. */
export const BUG_REPORT_API_URL = "https://ariesmod-api.ariedam.fr";

/** What the player agreed to attach. Technical info always goes. */
export interface AttachedData {
  logs: boolean;
  settings: boolean;
  accountState: boolean;
}

/** Everything a report carries that the player does not type. */
export type AutoFields = Pick<
  BugReportPayload,
  "project" | "modName" | "modVersion" | "gameVersion" | "playerId" | "playerName" | "includeAccountState" | "context"
>;

/** The installed build against the latest release, when GitHub answered. */
export interface ModVersionStatus {
  local: string | null;
  remote: string | null;
  behind: boolean;
}

/** Fields of the form kept while the player types, so a reload loses nothing. */
export const DRAFT_FIELDS = [
  "category",
  "title",
  "description",
  "feature",
  "steps",
  "expected",
  "actual",
  "frequency",
  "withoutMod",
  "contact",
] as const;

export type DraftField = (typeof DRAFT_FIELDS)[number];
export type BugReportDraft = Partial<Record<DraftField, string>>;
