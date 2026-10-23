/**
 * Bug Report Modal - the fields the player fills in
 *
 * What kind of report, a title, what happened, which part of Gemini, the
 * optional details and a contact. Reading and filling them goes through one
 * handle, which the draft and the send both use.
 */

import { element } from "../../../styles/helpers";
import { Card } from "../../Card/Card";
import { Input, type InputHandle } from "../../Input/Input";
import { SegmentedControl } from "../../SegmentedControl/SegmentedControl";
import { Select, type SelectHandle, type SelectOption } from "../../Select/Select";
import {
  BUG_REPORT_LIMITS as LIMITS,
  type BugReportCategory,
  type BugReportDraft,
  type BugReportFrequency,
  type BugReportWithoutMod,
} from "../../../../modules/bugReport";
import { createTextArea, type TextAreaHandle } from "./dom";

const CATEGORIES: ReadonlyArray<{ value: BugReportCategory; label: string }> = [
  { value: "bug", label: "Bug" },
  { value: "crash", label: "Crash or error" },
  { value: "visual", label: "Visual" },
  { value: "performance", label: "Performance" },
  { value: "feature", label: "Feature idea" },
  { value: "question", label: "Question" },
  { value: "other", label: "Other" },
];

const FREQUENCIES: ReadonlyArray<{ value: BugReportFrequency; label: string }> = [
  { value: "unknown", label: "Not sure" },
  { value: "always", label: "Every time" },
  { value: "often", label: "Often" },
  { value: "sometimes", label: "Sometimes" },
  { value: "once", label: "Only once" },
];

const WITHOUT_MOD: ReadonlyArray<{ id: BugReportWithoutMod; label: string }> = [
  { id: "yes", label: "Yes" },
  { id: "no", label: "No" },
  { id: "unknown", label: "Not sure" },
];

const DEFAULT_CATEGORY: BugReportCategory = "bug";
const DEFAULT_FREQUENCY: BugReportFrequency = "unknown";
const DEFAULT_WITHOUT_MOD: BugReportWithoutMod = "unknown";

/** Gemini's own additions to the game (prices, timers, locks) are not HUD tabs. */
const GAME_VIEW_AREA = "In the game view (prices, timers, locks)";
const OTHER_AREA = "Something else, or not sure";

export interface FormValues {
  category: BugReportCategory;
  title: string;
  description: string;
  feature: string;
  steps: string;
  expected: string;
  actual: string;
  frequency: BugReportFrequency;
  withoutMod: BugReportWithoutMod;
  contact: string;
}

export type ValidatedField = "title" | "description";

export interface ReportFieldsOptions {
  /** The HUD tabs, offered as the part of Gemini a report is about. */
  areas: readonly string[];
  /** Puts back what an earlier visit left unsent. */
  draft: BugReportDraft;
  /** Called on every change of any field. */
  onChange: () => void;
}

export interface ReportFieldsHandle {
  root: HTMLElement;
  read(): FormValues;
  reset(keepContact: boolean): void;
  /** Flags one field with a message under it, or clears every flag with null. */
  markInvalid(field: ValidatedField | null, message?: string): void;
  focus(field: ValidatedField): void;
  destroy(): void;
}

interface FieldParts {
  root: HTMLElement;
  hint: HTMLElement;
  defaultHint: string;
}

function field(labelText: string, control: HTMLElement, opts: { optional?: boolean; hint?: string } = {}): FieldParts {
  const label = element("span", { className: "bug-report__label" }, labelText);
  if (opts.optional) label.append(" ", element("span", { className: "bug-report__optional" }, "(optional)"));
  const defaultHint = opts.hint ?? "";
  const hint = element("p", { className: "bug-report__hint" }, defaultHint);
  const root = element("div", { className: "bug-report__field" }, label, control, hint);
  return { root, hint, defaultHint };
}

function isOneOf<T extends string>(list: ReadonlyArray<{ value: T } | { id: T }>, value: string | null | undefined): value is T {
  return list.some((entry) => ("value" in entry ? entry.value : entry.id) === value);
}

function areaOptions(areas: readonly string[]): SelectOption[] {
  const unique = Array.from(new Set(areas.filter(Boolean)));
  return [...unique, GAME_VIEW_AREA, OTHER_AREA].map((area) => ({ value: area, label: area }));
}

