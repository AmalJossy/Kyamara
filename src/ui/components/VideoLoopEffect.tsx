import EffectRow from "./EffectRow";
import {
  VideoCameraIcon,
  PlayIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import { useId, useState, useEffect } from "react";
import { EffectConfig } from "../../types/effects.type";
import { effectNames } from "../../constants";

type VideoLoopEffectProps = {
  onApply: (config: EffectConfig) => void;
  isActive: boolean;
};

const VideoLoopEffect = ({ onApply, isActive }: VideoLoopEffectProps) => {
  const id = useId();
  const [duration, setDuration] = useState(10000);
  const [status, setStatus] = useState<"inactive" | "processing" | "active">(
    isActive ? "active" : "inactive"
  );
  const [processingProgress, setProcessingProgress] = useState(0);

  useEffect(() => {
    if (isActive && status === "inactive") {
      setStatus("active");
    } else if (!isActive && status === "active") {
      setStatus("inactive");
    }
  }, [isActive]);

  const handleSubmit = () => {
    if (status === "inactive") {
      setStatus("processing");
      setProcessingProgress(0);
      onApply({
        effectName: effectNames.LOOP_VIDEO,
        options: { duration },
      });

      // Start the progress interval
      const interval = setInterval(() => {
        setProcessingProgress((prev) => {
          const newProgress = prev + 100 / (duration / 1000);
          if (newProgress >= 100) {
            clearInterval(interval);
            setStatus("active");
            return 100;
          }
          return newProgress;
        });
      }, 1000);
    }
  };

  const getActionButton = () => {
    switch (status) {
      case "inactive":
        return (
          <button
            onClick={handleSubmit}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 shadow-md"
            aria-label="Apply video loop effect"
          >
            <PlayIcon className="w-4 h-4 text-white" />
          </button>
        );
      case "processing":
        return (
          <div className="w-8 h-8 relative">
            <svg className="w-8 h-8 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
              {Math.round(processingProgress)}%
            </span>
          </div>
        );
      case "active":
        return (
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-600 shadow-md">
            <CheckIcon className="w-4 h-4 text-white" />
          </div>
        );
    }
  };

  return (
    <EffectRow
      label="Video Loop"
      icon={<VideoCameraIcon className="w-5 h-5 text-blue-400" />}
      action={getActionButton()}
    >
      <div className="py-4 px-2">
        <div className="flex justify-between mb-3">
          <label htmlFor={id} className="text-sm font-medium text-gray-300">
            Loop Duration
          </label>
          <span className="text-sm font-medium text-gray-300 group-hover:text-blue-400 transition-colors duration-200">
            {duration / 1000}s
          </span>
        </div>
        <div className="group">
          <input
            type="range"
            id={id}
            name="loop-duration"
            min={0}
            max={20000}
            value={duration}
            step={1000}
            onChange={(e) => setDuration(+e.target.value)}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700 accent-blue-500 hover:accent-blue-400 transition-all duration-200"
            aria-valuetext={`${duration / 1000} seconds`}
            disabled={status !== "inactive"}
          />
        </div>
        {status === "processing" && (
          <div className="mt-3 text-xs text-gray-400">
            Recording video loop... {Math.round(processingProgress)}% complete
          </div>
        )}
      </div>
    </EffectRow>
  );
};

export default VideoLoopEffect;
