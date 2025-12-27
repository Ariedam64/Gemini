import { el } from "../../dom";
import { TimeRangePicker, type TimeRangePickerOptions, type TimeRangePickerHandle } from "./TimeRangePicker";

const SVG_NS = "http://www.w3.org/2000/svg";
const MINUTES_PER_HALF_DAY = 12 * 60;
const TO_DEG = 360 / MINUTES_PER_HALF_DAY;
const MINUTES_PER_DAY = 24 * 60;

function toMinutes(hhmm: string): number {
  const m = /^(\d{1,2}):(\d{2})$/.exec((hhmm || "").trim());
  if (!m) return 0;
  const h = Math.max(0, Math.min(23, parseInt(m[1], 10) || 0));
  const min = Math.max(0, Math.min(59, parseInt(m[2], 10) || 0));
  return h * 60 + min;
}
function diffMinutes24h(start: string, end: string, allowOvernight: boolean): number {
  const a = toMinutes(start);
  const b = toMinutes(end);
  if (a === b) return 24 * 60; // full day when start == end
  if (allowOvernight && b < a) return (24 * 60 - a) + b;
  return Math.max(0, b - a);
}

function formatDuration(total: number): string {
  const constrained = Math.max(0, Math.min(total, MINUTES_PER_DAY));
  const hours = Math.floor(constrained / 60);
  const minutes = constrained % 60;
  return `${hours}h${String(minutes).padStart(2, "0")}`;
}

type ClockSegment = { start: number; span: number; pass: number };

function computeClockSegments(startMinutes: number, durationMinutes: number): ClockSegment[] {
  const segments: ClockSegment[] = [];
  if (durationMinutes <= 0) return segments;

  let remaining = durationMinutes;
  let elapsed = 0;

  while (remaining > 0) {
    const pass = Math.floor(elapsed / MINUTES_PER_HALF_DAY);
    const passProgress = elapsed % MINUTES_PER_HALF_DAY;
    const minutesUntilPassEnds = MINUTES_PER_HALF_DAY - passProgress;
    const span = Math.min(remaining, minutesUntilPassEnds);
    const start = (startMinutes + elapsed) % MINUTES_PER_HALF_DAY;

    segments.push({ start, span, pass });

    remaining -= span;
    elapsed += span;
  }

  return segments;
}