export function createReportFields(options: ReportFieldsOptions): ReportFieldsHandle {
  const { draft, onChange } = options;
  const cleanups: (() => void)[] = [];

  const category: SelectHandle = Select({
    options: CATEGORIES.map(({ value, label }) => ({ value, label })),
    value: isOneOf(CATEGORIES, draft.category) ? draft.category : DEFAULT_CATEGORY,
    onChange,
  });

  const title: InputHandle = Input({
    placeholder: "Short summary, e.g. Shop alerts stopped ringing",
    value: draft.title ?? "",
    maxLength: LIMITS.title.max,
    onChange,
  });
  const titleField = field("Title", title.root);

  const description: TextAreaHandle = createTextArea({
    placeholder: "What were you doing, what went wrong, and since when?",
    maxLength: LIMITS.description.max,
    rows: 5,
  });
  description.root.value = draft.description ?? "";
  const descriptionField = field("What happened?", description.root, {
    hint: `At least ${LIMITS.description.min} characters.`,
  });

  const areaChoices = areaOptions(options.areas);
  const area: SelectHandle = Select({
    options: areaChoices,
    value: areaChoices.some((choice) => choice.value === draft.feature) ? draft.feature : undefined,
    placeholder: "Pick a tab or feature",
    onChange,
  });

  const steps = createTextArea({ placeholder: "1. Open the Pets tab\n2. Press 1\n3. ...", maxLength: LIMITS.steps, rows: 3 });
  const expected = createTextArea({ placeholder: "What should have happened?", maxLength: LIMITS.expected, rows: 2, short: true });
  const actual = createTextArea({ placeholder: "What happened instead?", maxLength: LIMITS.actual, rows: 2, short: true });
  steps.root.value = draft.steps ?? "";
  expected.root.value = draft.expected ?? "";
  actual.root.value = draft.actual ?? "";

  const frequency: SelectHandle = Select({
    options: FREQUENCIES.map(({ value, label }) => ({ value, label })),
    value: isOneOf(FREQUENCIES, draft.frequency) ? draft.frequency : DEFAULT_FREQUENCY,
    onChange,
  });
  const withoutMod = SegmentedControl({
    segments: WITHOUT_MOD.map(({ id, label }) => ({ id, label })),
    selected: isOneOf(WITHOUT_MOD, draft.withoutMod) ? draft.withoutMod : DEFAULT_WITHOUT_MOD,
    size: "sm",
    onChange,
  });

  const contact: InputHandle = Input({
    placeholder: "Discord name or email",
    value: draft.contact ?? "",
    maxLength: LIMITS.contact,
    onChange,
  });

  for (const text of [description, steps, expected, actual]) {
    text.root.addEventListener("input", onChange);
    cleanups.push(() => text.root.removeEventListener("input", onChange), text.destroy);
  }
  cleanups.push(
    () => category.destroy(),
    () => title.destroy(),
    () => area.destroy(),
    () => frequency.destroy(),
    () => withoutMod.destroy(),
    () => contact.destroy(),
  );

  const pair = element(
    "div",
    { className: "bug-report__row" },
    field("Expected", expected.root).root,
    field("Actual", actual.root).root,
  );
  const withoutModField = field("Does it happen without Gemini?", withoutMod, {
    hint: "If you can, turn Gemini off in your userscript manager, reload, and try again.",
  });
  const hasDetails = !!(draft.steps || draft.expected || draft.actual);
  const details = Card(
    {
      title: "More details",
      subtitle: "Steps, what you expected, how often. Optional, but it helps a lot.",
      expandable: true,
      defaultExpanded: hasDetails,
      padding: "sm",
      variant: "soft",
    },
    element(
      "div",
      { className: "bug-report__stack" },
      field("Steps to make it happen", steps.root).root,
      pair,
      field("How often?", frequency.root).root,
      withoutModField.root,
    ),
  );

  const root = element(
    "div",
    { className: "bug-report__stack" },
    field("What kind of report?", category.root).root,
    titleField.root,
    descriptionField.root,
    field("Which part of Gemini?", area.root, { optional: true }).root,
    details,
    field("Contact", contact.root, {
      optional: true,
      hint: "Only if you are happy to be contacted about this report.",
    }).root,
  );

  const invalid: Record<ValidatedField, FieldParts> = { title: titleField, description: descriptionField };

  const handle: ReportFieldsHandle = {
    root,
    read() {
      const categoryValue = category.getValue();
      const frequencyValue = frequency.getValue();
      const withoutModValue = withoutMod.getSelected();
      return {
        category: isOneOf(CATEGORIES, categoryValue) ? categoryValue : DEFAULT_CATEGORY,
        title: title.getValue(),
        description: description.root.value,
        feature: area.getValue() ?? "",
        steps: steps.root.value,
        expected: expected.root.value,
        actual: actual.root.value,
        frequency: isOneOf(FREQUENCIES, frequencyValue) ? frequencyValue : DEFAULT_FREQUENCY,
        withoutMod: isOneOf(WITHOUT_MOD, withoutModValue) ? withoutModValue : DEFAULT_WITHOUT_MOD,
        contact: contact.getValue(),
      };
    },
    reset(keepContact) {
      title.input.value = "";
      for (const text of [description, steps, expected, actual]) text.root.value = "";
      if (!keepContact) contact.input.value = "";
      category.setValue(DEFAULT_CATEGORY, { notify: false });
      // The select has no "clear": an empty list drops the choice, then the options come back.
      area.setOptions([]);
      area.setOptions(areaChoices);
      frequency.setValue(DEFAULT_FREQUENCY, { notify: false });
      withoutMod.select(DEFAULT_WITHOUT_MOD);
      handle.markInvalid(null);
    },
    markInvalid(which, message) {
      for (const [key, entry] of Object.entries(invalid)) {
        const on = key === which;
        entry.root.classList.toggle("is-invalid", on);
        entry.hint.textContent = on && message ? message : entry.defaultHint;
      }
    },
    focus(which) {
      if (which === "title") title.focus();
      else description.root.focus();
    },
    destroy() {
      for (const cleanup of cleanups.splice(0)) cleanup();
    },
  };
  return handle;
}
