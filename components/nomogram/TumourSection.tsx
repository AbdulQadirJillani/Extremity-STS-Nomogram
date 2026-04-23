"use client";

import { Search } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { SliderField } from "./SliderField";
import { SelectField } from "./SelectField";
import { HISTO_OPTIONS } from "@/lib/nomogram";
import type { NomogramInputs } from "@/lib/nomogram";

interface Props {
  inputs: NomogramInputs;
  onChange: (k: keyof NomogramInputs, v: NomogramInputs[keyof NomogramInputs]) => void;
}

export function TumourSection({ inputs, onChange }: Props) {
  return (
    <SectionCard
      icon={<Search size={14} color="#b85000" strokeWidth={1.75} />}
      iconBg="#fef0e6"
      title="Tumour characteristics"
    >
      <div className="flex flex-col gap-5">
        <div className="grid md:grid-cols-2 gap-5">
          <SelectField
            label="Histological subtype"
            value={inputs.histo}
            onChange={(v) => onChange("histo", v)}
            options={HISTO_OPTIONS}
          />
          <SelectField
            label="Tumour grade"
            value={inputs.grade}
            onChange={(v) => onChange("grade", v as "g1" | "g2" | "hg")}
            options={[
              { value: "g1", label: "Grade I (reference)" },
              { value: "g2", label: "Grade II" },
              { value: "hg", label: "High-grade (III–IV)" },
            ]}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <SliderField
            label="Tumour size"
            id="size"
            min={0.5}
            max={30}
            step={0.5}
            value={inputs.size}
            unit=" cm"
            onChange={(v) => onChange("size", v)}
          />
          <SelectField
            label="Combined summary stage"
            value={inputs.stage}
            onChange={(v) => onChange("stage", v as NomogramInputs["stage"])}
            options={[
              { value: "loc", label: "Localised (reference)" },
              { value: "ext", label: "Regional — direct extension" },
              { value: "nodes", label: "Regional — lymph nodes only" },
              { value: "both", label: "Regional — extension + nodes" },
            ]}
          />
        </div>
      </div>
    </SectionCard>
  );
}
