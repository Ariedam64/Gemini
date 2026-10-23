/**
 * Bug Report Modal - what the New report tab shows once a report went through
 *
 * Its reference to copy, a word on screenshots that did not make it, and the
 * way on (the buttons go in the modal footer).
 */

import { element } from "../../../styles/helpers";
import { Button } from "../../Button/Button";
import { describeBugReportError, type SubmitResult } from "../../../../modules/bugReport";
import { copyText } from "../../../../utils/clipboard";

type SentResult = Extract<SubmitResult, { ok: true }>;

export interface SentViewOptions {
  result: SentResult;
  onMyReports: () => void;
  onNewReport: () => void;
}

export interface SentViewHandle {
  root: HTMLElement;
  /** The footer buttons. */
  actions: HTMLElement[];
}

export function createSentView(options: SentViewOptions): SentViewHandle {
  const { report, attachmentFailures } = options.result;

  const code = element("span", { className: "bug-report__ref-code" }, report.ref);
  const copy = Button({
    label: "Copy",
    size: "sm",
    tooltip: "Copy the reference",
    onClick: async () => {
      const rootNode = root.getRootNode();
      const result = await copyText(report.ref, {
        valueNode: code,
        injectionRoot: rootNode instanceof ShadowRoot ? rootNode : null,
        disablePromptFallback: true,
      });
      if (!result.ok) copy.setLabel("Copy failed");
      else copy.setLabel(result.method === "selection" ? "Selected, press Ctrl+C" : "Copied");
    },
  });

  const root = element(
    "div",
    { className: "bug-report__success" },
    element("div", { className: "bug-report__success-title" }, "Thanks, your report was sent."),
    element("div", { className: "bug-report__ref" }, code, copy),
    element(
      "p",
      { className: "bug-report__note" },
      "Mention this reference if you talk about it on Discord. Its status, and any reply, show up in My reports.",
    ),
  );

  if (attachmentFailures.length) {
    const count = attachmentFailures.length;
    const reason = describeBugReportError(attachmentFailures[0].error);
    root.appendChild(
      element(
        "div",
        { className: "bug-report__notice" },
        element(
          "span",
          null,
          `${count} screenshot${count > 1 ? "s" : ""} could not be uploaded, but the report itself arrived. ${reason}`,
        ),
      ),
    );
  }

  const actions = [
    Button({ label: "See my reports", onClick: options.onMyReports }),
    Button({ label: "New report", variant: "primary", onClick: options.onNewReport }),
  ];
  return { root, actions };
}
