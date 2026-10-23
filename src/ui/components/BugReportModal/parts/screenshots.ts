/**
 * Bug Report Modal - the report's screenshots
 *
 * At most three: the game frame taken when the form opens, a tab capture
 * where the browser allows it, and images added from a file, dropped or
 * pasted. Every one is shrunk by the core's normalizer before it shows here,
 * so what the player sees is exactly what gets sent.
 */

import { element } from "../../../styles/helpers";
import { Button, type ButtonHandle } from "../../Button/Button";
import {
  BUG_REPORT_LIMITS,
  ImageNormalizeError,
  MGBugReport,
  canCaptureScreen,
  captureScreenFrame,
  normalizeImage,
  normalizedImageBlob,
  type AttachmentKind,
  type BugReportAttachment,
  type ImageSource,
  type NormalizedImage,
} from "../../../../modules/bugReport";
import { MGEnvironment } from "../../../../modules/environment";
import { formatKb } from "./dom";

interface Shot {
  id: number;
  kind: AttachmentKind;
  image: NormalizedImage;
  url: string;
  /** Taken by the form itself, so it may be retaken when it goes stale. */
  auto: boolean;
  takenAt: number;
}

export interface ScreenshotSummary {
  kind: AttachmentKind;
  mime: string;
  width: number;
  height: number;
  bytes: number;
}

export interface ScreenshotsOptions {
  /** Hides the report window while a tab capture takes its frame, so it is not in the picture. */
  setWindowHidden: (hidden: boolean) => void;
}

export interface ScreenshotsHandle {
  root: HTMLElement;
  attachments(): BugReportAttachment[];
  /** What the preview shows in place of the image bytes. */
  summary(): ScreenshotSummary[];
  /** Images still being prepared. The report waits for them. */
  pending(): number;
  /** Takes the game frame the form opens with. Silent when the game cannot be read. */
  takeAutoGameShot(): void;
  /** Retakes that frame when the form comes back after a while, unless the player removed it. */
  refreshAutoGameShot(): void;
  handlePaste(event: ClipboardEvent): void;
  clear(): void;
  destroy(): void;
}

const MAX_SHOTS = BUG_REPORT_LIMITS.attachments;
const STALE_AFTER_MS = 20_000;
const ACCEPTED_TYPES = "image/png,image/jpeg,image/webp,image/gif,image/bmp";
const KIND_LABELS: Record<AttachmentKind, string> = { game: "Game view", screen: "Screen capture", upload: "Image" };

function isTextField(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || /^(input|textarea)$/i.test(target.tagName);
}

function imageFiles(list: FileList | DataTransferItemList | null | undefined): File[] {
  if (!list) return [];
  const out: File[] = [];
  for (const item of Array.from<File | DataTransferItem>(list)) {
    const file = "getAsFile" in item ? (item.kind === "file" ? item.getAsFile() : null) : item;
    if (file && file.type.startsWith("image/")) out.push(file);
  }
  return out;
}

function errorName(error: unknown): string {
  return error && typeof error === "object" && "name" in error ? String(error.name) : "";
}

