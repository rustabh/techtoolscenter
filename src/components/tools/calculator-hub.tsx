"use client";

import { useMemo, type ComponentType } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { cn } from "@/lib/utils";
import { Select } from "@/components/ui/select";

import ScientificCalculator from "./scientific-calculator";
import PercentageCalculator from "./percentage-calculator";
import GstCalculator from "./gst-calculator";
import DiscountCalculator from "./discount-calculator";
import EmiCalculator from "./emi-calculator";
import BmiCalculator from "./bmi-calculator";
import AgeCalculator from "./age-calculator";
import TipCalculator from "./tip-calculator";
import FuelCostCalculator from "./fuel-cost-calculator";
import {
  BasicCalc, ProgrammerCalc, LoanCalc, SipCalc, CompoundInterestCalc, SimpleInterestCalc,
  CurrencyCalc, BmrCalc, BodyFatCalc, DateDiffCalc, TimeCalc, WorkingDaysCalc, ElectricityCalc, RomanCalc,
} from "./calc-modules";

interface Mode { id: string; label: string; group: string; Cmp: ComponentType }

const MODES: Mode[] = [
  { id: "basic", label: "Basic", group: "General", Cmp: BasicCalc },
  { id: "scientific", label: "Scientific", group: "General", Cmp: ScientificCalculator },
  { id: "programmer", label: "Programmer", group: "General", Cmp: ProgrammerCalc },
  { id: "percentage", label: "Percentage", group: "General", Cmp: PercentageCalculator },

  { id: "gst", label: "GST", group: "Finance", Cmp: GstCalculator },
  { id: "discount", label: "Discount", group: "Finance", Cmp: DiscountCalculator },
  { id: "emi", label: "EMI", group: "Finance", Cmp: EmiCalculator },
  { id: "loan", label: "Loan", group: "Finance", Cmp: LoanCalc },
  { id: "sip", label: "SIP", group: "Finance", Cmp: SipCalc },
  { id: "compound", label: "Compound Interest", group: "Finance", Cmp: CompoundInterestCalc },
  { id: "simple", label: "Simple Interest", group: "Finance", Cmp: SimpleInterestCalc },
  { id: "currency", label: "Currency", group: "Finance", Cmp: CurrencyCalc },
  { id: "tip", label: "Tip", group: "Finance", Cmp: TipCalculator },

  { id: "bmi", label: "BMI", group: "Health", Cmp: BmiCalculator },
  { id: "bmr", label: "BMR", group: "Health", Cmp: BmrCalc },
  { id: "bodyfat", label: "Body Fat", group: "Health", Cmp: BodyFatCalc },

  { id: "age", label: "Age", group: "Date & Time", Cmp: AgeCalculator },
  { id: "datediff", label: "Date Difference", group: "Date & Time", Cmp: DateDiffCalc },
  { id: "time", label: "Time", group: "Date & Time", Cmp: TimeCalc },
  { id: "workdays", label: "Working Days", group: "Date & Time", Cmp: WorkingDaysCalc },

  { id: "fuel", label: "Fuel Cost", group: "Utility", Cmp: FuelCostCalculator },
  { id: "electricity", label: "Electricity Bill", group: "Utility", Cmp: ElectricityCalc },
  { id: "roman", label: "Roman Numeral", group: "Utility", Cmp: RomanCalc },
];

const GROUPS = ["General", "Finance", "Health", "Date & Time", "Utility"];

export default function CalculatorHub() {
  const { value: active, set: setActive } = useLocalStorage<string>("ttc:calc-hub", "basic");
  const current = useMemo(() => MODES.find((m) => m.id === active) ?? MODES[0], [active]);
  const Cmp = current.Cmp;

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      {/* Compact dropdown on mobile — 22 calculators as a scrolling button list ate the whole first screen before. */}
      <div className="lg:hidden">
        <Select aria-label="Choose a calculator" value={active} onChange={(e) => setActive(e.target.value)}>
          {GROUPS.map((g) => (
            <optgroup key={g} label={g}>
              {MODES.filter((m) => m.group === g).map((m) => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </optgroup>
          ))}
        </Select>
      </div>

      <aside className="hidden lg:sticky lg:top-20 lg:block lg:h-fit">
        <nav className="space-y-4 rounded-2xl border border-border bg-card p-3" aria-label="Calculators">
          {GROUPS.map((g) => (
            <div key={g}>
              <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{g}</p>
              <div className="space-y-0.5">
                {MODES.filter((m) => m.group === g).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setActive(m.id)}
                    aria-current={active === m.id ? "page" : undefined}
                    className={cn(
                      "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      active === m.id ? "bg-primary text-primary-foreground font-medium" : "hover:bg-secondary"
                    )}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <section aria-live="polite">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-lg font-semibold">{current.label} Calculator</h2>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">{current.group}</span>
        </div>
        <Cmp />
      </section>
    </div>
  );
}
