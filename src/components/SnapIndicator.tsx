import React from 'react';

interface SnapIndicatorProps {
  ratio: number;
  isVertical: boolean;
  isVisible: boolean;
}

export const SnapIndicator: React.FC<SnapIndicatorProps> = ({
  ratio,
  isVertical,
  isVisible,
}) => {
  const percentage = Math.round(ratio * 100);
  const position = `${percentage}%`;

  return (
    <div
      className={`absolute ${
        isVertical ? 'top-1/2 -translate-y-1/2' : 'left-1/2 -translate-x-1/2'
      } pointer-events-none transition-opacity duration-200`}
      style={{
        opacity: isVisible ? 1 : 0,
        [isVertical ? 'left' : 'top']: position,
      }}
    >
      <div
        className={`bg-white/90 text-black text-xs font-medium px-2 py-1 rounded-md
          ${isVertical ? '-translate-x-1/2' : '-translate-y-1/2'}`}
      >
        {percentage}%
      </div>
    </div>
  );
};