// ui/sections/test.ts
import { el } from "../../../core/dom";
import { Button } from "../../components/Button/Button";
import {
  Card,
  CardFooter,
} from "../../components/Card/Card";
import { Label } from "../../components/Label/Label";
import { Section } from "..";
import { TimeRangePicker } from "../../components/TimeRangePicker/TimeRangePicker";
import { Log } from "../../components/Log/Log";

export function createTestSection() {
  return new Section({
    id: "tab-test",
    label: "Test",
    mount(container) {
      const section = el("section", { id: "tab-test", className: "lg-section" }) as HTMLDivElement;

      // --- Log component demo
      const log = Log({ height: 220, mode: "js", maxLines: 1000 });

      // Seed a few demo lines
      log.add({ level: "info", text: "Log initialise" });
      log.add({ level: "debug", text: "const x = 42; // demo" });
      log.add({ level: "warn", text: "Requete lente: fetch('/api') > 1200ms" });
      log.add({ level: "error", text: "new Error('Boom')" });

      // --- TimeRangePicker dans une Card
      const lblTime = Label({
        text: "Plage horaire",
        hint: "Heures actives du mode 'Plage horaire'.",
        icon: "\u23F0",
      });

      const tr = TimeRangePicker({
        start: "09:00",
        end: "18:00",
        stepMinutes: 5,
        allowOvernight: true,
        picker: "auto",
        format: "12h",
        onChange: (r) => console.log("Range:", r.start, "->", r.end),
      });

      const kvRow = el("div", lblTime.root, tr.root);

      const btnApply = Button({
        label: "Appliquer",
        variant: "primary",
        onClick: () => {
          const v = tr.getValue();
          log.add({ level: "info", text: `[Apply] ${v.start} -> ${v.end}` });
        }
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

      // --- Logs card + controls
      const btnClear = Button({ label: "Clear", onClick: () => log.clear() });
      const btnWrap = Button({ label: "Wrap", onClick: () => log.setWrap(!(log.classList.contains("log--wrap"))) });
      let jsMode = true;
      const btnMode = Button({ label: "Mode: js", onClick: () => { jsMode = !jsMode; log.setMode(jsMode ? "js" : "plain"); btnMode.setLabel(`Mode: ${jsMode ? "js" : "plain"}`); } });
      const btnAdd = Button({ label: "Add line", onClick: () => log.add({ level: "debug", text: "function tick(){ return Date.now(); } // sample" }) });

      const logsCard = Card(
        { title: "Logs", variant: "default", padding: "lg" },
        log,
        CardFooter(btnClear as any, btnWrap as any, btnMode as any, btnAdd as any)
      );

      // Mount
      section.appendChild(timeCard);
      section.appendChild(logsCard);
      container.appendChild(section);

      // Cleanup
      return () => {
        container.replaceChildren();
      }
    },
  });
}