export function createScreenshots(options: ScreenshotsOptions): ScreenshotsHandle {
  let nextId = 0;
  let shots: Shot[] = [];
  let pendingCount = 0;
  /** The player removed the automatic frame: it stays gone. */
  let autoDismissed = false;
  let enlargedId: number | null = null;
  let destroyed = false;
  const timers = new Set<ReturnType<typeof setTimeout>>();

  const grid = element("div", { className: "bug-report__shots" });
  const large = element("div", { className: "bug-report__shot-large" });
  large.hidden = true;
  const message = element("p", { className: "bug-report__hint", role: "status" });
  const counter = element("span", { className: "bug-report__hint" });

  const fileInput = element("input", { type: "file", accept: ACCEPTED_TYPES, multiple: true });
  fileInput.hidden = true;

  const room = () => MAX_SHOTS - shots.length - pendingCount;
  const say = (text: string) => {
    message.textContent = text;
  };

  const addButton: ButtonHandle = Button({ label: "Add image", size: "sm", onClick: () => fileInput.click() });
  const gameButton: ButtonHandle = Button({ label: "Add game view", size: "sm", onClick: () => void addGameShot(false) });
  const screenButton: ButtonHandle = Button({
    label: "Capture screen",
    size: "sm",
    tooltip: "Takes a picture of this tab, game menus included. Your browser asks first.",
    onClick: () => void captureScreen(),
  });
  // Blocked inside the Discord activity (and it would show Discord itself), missing on phones.
  const screenAvailable = canCaptureScreen() && !MGEnvironment.isDiscord() && !MGEnvironment.isMobile();

  const bar = element("div", { className: "bug-report__shot-bar" }, addButton, gameButton);
  if (screenAvailable) bar.append(screenButton);
  bar.append(counter);

  const root = element("div", { className: "bug-report__stack" }, grid, large, bar, message, fileInput);

  function render(): void {
    const tiles: HTMLElement[] = shots.map(tile);
    for (let i = 0; i < pendingCount; i++) {
      tiles.push(
        element("div", { className: "bug-report__shot is-pending" }, element("span", { className: "bug-report__shot-label" }, "Preparing...")),
      );
    }
    grid.replaceChildren(...tiles);
    const full = room() <= 0;
    addButton.setDisabled(full);
    screenButton.setDisabled(full);
    gameButton.setDisabled(full);
    gameButton.hidden = shots.some((shot) => shot.kind === "game");
    counter.textContent = shots.length
      ? `${shots.length} of ${MAX_SHOTS}.${full ? "" : " You can also paste an image with Ctrl+V."}`
      : "Paste an image with Ctrl+V, or add one.";
    renderLarge();
  }

  function tile(shot: Shot): HTMLElement {
    const img = element("img", { className: "bug-report__shot-img", src: shot.url, alt: KIND_LABELS[shot.kind] });
    const label = element("span", { className: "bug-report__shot-label" }, `${KIND_LABELS[shot.kind]}, ${formatKb(shot.image.bytes)}`);
    const remove = element("button", {
      className: "bug-report__shot-remove",
      type: "button",
      title: "Remove this screenshot",
      "aria-label": "Remove this screenshot",
    }, "×");
    remove.addEventListener("click", (event) => {
      event.stopPropagation();
      removeShot(shot.id);
    });
    const el = element("div", {
      className: "bug-report__shot",
      tabIndex: 0,
      role: "button",
      title: "Click to see it larger",
    }, img, label, remove);
    const toggle = () => {
      enlargedId = enlargedId === shot.id ? null : shot.id;
      renderLarge();
    };
    el.addEventListener("click", toggle);
    el.addEventListener("keydown", (event) => {
      // Keys on the remove button are the button's own.
      if (event.target !== el) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
    });
    return el;
  }

  function renderLarge(): void {
    const shot = shots.find((entry) => entry.id === enlargedId);
    if (!shot) {
      enlargedId = null;
      large.hidden = true;
      large.replaceChildren();
      return;
    }
    const close = Button({ label: "Close", size: "sm", onClick: () => { enlargedId = null; renderLarge(); } });
    const remove = Button({ label: "Remove", size: "sm", variant: "danger", onClick: () => removeShot(shot.id) });
    large.replaceChildren(
      element("img", { src: shot.url, alt: KIND_LABELS[shot.kind] }),
      element(
        "p",
        { className: "bug-report__hint" },
        `${shot.image.width} x ${shot.image.height}, ${formatKb(shot.image.bytes)}. Check that nothing private shows before you send it.`,
      ),
      element("div", { className: "bug-report__shot-bar" }, remove, close),
    );
    large.hidden = false;
  }

  function removeShot(id: number): void {
    const shot = shots.find((entry) => entry.id === id);
    if (!shot) return;
    if (shot.auto) autoDismissed = true;
    URL.revokeObjectURL(shot.url);
    shots = shots.filter((entry) => entry.id !== id);
    render();
  }

  function store(kind: AttachmentKind, image: NormalizedImage, auto: boolean, replaceId?: number): void {
    const index = replaceId === undefined ? -1 : shots.findIndex((entry) => entry.id === replaceId);
    // The shot being retaken was removed meanwhile: the new frame goes nowhere.
    if (replaceId !== undefined && index < 0) return;
    if (index < 0 && room() <= 0) return;
    const shot: Shot = {
      id: ++nextId,
      kind,
      image,
      url: URL.createObjectURL(normalizedImageBlob(image)),
      auto,
      takenAt: Date.now(),
    };
    if (index >= 0) {
      URL.revokeObjectURL(shots[index].url);
      if (enlargedId === shots[index].id) enlargedId = shot.id;
      shots = [...shots.slice(0, index), shot, ...shots.slice(index + 1)];
    } else {
      shots = [...shots, shot];
    }
  }

  /** Normalizes `source` and adds it, with a placeholder meanwhile. */
  async function addSource(source: ImageSource, kind: AttachmentKind, auto = false, replaceId?: number): Promise<boolean> {
    if (replaceId === undefined && room() <= 0) {
      if (!auto) say(`At most ${MAX_SHOTS} screenshots per report.`);
      return false;
    }
    if (replaceId === undefined) pendingCount++;
    render();
    try {
      const image = await normalizeImage(source);
      if (replaceId === undefined) pendingCount--;
      if (destroyed) return false;
      store(kind, image, auto, replaceId);
      say("");
      return true;
    } catch (error) {
      if (replaceId === undefined) pendingCount--;
      if (!auto) say(error instanceof ImageNormalizeError ? error.message : "This image could not be read.");
      return false;
    } finally {
      if (!destroyed) render();
    }
  }

  async function addGameShot(auto: boolean, replaceId?: number): Promise<void> {
    const frame = MGBugReport.grabGameFrame();
    if (!frame) {
      if (!auto) say("The game view cannot be captured right now.");
      return;
    }
    await addSource(frame, "game", auto, replaceId);
  }

  async function addFiles(files: File[]): Promise<void> {
    const fits = Math.max(0, room());
    for (const file of files.slice(0, fits)) await addSource(file, "upload");
    const left = files.length - fits;
    // Said last, or the next image ready would clear it.
    if (left > 0) say(`Only ${MAX_SHOTS} screenshots fit in a report, so ${left} ${left > 1 ? "were" : "was"} left out.`);
  }

  async function captureScreen(): Promise<void> {
    if (room() <= 0) return;
    screenButton.setLoading(true);
    try {
      // Straight from the click: the browser only allows the prompt then.
      const frame = await captureScreenFrame({
        beforeFrame: () => options.setWindowHidden(true),
        afterFrame: () => options.setWindowHidden(false),
      });
      await addSource(frame, "screen");
    } catch (error) {
      say(errorName(error) === "NotAllowedError" ? "Screen capture was cancelled." : "Screen capture is not available in this browser.");
    } finally {
      screenButton.setLoading(false);
      if (!destroyed) render();
    }
  }

  const onFileChange = () => {
    const files = imageFiles(fileInput.files);
    fileInput.value = "";
    void addFiles(files);
  };
  const onDragOver = (event: DragEvent) => {
    if (!event.dataTransfer?.types.includes("Files")) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };
  const onDrop = (event: DragEvent) => {
    const files = imageFiles(event.dataTransfer?.files);
    if (!files.length) return;
    event.preventDefault();
    void addFiles(files);
  };
  fileInput.addEventListener("change", onFileChange);
  root.addEventListener("dragover", onDragOver);
  root.addEventListener("drop", onDrop);

  render();

  return {
    root,
    attachments: () => shots.map((shot) => ({ ...shot.image, kind: shot.kind })),
    summary: () =>
      shots.map(({ kind, image }) => ({ kind, mime: image.mime, width: image.width, height: image.height, bytes: image.bytes })),
    pending: () => pendingCount,
    takeAutoGameShot() {
      autoDismissed = false;
      // After the window has painted: the grab renders a frame, which should
      // not hold up the window opening.
      const timer = setTimeout(() => {
        timers.delete(timer);
        if (!destroyed) void addGameShot(true);
      }, 0);
      timers.add(timer);
    },
    refreshAutoGameShot() {
      if (autoDismissed || pendingCount) return;
      const auto = shots.find((shot) => shot.auto);
      if (!auto) {
        if (!shots.some((shot) => shot.kind === "game")) void addGameShot(true);
        return;
      }
      if (Date.now() - auto.takenAt >= STALE_AFTER_MS) void addGameShot(true, auto.id);
    },
    handlePaste(event) {
      const files = imageFiles(event.clipboardData?.items ?? event.clipboardData?.files);
      if (!files.length) return;
      // Text pasted into a field stays text; an image alone is taken from anywhere in the form.
      if (isTextField(event.target) && event.clipboardData?.types.includes("text/plain")) return;
      event.preventDefault();
      void addFiles(files.slice(0, 1));
    },
    clear() {
      for (const shot of shots) URL.revokeObjectURL(shot.url);
      shots = [];
      autoDismissed = false;
      enlargedId = null;
      say("");
      render();
    },
    destroy() {
      destroyed = true;
      for (const timer of timers) clearTimeout(timer);
      timers.clear();
      for (const shot of shots) URL.revokeObjectURL(shot.url);
      shots = [];
      fileInput.removeEventListener("change", onFileChange);
      root.removeEventListener("dragover", onDragOver);
      root.removeEventListener("drop", onDrop);
    },
  };
}
