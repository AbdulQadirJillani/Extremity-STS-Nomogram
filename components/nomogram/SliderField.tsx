"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface SliderFieldProps {
  label: string;
  id: string;
  min: number;
  max: number;
  step: number;
  value: number;
  unit: string;
  onChange: (v: number) => void;
}

export function SliderField({
  label, id, min, max, step, value, unit, onChange,
}: SliderFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <Label htmlFor={id}>{label}</Label>
        <span className="flex items-baseline gap-0.5">
          <span className="font-display text-[1.15rem] font-[400] text-accent leading-none">
            {value % 1 === 0 ? value : value.toFixed(1)}
          </span>
          <span className="text-[10.5px] text-ink-faint">{unit}</span>
        </span>
      </div>
      <Slider
        id={id}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        className="my-1"
      />
      <div className="flex justify-between text-[10px] text-ink-ghost">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}
