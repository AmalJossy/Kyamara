import { useState } from "react";
import { EffectControls } from "../types/effects";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import { EffectConfig } from "../../types/effects.type";
import { EffectSettings } from "./EffectSettings";
interface EffectRowProps {
  effect: EffectControls;
  onApply: (config: EffectConfig) => void;
}

export default function EffectRow({ effect, onApply }: EffectRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const config = Object.fromEntries(formData);
    onApply({ effectName: effect.id, options: config });
  };
  return (
    <div className="rounded-md overflow-hidden bg-gray-850 hover:bg-gray-800 transition-colors">
      <div className="flex items-center justify-between p-3">
        <span className="text-white font-medium">{effect.label}</span>
        <div className="flex gap-2">
          <button
            onClick={() => onApply({ effectName: effect.id })}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-700 transition-colors"
            aria-label="Apply effect"
          >
            <PlayIcon className="w-4 h-4 text-blue-400" />
          </button>
          {effect.fields && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-700 transition-colors"
            >
              {isExpanded ? (
                <ChevronUpIcon className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
              )}
            </button>
          )}
        </div>
      </div>
      {isExpanded && effect.fields && (
        <form onSubmit={handleSubmit}>
          <EffectSettings settings={effect.fields} />
        </form>
      )}
    </div>
  );
}
