import React from "react";

interface Props {
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  disabled?: boolean;
}

export const Slider = ({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className = "",
  disabled = false,
}: Props) => {
  const percentage = ((value[0] - min) / (max - min)) * 100;

  const activeColor = "#2563eb";     // blue-600
  const disabledColor = "#f97316";   // orange-500
  const trackBg = "#e5e7eb";

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      disabled={disabled}
      onChange={(e) => {
        if (!disabled) {
          onValueChange([Number(e.target.value)]);
        }
      }}
      className={`
        w-full h-2 rounded-full outline-none appearance-none
        ${disabled ? "cursor-not-allowed opacity-80" : "cursor-pointer"}

        /* WebKit thumb */
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:w-4
        [&::-webkit-slider-thumb]:h-4
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:bg-white
        [&::-webkit-slider-thumb]:border-2
        [&::-webkit-slider-thumb]:border-white
        [&::-webkit-slider-thumb]:shadow-md
        [&::-webkit-slider-thumb]:transition-transform
        ${!disabled && "[&::-webkit-slider-thumb]:hover:scale-110"}

        /* Firefox thumb */
        [&::-moz-range-thumb]:w-4
        [&::-moz-range-thumb]:h-4
        [&::-moz-range-thumb]:rounded-full
        [&::-moz-range-thumb]:bg-white
        [&::-moz-range-thumb]:border-2
        [&::-moz-range-thumb]:border-white
        [&::-moz-range-thumb]:box-shadow:0_1px_3px_rgba(0,0,0,0.4)

        ${className}
      `}
      style={{
        background: `linear-gradient(
          to right,
          ${disabled ? disabledColor : activeColor} ${percentage}%,
          ${trackBg} ${percentage}%
        )`,
      }}
    />
  );
};
