import { StopIcon } from "@heroicons/react/24/solid";
import { messagesTypes } from "../../constants";
import { postMessageToTab } from "../utils/chromeApi";
import { effectNames } from "../../constants";
import { EffectConfig } from "../../types/effects.type";
import VideoLoopEffect from "../components/VideoLoopEffect";
import useStorage from "../../hooks/useStorage";

export default function Popup() {
  const [activeEffect, setActiveEffect] = useStorage<
    EffectConfig["effectName"] | null
  >("activeEffect", null);

  const handleApplyEffect = (config: EffectConfig) => {
    setActiveEffect(config.effectName);

    postMessageToTab({
      type: messagesTypes.ENABLE_EFFECT,
      payload: config,
    });
  };

  const handleRemoveEffects = () => {
    setActiveEffect(null);

    postMessageToTab({
      type: messagesTypes.DISABLE_EFFECT,
    });
  };

  return (
    <div className="w-80 bg-gray-900 text-white rounded-lg overflow-hidden shadow-xl">
      <div className="max-h-96 overflow-y-auto p-3 space-y-2">
        <VideoLoopEffect
          onApply={handleApplyEffect}
          isActive={activeEffect === effectNames.LOOP_VIDEO}
        />
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
