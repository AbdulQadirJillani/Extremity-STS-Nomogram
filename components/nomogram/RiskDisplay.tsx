"use client";

import { TIER_STYLES, type NomogramResult } from "@/lib/nomogram";
import { cn } from "@/lib/utils";

interface Props {
  result: NomogramResult;
}

export function RiskDisplay({ result }: Props) {
  const { cif3, cif5, tier3, tier5, lp } = result;
  const t3 = TIER_STYLES[tier3];
  const t5 = TIER_STYLES[tier5];

  return (
    <div className="bg-white border border-parchment-border rounded-xl overflow-hidden shadow-card">
      {/* Header */}
      <div className="bg-accent px-5 py-4">
        <h2 className="font-display text-[1.05rem] text-white font-[400] leading-tight">
          Predicted risk
        </h2>
        <p className="text-[11.5px] text-white/60 mt-0.5 font-[300]">
          Cumulative incidence of cancer-specific death
        </p>
      </div>

      <div className="p-5 flex flex-col gap-5">
        {/* Tier badge */}
        <div
          className="inline-flex items-center gap-1.5 text-[11px] font-[500] rounded-md px-2.5 py-1 self-start border"
          style={{ background: t5.bg, color: t5.color, borderColor: t5.border }}
        >
          <span
            className="w-[7px] h-[7px] rounded-full flex-shrink-0"
            style={{ background: t5.color }}
          />
          {t5.label} · 5-year
        </div>

        {/* Horizon cards */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "3-year", val: cif3, tier: t3 },
            { label: "5-year", val: cif5, tier: t5 },
          ].map(({ label, val, tier }) => (
            <div
              key={label}
              className="rounded-lg p-4 border transition-all duration-300"
              style={{ background: tier.bg, borderColor: tier.border }}
            >
              <div
                className="text-[10.5px] font-[500] uppercase tracking-[.08em] mb-1.5"
                style={{ color: tier.color, opacity: 0.65 }}
              >
                {label}
              </div>
              <div
                className="font-display text-[2rem] font-[400] leading-none mb-1"
                style={{ color: tier.color }}
              >
                {val.toFixed(1)}%
              </div>
              <div
                className="text-[10.5px]"
                style={{ color: tier.color, opacity: 0.55 }}
              >
                CSD probability
              </div>
            </div>
          ))}
        </div>

        {/* Progress bars */}
        <div className="flex flex-col gap-3">
          {[
            { label: "3-year", val: cif3, tier: t3 },
            { label: "5-year", val: cif5, tier: t5 },
          ].map(({ label, val, tier }) => (
            <div key={label}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[11.5px] font-[500] text-ink-mid">{label} risk</span>
                <span className="text-[11.5px] text-ink-muted">{val.toFixed(1)}%</span>
              </div>
              <div className="h-[6px] bg-parchment-dark rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${Math.min(val, 100).toFixed(2)}%`,
                    background: tier.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Linear predictor */}
        <div className="flex justify-between items-center bg-parchment rounded-lg px-3.5 py-2.5">
          <span className="text-[11px] text-ink-muted">Linear predictor</span>
          <span className="text-[12px] font-[500] text-ink-mid tabular-nums">
            {lp.toFixed(4)}
          </span>
        </div>
      </div>
    </div>
  );
}
