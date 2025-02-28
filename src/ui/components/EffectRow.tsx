import { useState, useId } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

interface EffectRowProps {
  label: string;
  icon: React.ReactNode;
  action: React.ReactNode;
  children?: React.ReactNode;
}

export default function EffectRow({
  label,
  icon,
  action,
  children,
}: EffectRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const headerId = useId();
  const contentId = useId();

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleExpanded();
    }
  };

  return (
    <div
      className="rounded-md overflow-hidden bg-gray-850 hover:bg-gray-800 transition-colors"
      role="region"
      aria-labelledby={headerId}
    >
      <div className="flex items-center gap-3 p-3" id={headerId}>
        <div className="flex items-center gap-2">
          <span
            className="w-5 h-5 flex items-center justify-center"
            aria-hidden="true"
          >
            {icon}
          </span>
          <span className="text-white font-medium">{label}</span>
        </div>
        <div className="flex gap-2 ml-auto">
          {action}
          {children && (
            <button
              onClick={toggleExpanded}
              onKeyDown={handleKeyDown}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={isExpanded}
              aria-controls={contentId}
              aria-label={`${isExpanded ? "Hide" : "Show"} ${label} settings`}
            >
              {isExpanded ? (
                <ChevronUpIcon
                  className="w-4 h-4 text-gray-400"
                  aria-hidden="true"
                />
              ) : (
                <ChevronDownIcon
                  className="w-4 h-4 text-gray-400"
                  aria-hidden="true"
                />
              )}
            </button>
          )}
        </div>
      </div>
      {isExpanded && (
        <div id={contentId} role="region" aria-labelledby={headerId}>
          {children}
        </div>
      )}
    </div>
  );
}
