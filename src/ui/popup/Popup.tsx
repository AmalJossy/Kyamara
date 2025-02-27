import { StopIcon } from "@heroicons/react/24/solid";
import EffectRow from "../components/EffectRow";
import { EffectControls } from "../types/effects";
import { effectNames, messagesTypes } from "../../constants";
import { postMessageToTab } from "../utils/chromeApi";
import { PlayIcon } from "@heroicons/react/24/solid";
import { EffectConfig } from "../../types/effects.type";
const effects: EffectControls[] = [
  {
    id: effectNames.LOOP_VIDEO,
    label: "Loop Video",
    icon: PlayIcon,
    fields: {
      duration: {
        type: "range",
        label: "Duration",
        value: 10000,
        min: 1000,
        max: 30000,
      },
    },
  },
  // Add more effects as needed
];

export default function Popup() {
  const handleApplyEffect = (config: EffectConfig) => {
    postMessageToTab({
      type: messagesTypes.ENABLE_EFFECT,
      payload: config,
    });
  };

  const handleRemoveEffects = () => {
    postMessageToTab({
      type: messagesTypes.DISABLE_EFFECT,
    });
  };

  return (
    <div className="w-80 bg-gray-900 text-white rounded-lg overflow-hidden shadow-xl">
      <div className="max-h-96 overflow-y-auto p-3 space-y-2">
        {effects.map((effect) => (
          <EffectRow
            key={effect.id}
            effect={effect}
            onApply={handleApplyEffect}
          />
        ))}
      </div>
      <div className="p-3 border-t border-gray-800">
        <button
          onClick={handleRemoveEffects}
          className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-red-400 hover:text-red-300 py-2 px-4 rounded transition-colors border border-gray-700"
        >
          <StopIcon className="w-4 h-4" />
          <span className="font-medium">Remove All Effects</span>
        </button>
      </div>
    </div>
  );
}