function polarToCartesian(cx: number, cy: number, radius: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

function describeArc(cx: number, cy: number, radius: number, startAngle: number, sweepAngle: number): string {
  const clampedSweep = Math.min(sweepAngle, 359.999);
  const start = polarToCartesian(cx, cy, radius, startAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle + clampedSweep);
  const largeArcFlag = clampedSweep > 180 ? "1" : "0";

  return [
    "M", start.x.toFixed(3), start.y.toFixed(3),
    "A", radius.toFixed(3), radius.toFixed(3), "0", largeArcFlag, "1",
    end.x.toFixed(3), end.y.toFixed(3),
  ].join(" ");
}

function createRangeClock() {
  const root = el("div", { className: "trp-clock" }) as HTMLDivElement;
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("class", "trp-clock-svg");

  const face = document.createElementNS(SVG_NS, "circle");
  face.setAttribute("class", "trp-clock-face");
  face.setAttribute("cx", "50");
  face.setAttribute("cy", "50");
  face.setAttribute("r", "46");
  svg.append(face);

  const ticks = document.createElementNS(SVG_NS, "g");
  ticks.setAttribute("class", "trp-clock-ticks");
  for (let i = 0; i < 12; i++) {
    const angle = i * 30; // 360 / 12
    const isQuarter = i % 3 === 0;
    const inner = polarToCartesian(50, 50, isQuarter ? 30 : 34, angle);
    const outer = polarToCartesian(50, 50, 45, angle);
    const tick = document.createElementNS(SVG_NS, "line");
    tick.setAttribute("class", `trp-clock-tick${isQuarter ? " trp-clock-tick--major" : ""}`);
    tick.setAttribute("x1", inner.x.toFixed(3));
    tick.setAttribute("y1", inner.y.toFixed(3));
    tick.setAttribute("x2", outer.x.toFixed(3));
    tick.setAttribute("y2", outer.y.toFixed(3));
    ticks.append(tick);
  }
  svg.append(ticks);

  const arcLayer = document.createElementNS(SVG_NS, "g");
  arcLayer.setAttribute("class", "trp-clock-arcs");
  svg.append(arcLayer);

  const pointerLayer = document.createElementNS(SVG_NS, "g");
  pointerLayer.setAttribute("class", "trp-clock-pointers");
  svg.append(pointerLayer);

  function makePointer(kind: "start" | "end") {
    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", `trp-clock-pointer trp-clock-pointer--${kind}`);

    const line = document.createElementNS(SVG_NS, "line");
    line.setAttribute("class", "trp-clock-pointer-line");
    line.setAttribute("x1", "50");
    line.setAttribute("y1", "50");
    line.setAttribute("x2", "50");
    line.setAttribute("y2", "12");

    const tip = document.createElementNS(SVG_NS, "circle");
    tip.setAttribute("class", "trp-clock-pointer-tip");
    tip.setAttribute("cx", "50");
    tip.setAttribute("cy", "8.5");
    tip.setAttribute("r", "2.4");

    group.append(line, tip);
    pointerLayer.append(group);

    return {
      setAngle(angleDeg: number) {
        const rotateAttr = `rotate(${angleDeg} 50 50)`;
        group.setAttribute("transform", rotateAttr);
        group.style.transform = `rotate(${angleDeg}deg)`;
      },
    };
  }

  const startPointer = makePointer("start");
  const endPointer = makePointer("end");

  const center = document.createElementNS(SVG_NS, "circle");
  center.setAttribute("class", "trp-clock-center");
  center.setAttribute("cx", "50");
  center.setAttribute("cy", "50");
  center.setAttribute("r", "2");
  svg.append(center);

  root.append(svg);

  function update(start: string, durationMinutes: number) {
    arcLayer.replaceChildren();
    if (durationMinutes <= 0) return;

    const startMinutes = toMinutes(start);
    const segments = computeClockSegments(startMinutes, durationMinutes);

    const startAngle = (startMinutes % MINUTES_PER_HALF_DAY) * TO_DEG;
    const endAngle = ((startMinutes + Math.max(0, durationMinutes)) % MINUTES_PER_HALF_DAY) * TO_DEG;
    startPointer.setAngle(startAngle);
    endPointer.setAngle(endAngle);

    for (const segment of segments) {
      const sweep = (segment.span * TO_DEG);
      const startAngle = segment.start * TO_DEG;

      if (sweep >= 359.999) {
        const arcFull = document.createElementNS(SVG_NS, "circle");
        arcFull.setAttribute("class", "trp-clock-arc trp-clock-arc--full");
        arcFull.setAttribute("cx", "50");
        arcFull.setAttribute("cy", "50");
        arcFull.setAttribute("r", "42");
        arcFull.dataset.pass = String(segment.pass);
        arcLayer.append(arcFull);
      } else {
        const path = document.createElementNS(SVG_NS, "path");
        path.setAttribute("class", "trp-clock-arc");
        path.setAttribute("d", describeArc(50, 50, 42, startAngle, sweep));
        path.setAttribute("fill", "none");
        path.dataset.pass = String(segment.pass);
        arcLayer.append(path);
      }
    }
  }

  return { root, update };
}

export type TimeRangePickerWithSummaryHandle = TimeRangePickerHandle & {
  wrapper: HTMLDivElement;
};

export function TimeRangePickerWithSummary(opts: TimeRangePickerOptions): TimeRangePickerWithSummaryHandle {
  const { onChange, allowOvernight = true } = opts;

  const picker = TimeRangePicker({ ...opts, onChange: (rng) => { update(); onChange?.(rng); } });
  const clock = createRangeClock();

  const wrapper = el("div", { className: "trp-inline" }) as HTMLDivElement;
  const summary = el("div", { className: "trp-summary" }) as HTMLDivElement;
  const duration = el("span", { className: "trp-clock-duration" }, "") as HTMLSpanElement;
  summary.append(clock.root, duration);
  wrapper.append(picker.root, summary);

  function update(){
    try {
      const v = picker.getValue();
      const mins = diffMinutes24h(v.start, v.end, !!allowOvernight);
      clock.update(v.start, mins);
      duration.textContent = formatDuration(mins);
    } catch {}
  }
  update();

  return Object.assign(picker, { wrapper });
}
