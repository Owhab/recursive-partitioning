import React from 'react';
import { generateRandomColor } from '../../hooks/useGenerateColor';
import { usePartitions } from '../../hooks/usePartions';
import { PartitionType } from '../../types';

const Partition = ({ partition, style }: {
  partition: PartitionType,
  style?: React.CSSProperties
}) => {
  const isRoot = partition.id === 0;
  const { addPartition, removePartition, handleSplit } = usePartitions();

  const splitColor = (color: string) => {
    // Convert hex to RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Slightly modify the colors
    const newColor1 = `rgb(${Math.min(r + 20, 255)}, ${Math.min(g + 20, 255)}, ${Math.min(b + 20, 255)})`;
    const newColor2 = `rgb(${Math.max(r - 20, 0)}, ${Math.max(g - 20, 0)}, ${Math.max(b - 20, 0)})`;

    return [newColor1, newColor2];
  };

  const handleAddPartition = (direction: 'vertical' | 'horizontal') => {
    // Split the current partition's color
    const [color1, color2] = splitColor(partition.color);

    // Create two new partitions, each with a variation of the original color
    const newPartition1 = {
      id: Math.random(),
      name: 'Partition',
      color: color1,
      direction: direction,
      children: [],
    };

    const newPartition2 = {
      id: Math.random(),
      name: 'Partition',
      color: color2,
      direction: direction,
      children: [],
    };

    // Add both partitions
    addPartition(partition.id, newPartition1);
    addPartition(partition.id, newPartition2);
    
    // Handle the split
    handleSplit(partition.id, direction);
  };

  const handleRemovePartition = (id: number) => {
    removePartition(id);
  };

  // Determine flex direction based on current partition's split direction
  const flexDirection = partition.splitType === 'vertical'
  ? 'flex-col'
  : 'flex-row';

const baseStyle: React.CSSProperties = {
  backgroundColor: partition.color,
  width: isRoot ? '100vw' : '100%',
  height: isRoot ? '100vh' : '100%',
  display: 'flex',
  flexDirection: partition.splitType === 'vertical' ? 'column' : 'row',
};

  const combinedStyle = { ...baseStyle, ...style };

  return (
    <div
      className={`relative w-full h-full`}
      style={combinedStyle}
    >
      {/* Control buttons */}
      <div className="absolute top-0 left-0 z-10 flex items-center gap-1 p-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
          onClick={() => handleAddPartition('vertical')}
        >
          V Split
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
          onClick={() => handleAddPartition('horizontal')}
        >
          H Split
        </button>
        {!isRoot && (
          <button
            onClick={() => handleRemovePartition(partition.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
          >
            Remove
          </button>
        )}
      </div>

      {/* Children rendering */}
      {partition.children.length > 0 && (
        <div
          className={`flex w-full h-full ${flexDirection}`}
          style={{
            flexDirection: partition.splitType === 'vertical' ? 'column' : 'row'
          }}
        >
          {partition.children.map((child) => (
            <Partition
              key={child.id}
              partition={child}
              style={{
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 0,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Partition;