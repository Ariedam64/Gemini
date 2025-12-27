import { element } from "../../styles/helpers";
import { Select, SelectHandle } from "../Select/Select";
import { detectEnvironment, type EnvironmentInfo } from "../../../utils/api";

/* ────────────────────────────────────────────────────────────────────────── */
/* Types                                                                     */
/* ────────────────────────────────────────────────────────────────────────── */

export type TimeRange = { start: string; end: string };

export type TimeFormat = "24h" | "12h" | "auto";
export type TimePickerKind = "auto" | "native" | "custom";

export type TimeRangePickerOptions = {
  id?: string;

  // Initial values (always "HH:MM" 24h)
  start?: string;                 // default "08:00"
  end?: string;                   // default "23:00"

  // Behavior
  stepMinutes?: number;           // e.g. 5 (must be between 1 and 30 ideally)
  disabled?: boolean;
  allowOvernight?: boolean;       // allow end < start (wrap past midnight)

  // Rendering and UX
  labels?: { from?: string; to?: string };
  picker?: TimePickerKind;        // "auto" | "native" | "custom"
  format?: TimeFormat;            // affects only the custom path if not "native"
  useNativeOn?: (env: EnvironmentInfo) => boolean; // override auto heuristic

  // Summary inline at the right
  showSummary?: boolean;
  summaryLabel?: string;
  summaryFormatter?: (minutes: number) => string;

  // Events
  onChange?: (range: TimeRange) => void;
};

export type TimeRangePickerHandle = {
  root: HTMLDivElement;
  getValue: () => TimeRange;
  setValue: (range: Partial<TimeRange>) => void;
  setDisabled: (disabled: boolean) => void;
  destroy: () => void;
};

/* ────────────────────────────────────────────────────────────────────────── */
/* Utils                                                                     */
/* ────────────────────────────────────────────────────────────────────────── */

function pad2(n: number) { return n < 10 ? `0${n}` : String(n); }

function toMinutes(hhmm: string): number {
  const m = /^(\d{1,2}):(\d{2})$/.exec((hhmm || "").trim());
  if (!m) return 0;
  const h = Math.max(0, Math.min(23, parseInt(m[1], 10) || 0));
  const min = Math.max(0, Math.min(59, parseInt(m[2], 10) || 0));
  return h * 60 + min;
}

function fromMinutes(total: number): string {
  const t = Math.max(0, Math.min(24 * 60 - 1, total | 0)); // clamp 00:00..23:59
  const h = Math.floor(t / 60);
  const m = t % 60;
  return `${pad2(h)}:${pad2(m)}`;
}

function clampStep(value: string, stepMin: number): string {
  const m = toMinutes(value);
  const clamped = Math.max(0, Math.min(24 * 60 - 1, m));
  const snapped = Math.floor(clamped / stepMin) * stepMin;
  return fromMinutes(snapped);
}

function minutesTo12h(totalMin: number): { h12: number; m: number; pm: boolean } {
  const h24 = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  const pm = h24 >= 12;
  const h12 = (h24 % 12) || 12;
  return { h12, m, pm };
}

function h12ToMinutes(h12: number, m: number, pm: boolean): number {
  const base = h12 % 12; // 12 -> 0
  const h24 = base + (pm ? 12 : 0);
  return h24 * 60 + m;
}

