import React from "react";
import { FormFieldSettings } from "../types/effects";

interface EffectSettingsProps {
  settings: Record<string, FormFieldSettings>;
}

export const EffectSettings: React.FC<EffectSettingsProps> = ({ settings }) => {
  return (
    <div className="p-3 pb-4 border-t border-gray-800">
      {Object.entries(settings).map(([key, field]) => (
        <div key={key} className="mb-3 last:mb-0">
          <div className="flex justify-between mb-1">
            <label htmlFor={key} className="text-sm text-gray-400">
              {field.label}
            </label>
            {field.type === "range" && (
              <span className="text-sm text-gray-300">{field.value}</span>
            )}
          </div>

          {field.type === "range" && (
            <input
              type="range"
              id={key}
              name={key}
              min={field.min}
              max={field.max}
              defaultValue={field.value as number}
              step={1000}
              className="w-full accent-blue-500"
            />
          )}

          {field.type === "checkbox" && (
            <input
              type="checkbox"
              id={key}
              name={key}
              defaultChecked={field.value as boolean}
              className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
            />
          )}

          {field.type === "select" && (
            <select
              id={key}
              name={key}
              defaultValue={field.value as string}
              className="w-full rounded bg-gray-700 border-gray-600 text-sm text-gray-300 focus:border-blue-500 focus:ring-blue-500"
            >
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
};
