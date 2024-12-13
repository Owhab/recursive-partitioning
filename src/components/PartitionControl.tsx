import React from 'react';

interface PartitionControlsProps {
  isRoot: boolean;
  onRemove: () => void;
  onSplitVertical: () => void;
  onSplitHorizontal: () => void;
}

export const PartitionControls: React.FC<PartitionControlsProps> = ({
  isRoot,
  onRemove,
  onSplitVertical,
  onSplitHorizontal,
}) => (
  <div className="absolute top-2 right-2 flex gap-2 w-full h-full items-center justify-center">
    {!isRoot && (
      <button
        onClick={onRemove}
        className="bg-white/20 hover:bg-white/30 rounded inline-block px-2"
        title="Remove partition"
      >
        <span>-</span>
      </button>
    )}
    <button
      onClick={onSplitVertical}
      className="bg-white/20 hover:bg-white/30 rounded inline-block px-2"
      title="Split vertically"
    >
      <span>v</span>
    </button>
    <button
      onClick={onSplitHorizontal}
      className="bg-white/20 hover:bg-white/30 rounded inline-block px-2"
      title="Split horizontally"
    >
      <span>h</span>
    </button>
  </div>
);