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

  const handleAddPartition = (direction: 'vertical' | 'horizontal') => {
    addPartition(partition.id, {
      id: Math.random(),
      name: 'Partition',
      color: generateRandomColor(),
      direction: direction,
      children: [],
    });
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
      <div className="absolute top-1/2 left-1/2 flex items-center gap-1 p-2">
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