function isMobileOrTouch(env: EnvironmentInfo): boolean {
  // Soft heuristic: prefer native on mobile or iOS/Android even if reported as "desktop"
  if (env.platform === "mobile") return true;
  if (env.os === "ios" || env.os === "android") return true;
  return false;
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Component                                                                 */
/* ────────────────────────────────────────────────────────────────────────── */

export function TimeRangePicker(opts: TimeRangePickerOptions = {}): TimeRangePickerHandle {
  const {
    id,
    start = "08:00",
    end = "23:00",
    stepMinutes = 5,
    disabled = false,
    allowOvernight = true,
    labels = { from: "From", to: "To" },
    picker = "auto",
    format = "auto",
    useNativeOn,
    onChange,
  } = opts;

  // Internal canonical value always 24h
  let value: TimeRange = {
    start: clampStep(start, stepMinutes),
    end: clampStep(end, stepMinutes),
  };

  const root = element("div", { className: "time-range", id }) as HTMLDivElement;
  root.classList.add("time-range--stacked");

  /* Decide path: native or custom */
  const env = detectEnvironment();
  const wantNative = picker === "native"
    || (picker === "auto" && (useNativeOn?.(env) ?? isMobileOrTouch(env)));

  if (wantNative) {
    return mountNative();
  } else {
    return mountCustom();
  }

  /* ──────────────────────────────────────────────────────────────────────── */
  /* Native path                                                             */
  /* ──────────────────────────────────────────────────────────────────────── */
  function mountNative(): TimeRangePickerHandle {
  const fromWrap = element("div", { className: "time-range-field", role: "group" }) as HTMLDivElement;
  const fromLab  = element("span", { className: "time-range-label" }, labels.from || "From");
  const inputFrom = element("input", {
    className: "input time-range-input",
    type: "time",
    step: String(stepMinutes * 60),
    value: value.start,
  }) as HTMLInputElement;

  const toWrap   = element("div", { className: "time-range-field", role: "group" }) as HTMLDivElement;
  const toLab   = element("span", { className: "time-range-label" }, labels.to || "To");
  const inputTo = element("input", {
    className: "input time-range-input",
    type: "time",
    step: String(stepMinutes * 60),
    value: value.end,
  }) as HTMLInputElement;

  fromWrap.append(fromLab, inputFrom);
  toWrap.append(toLab, inputTo);

  // avant: root.append(fromWrap, sep, toWrap)
  root.append(fromWrap, toWrap);

    function syncInputs() { inputFrom.value = value.start; inputTo.value = value.end; }
    function emit() { onChange?.(getValue()); }

    function onInput(ev: Event) {
      const target = ev.target as HTMLInputElement;
      const isFrom = target === inputFrom;
      const fixed = clampStep(target.value || (isFrom ? value.start : value.end), stepMinutes);

      if (isFrom) {
        value.start = fixed;
        if (!allowOvernight && toMinutes(value.end) < toMinutes(value.start)) value.end = value.start;
      } else {
        value.end = fixed;
        if (!allowOvernight && toMinutes(value.end) < toMinutes(value.start)) value.start = value.end;
      }
      syncInputs();
      emit();
    }

    inputFrom.addEventListener("change", onInput);
    inputFrom.addEventListener("blur", onInput);
    inputTo.addEventListener("change", onInput);
    inputTo.addEventListener("blur", onInput);

    if (disabled) setDisabled(true);

    function getValue(): TimeRange { return { ...value }; }
    function setValue(partial: Partial<TimeRange>) {
      if (partial.start) value.start = clampStep(partial.start, stepMinutes);
      if (partial.end) value.end = clampStep(partial.end, stepMinutes);
      if (!allowOvernight) {
        const a = toMinutes(value.start), b = toMinutes(value.end);
        if (b < a) value.end = value.start;
      }
      syncInputs();
      emit();
    }
    function setDisabled(flag: boolean) {
      inputFrom.disabled = flag;
      inputTo.disabled = flag;
      root.classList.toggle("is-disabled", !!flag);
    }
    function destroy() {
      inputFrom.removeEventListener("change", onInput);
      inputFrom.removeEventListener("blur", onInput);
      inputTo.removeEventListener("change", onInput);
      inputTo.removeEventListener("blur", onInput);
      root.replaceChildren();
    }

    return { root, getValue, setValue, setDisabled, destroy };
  }

  /* ──────────────────────────────────────────────────────────────────────── */
  /* Custom path                                                             */
  /* ──────────────────────────────────────────────────────────────────────── */

  function mountCustom(): TimeRangePickerHandle {
  const fromWrap = element("label", { className: "time-range-field" }) as HTMLLabelElement;
  const fromLab  = element("span", { className: "time-range-label" }, labels.from || "From");

  const toWrap = element("label", { className: "time-range-field" }) as HTMLLabelElement;
  const toLab  = element("span", { className: "time-range-label" }, labels.to || "To");

  const wants12h = format === "12h" || (format === "auto" && prefers12h());

  const startCtrls = buildFields(value.start, wants12h);
  const endCtrls   = buildFields(value.end, wants12h);

  fromWrap.append(fromLab, startCtrls.container);
  toWrap.append(toLab, endCtrls.container);

  // avant: root.append(fromWrap, sep, toWrap)
  root.append(fromWrap, toWrap);

    if (disabled) setDisabled(true);

    // Sync initial
    reflectFromValue();

    // Wire events
    startCtrls.onAnyChange(() => {
      value.start = startCtrls.to24h(stepMinutes);
      // enforce allowOvernight if needed
      if (!allowOvernight && toMinutes(value.end) < toMinutes(value.start)) {
        value.end = value.start;
        endCtrls.setFrom24h(value.end);
      }
      onChange?.(getValue());
    });
    endCtrls.onAnyChange(() => {
      value.end = endCtrls.to24h(stepMinutes);
      if (!allowOvernight && toMinutes(value.end) < toMinutes(value.start)) {
        value.start = value.end;
        startCtrls.setFrom24h(value.start);
      }
      onChange?.(getValue());
    });

    // Handle
    function getValue(): TimeRange { return { ...value }; }
    function setValue(partial: Partial<TimeRange>) {
      if (partial.start) value.start = clampStep(partial.start, stepMinutes);
      if (partial.end) value.end = clampStep(partial.end, stepMinutes);
      if (!allowOvernight) {
        const a = toMinutes(value.start), b = toMinutes(value.end);
        if (b < a) value.end = value.start;
      }
      reflectFromValue();
      onChange?.(getValue());
    }
    function reflectFromValue() {
      startCtrls.setFrom24h(value.start);
      endCtrls.setFrom24h(value.end);
    }
    function setDisabled(flag: boolean) {
      startCtrls.setDisabled(flag);
      endCtrls.setDisabled(flag);
      root.classList.toggle("is-disabled", !!flag);
    }
    function destroy() {
      startCtrls.destroy();
      endCtrls.destroy();
      root.replaceChildren();
    }

    return { root, getValue, setValue, setDisabled, destroy };
  }

  /* ──────────────────────────────────────────────────────────────────────── */
  /* Custom field builder                                                    */
  /* ──────────────────────────────────────────────────────────────────────── */

  type FieldSet = {
    container: HTMLDivElement;
    onAnyChange: (fn: () => void) => void;
    setFrom24h: (hhmm: string) => void;
    to24h: (stepMinutes: number) => string;
    setDisabled: (d: boolean) => void;
    destroy: () => void;
  };

function buildFields(initial24h: string, wants12h: boolean): FieldSet {
  const container = element("div", { className: "time-picker" }) as HTMLDivElement;

  // helper pour compacter un Select
  const makeCompact = (selRoot: HTMLDivElement, minCh = 2) => {
    selRoot.classList.add("time-picker-compact");
    selRoot.style.setProperty("--min-ch", String(minCh));
  };

  // Hours
  const hoursOpts = wants12h
    ? Array.from({ length: 12 }, (_, i) => {
        const h = (i + 1); // 1..12
        return { value: String(h), label: pad2(h) };
      })
    : Array.from({ length: 24 }, (_, h) => ({ value: String(h), label: pad2(h) }));

  const hourSel = Select({
    size: "sm",                 // ← plus petit
    options: hoursOpts,
    placeholder: wants12h ? "HH" : "HH",
    onChange: () => notify(),
  });
  makeCompact(hourSel.root, 2); // two characters

  // Minutes (multiples de step)
  const mins = Math.max(1, Math.min(30, Math.floor(opts.stepMinutes ?? 5)));
  const minuteOpts = Array.from({ length: Math.floor(60 / mins) }, (_, i) => {
    const m = i * mins;
    return { value: String(m), label: pad2(m) };
  });
  const minuteSel = Select({
    size: "sm",
    options: minuteOpts,
    placeholder: "MM",
    onChange: () => notify(),
  });
  makeCompact(minuteSel.root, 2);

  // AM/PM si 12h
  const meridiemSel: SelectHandle | null = wants12h
    ? Select({
        size: "sm",
        options: [
          { value: "am", label: "AM" },
          { value: "pm", label: "PM" },
        ],
        value: "am",
        onChange: () => notify(),
      })
    : null;
  if (meridiemSel) makeCompact(meridiemSel.root, 3); // "AM"/"PM" = 2–3ch

  container.append(
    hourSel.root,
    minuteSel.root,
    ...(meridiemSel ? [meridiemSel.root] : [])
  );

    let onChangeCb: (() => void) | null = null;
    function onAnyChange(fn: () => void) { onChangeCb = fn; }
    function notify() { onChangeCb?.(); }

    function setFrom24h(hhmm: string) {
      const t = toMinutes(hhmm);
      if (wants12h) {
        const parts = minutesTo12h(t);
        hourSel.setValue(String(parts.h12), { notify: false });
        minuteSel.setValue(String(Math.floor(parts.m / mins) * mins), { notify: false });
        meridiemSel!.setValue(parts.pm ? "pm" : "am", { notify: false });
      } else {
        const h24 = Math.floor(t / 60);
        const m = t % 60;
        hourSel.setValue(String(h24), { notify: false });
        minuteSel.setValue(String(Math.floor(m / mins) * mins), { notify: false });
      }
    }

    function to24h(stepMinutes: number): string {
      const hm = parseInt(minuteSel.getValue() || "0", 10) || 0;
      if (wants12h) {
        const h12 = parseInt(hourSel.getValue() || "12", 10) || 12;
        const isPM = (meridiemSel?.getValue() || "am") === "pm";
        const t = h12ToMinutes(h12, hm, isPM);
        return clampStep(fromMinutes(t), stepMinutes);
      } else {
        const h24 = parseInt(hourSel.getValue() || "0", 10) || 0;
        const t = h24 * 60 + hm;
        return clampStep(fromMinutes(t), stepMinutes);
      }
    }

    function setDisabled(d: boolean) {
      hourSel.setDisabled(d);
      minuteSel.setDisabled(d);
      meridiemSel?.setDisabled(d);
      container.classList.toggle("is-disabled", !!d);
    }

    function destroy() {
      // Selects have their own destroy via returned handles if needed
      container.replaceChildren();
    }

    return { container, onAnyChange, setFrom24h, to24h, setDisabled, destroy };
  }

  function prefers12h(): boolean {
    // Try to infer from locale. This is heuristic; custom UI only.
    try {
      const f = new Intl.DateTimeFormat(undefined, { hour: "numeric" });
      const s = f.format(new Date(2020, 1, 1, 13)); // 1 PM vs 13
      return /AM|PM|am|pm/.test(s);
    } catch {
      return false;
    }
  }
}
