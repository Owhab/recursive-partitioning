import React from 'react';
import { SnapIndicator } from './SnapIndicator';
import { SNAP_POINTS } from '../utils/constants';

interface DividerProps {
  isVertical: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  ratio: number;
  isDragging: boolean;
}

export const Divider: React.FC<DividerProps> = ({
  isVertical,
  onMouseDown,
  ratio,
  isDragging,
}) => {
  const dividerClassName = isVertical
    ? 'w-1 cursor-col-resize hover:bg-white/20'
    : 'h-1 cursor-row-resize hover:bg-white/20';

  const isNearSnapPoint = SNAP_POINTS.some(
    point => Math.abs(ratio - point) < 0.05
  );

  return (
    <div
      className={`relative ${dividerClassName}`}
      onMouseDown={onMouseDown}
    >
      {SNAP_POINTS.map((point) => (
        <SnapIndicator
          key={point}
          ratio={point}
          isVertical={isVertical}
          isVisible={isDragging}
        />
      ))}
      <SnapIndicator
        ratio={ratio}
        isVertical={isVertical}
        isVisible={isDragging && !isNearSnapPoint}
      />
    </div>
  );
};