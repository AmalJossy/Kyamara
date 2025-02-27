import { effectNames } from "../../constants";
import React from "react";
import { EffectConfig } from "../../types/effects.type";

export type FormFieldSettings = {
  type: "range" | "checkbox" | "select";
  label: string;
  value: number | boolean | string;
  min?: number;
  max?: number;
  options?: string[];
};

export type EffectControls = {
  [Effect in EffectConfig as Effect["effectName"]]: {
    id: Effect["effectName"];
    label: string;
    icon: React.ComponentType;
    fields: Record<keyof Effect["options"], FormFieldSettings>;
  };
}[EffectConfig["effectName"]];
