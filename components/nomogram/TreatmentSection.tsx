"use client";

import { Plus } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { SelectField } from "./SelectField";
import type { NomogramInputs } from "@/lib/nomogram";

interface Props {
  inputs: NomogramInputs;
  onChange: (k: keyof NomogramInputs, v: NomogramInputs[keyof NomogramInputs]) => void;
}

export function TreatmentSection({ inputs, onChange }: Props) {
  return (
    <SectionCard
      icon={<Plus size={14} color="#1e6b45" strokeWidth={2} />}
      iconBg="#e8f6ee"
      title="Treatment"
    >
      <div className="grid md:grid-cols-3 gap-4">
        <SelectField
          label="Surgery type"
          value={inputs.surg}
          onChange={(v) => onChange("surg", v as NomogramInputs["surg"])}
          options={[
            { value: "le", label: "Local excision (ref)" },
            { value: "pr", label: "Partial resection" },
            { value: "re", label: "Radical excision" },
          ]}
        />
        <SelectField
          label="Radiation therapy"
          value={inputs.rad ? "y" : "n"}
          onChange={(v) => onChange("rad", v === "y")}
          options={[
            { value: "n", label: "No (reference)" },
            { value: "y", label: "Yes" },
          ]}
        />
        <SelectField
          label="Primary site"
          value={inputs.site}
          onChange={(v) => onChange("site", v as "l" | "u")}
          options={[
            { value: "l", label: "Lower limb (ref)" },
            { value: "u", label: "Upper limb / shoulder" },
          ]}
        />
      </div>
    </SectionCard>
  );
}
