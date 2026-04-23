"use client";

import { User } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { SliderField } from "./SliderField";
import { SelectField } from "./SelectField";
import type { NomogramInputs } from "@/lib/nomogram";

interface Props {
  inputs: NomogramInputs;
  onChange: (k: keyof NomogramInputs, v: NomogramInputs[keyof NomogramInputs]) => void;
}

export function PatientSection({ inputs, onChange }: Props) {
  return (
    <SectionCard
      icon={<User size={14} color="#5b4f45" strokeWidth={1.75} />}
      iconBg="#f0ece6"
      title="Patient characteristics"
    >
      <div className="grid md:grid-cols-2 gap-5">
        <SliderField
          label="Age at diagnosis"
          id="age"
          min={10}
          max={95}
          step={1}
          value={inputs.age}
          unit=" yr"
          onChange={(v) => onChange("age", v)}
        />
        <SelectField
          label="Sex"
          value={inputs.sex}
          onChange={(v) => onChange("sex", v as "m" | "f")}
          options={[
            { value: "m", label: "Male (reference)" },
            { value: "f", label: "Female" },
          ]}
        />
      </div>
    </SectionCard>
  );
}
