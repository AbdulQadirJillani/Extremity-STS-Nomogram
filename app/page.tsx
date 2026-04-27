"use client";

import { useState, useMemo } from "react";
import { PatientSection } from "@/components/nomogram/PatientSection";
import { TumourSection } from "@/components/nomogram/TumourSection";
import { TreatmentSection } from "@/components/nomogram/TreatmentSection";
import { RiskDisplay } from "@/components/nomogram/RiskDisplay";
import { DEFAULT_INPUTS, computeRisk } from "@/lib/nomogram";
import type { NomogramInputs } from "@/lib/nomogram";

export default function Home() {
  const [inputs, setInputs] = useState<NomogramInputs>(DEFAULT_INPUTS);

  const result = useMemo(() => computeRisk(inputs), [inputs]);

  function handleChange<K extends keyof NomogramInputs>(
    key: K,
    value: NomogramInputs[K]
  ) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="min-h-screen bg-parchment">

      {/* ── HEADER ── */}
      <header className="bg-accent border-b border-white/10">
        <div className="max-w-[1160px] mx-auto px-6 py-8">
          <div className="flex items-start justify-between gap-8 flex-wrap">

            {/* Left */}
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-[7px] h-[7px] rounded-full bg-emerald-400 animate-pulse-dot flex-shrink-0" />
                <span className="text-[10.5px] font-[500] uppercase tracking-[.1em] text-white/55">
                  Fine-Gray Competing Risks · TRIPOD+AI Compliant · SEER 2004–2018
                </span>
              </div>

              <h1 className="font-display text-[clamp(1.7rem,3.2vw,2.45rem)] text-white leading-[1.12] mb-3">
                Extremity STS{" "}
                <span className="italic text-white/70">Cancer-Specific Death</span>
                <br />
                <span className="text-white/90">Nomogram</span>
              </h1>

              <p className="text-[13.5px] text-white/55 font-[300] leading-[1.65] max-w-[540px]">
                Individualised prediction of 3- and 5-year cumulative incidence of
                cancer-specific death in patients with extremity soft tissue sarcoma
                undergoing limb-sparing surgery, accounting for competing risk of
                non-cancer mortality.
              </p>
            </div>

            {/* Right — meta badges */}
            <div className="hidden md:flex flex-col items-end gap-2 flex-shrink-0 self-center">
              {[
                ["Development", "n = 7,840"],
                ["Validation", "n = 6,203"],
                ["C-index", "0.807 (ext.)"],
                ["Brier score", "0.086 (ext.)"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-md px-3 py-1.5"
                >
                  <span className="text-[11px] text-white/50">{label}</span>
                  <span className="text-[11px] font-[500] text-white">{value}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="max-w-[1160px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-7 items-start">

          {/* ── LEFT: FORM ── */}
          <div className="flex flex-col gap-5">

            {/* Form card */}
            <div className="bg-white border border-parchment-border rounded-2xl overflow-hidden shadow-card">
              <PatientSection inputs={inputs} onChange={handleChange} />
              <TumourSection inputs={inputs} onChange={handleChange} />
              <TreatmentSection inputs={inputs} onChange={handleChange} />
            </div>

            {/* Quick-reset */}
            <div className="flex justify-end">
              <button
                onClick={() => setInputs(DEFAULT_INPUTS)}
                className="text-[12px] text-ink-muted hover:text-accent transition-colors border border-parchment-border hover:border-accent-border rounded-md px-3.5 py-1.5 bg-white"
              >
                Reset to defaults
              </button>
            </div>

          </div>

          {/* ── RIGHT: RESULTS ── */}
          <div className="flex flex-col gap-5">
            <RiskDisplay result={result} />
          </div>

        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-parchment-border mt-8 py-6 px-6 text-center">
        <p className="text-[11px] text-ink-muted">
          SEER data: Surveillance, Epidemiology, and End Results Program, National Cancer Institute
        </p>
      </footer>

    </div>
  );
}
