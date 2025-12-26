/**
 * Test Section
 * Demo section for testing components like TimeRangePicker and Log
 * State is persisted across sessions (timeRange, logSettings)
 */

import { el } from "../../../core/dom";
import { BaseSection } from "../core/BaseSection";
import { Button } from "../../components/Button/Button";
import { Card, CardFooter } from "../../components/Card/Card";
import { Label } from "../../components/Label/Label";
import { TimeRangePicker } from "../../components/TimeRangePicker/TimeRangePicker";
import { Log } from "../../components/Log/Log";
import * as wsApi from "../../../websocket/api";
import { initTestState, DEFAULT_TEST_STATE, TestStateController } from "./State";

export class TestSection extends BaseSection {
  constructor() {
    super({
      id: "tab-test",
      label: "Test",
    });
  }

  protected async build(container: HTMLElement): Promise<void> {
    const section = this.createContainer("test-section");
    container.appendChild(section);

    // Initialize state with fallback
    let state: TestStateController;
    try {
      state = await initTestState();
    } catch {
      // Fallback if state initialization fails
      state = {
        get: () => DEFAULT_TEST_STATE,
        set: () => {},
        update: () => {},
        save: () => {},
      } as TestStateController;
    }

    const currentState = state.get();

    // --- TimeRangePicker Card ---
    const lblTime = Label({
      text: "Plage horaire",
      hint: "Heures actives du mode 'Plage horaire'.",
      icon: "\u23F0",
    });

    const timeRange = TimeRangePicker({
      start: currentState.timeRange.start,
      end: currentState.timeRange.end,
      stepMinutes: 5,
      allowOvernight: true,
      picker: "auto",
      format: "12h",
      onChange: (range) => {
        // Auto-save on change
        state.update({
          timeRange: {
            start: range.start,
            end: range.end,
          },
        });
      },
    });

    const kvRow = el("div", lblTime.root, timeRange.root);

    // --- Log Component ---
    const log = Log({
      height: 220,
      mode: currentState.logSettings.mode,
      maxLines: 1000,
    });

    // Set initial wrap state
    if (currentState.logSettings.wrap) {
      log.setWrap(true);
    }

    // Seed demo lines
    log.add({ level: "info", text: "Log initialise" });
    log.add({ level: "debug", text: "const x = 42; // demo" });
    log.add({ level: "warn", text: "Requete lente: fetch('/api') > 1200ms" });
    log.add({ level: "error", text: "new Error('Boom')" });

    // Apply button
    const btnApply = Button({
      label: "Appliquer",
      variant: "primary",
      onClick: () => {
        const value = timeRange.getValue();
        log.add({ level: "info", text: `[Apply] ${value.start} -> ${value.end}` });
      },
    });

    const timeCard = Card(
      {
        title: "Parametres - Plage horaire",
        subtitle: "Choisis la fenetre d'activite",
        variant: "soft",
        padding: "lg",
        footer: CardFooter(btnApply as any),
      },
      kvRow
    );

    // --- Log Controls ---
    const btnClear = Button({
      label: "Clear",
      onClick: () => wsApi.chat("test"),
    });

    const btnWrap = Button({
      label: currentState.logSettings.wrap ? "Unwrap" : "Wrap",
      onClick: () => {
        const newWrap = !log.classList.contains("log--wrap");
        log.setWrap(newWrap);
        btnWrap.setLabel(newWrap ? "Unwrap" : "Wrap");

        // Auto-save on change
        state.update({
          logSettings: {
            ...state.get().logSettings,
            wrap: newWrap,
          },
        });
      },
    });

    const btnMode = Button({
      label: `Mode: ${currentState.logSettings.mode}`,
      onClick: () => {
        const currentMode = state.get().logSettings.mode;
        const newMode = currentMode === "js" ? "plain" : "js";
        log.setMode(newMode);
        btnMode.setLabel(`Mode: ${newMode}`);

        // Auto-save on change
        state.update({
          logSettings: {
            ...state.get().logSettings,
            mode: newMode,
          },
        });
      },
    });

    const btnAdd = Button({
      label: "Add line",
      onClick: () =>
        log.add({
          level: "debug",
          text: "function tick(){ return Date.now(); } // sample",
        }),
    });

    const logsCard = Card(
      { title: "Logs", variant: "default", padding: "lg" },
      log,
      CardFooter(btnClear as any, btnWrap as any, btnMode as any, btnAdd as any)
    );

    // Mount cards
    section.appendChild(timeCard);
    section.appendChild(logsCard);
  }
}
