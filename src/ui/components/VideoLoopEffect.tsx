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
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              {/* Background circle */}
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              {/* Progress arc that grows */}
              <circle
                className="text-red-500 transition-all duration-300"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(processingProgress / 100) * 63} 63`}
                transform="rotate(-90 12 12)"
              />
            </svg>
            {/* Stop button (red circle) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
          </div>
        );
      case "active":
        return (
          <div className="w-8 h-8 relative">
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              {/* Full circle outline */}
              <circle
                className="text-red-500"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            {/* Red square in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
            </div>
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
      </div>
    </EffectRow>
  );
};

export default VideoLoopEffect;
