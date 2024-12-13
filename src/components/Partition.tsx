import React, { useCallback, useRef, useState } from 'react';
import { Divider } from './Divider';
import { usePartitionStore } from '../store/partitionStore';
import { SNAP_POINTS, SNAP_THRESHOLD } from '../utils/constants';
import { PartitionControls } from './PartitionControl';
import { PartitionType } from '../types/partition';

interface PartitionProps {
  partition: PartitionType;
  isRoot?: boolean;
}

const Partition: React.FC<PartitionProps> = ({ partition, isRoot = false }) => {
  const { splitPartition, removePartition, updateSplitRatio } = usePartitionStore();
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startPos: number; startRatio: number } | null>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const rect = e.currentTarget.parentElement?.getBoundingClientRect();
    if (rect) {
      const startPos = partition.splitType === 'vertical' ? e.clientX : e.clientY;
      dragRef.current = {
        startPos,
        startRatio: partition.splitRatio,
      };
    }
  }, [partition.splitType]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !dragRef.current) return;

    const rect = (e.target as HTMLElement).parentElement?.getBoundingClientRect();
    if (!rect) return;

    const currentPos = partition.splitType === 'vertical' ? e.clientX : e.clientY;
    const totalSize = partition.splitType === 'vertical' ? rect.width : rect.height;
    const delta = (currentPos - dragRef.current.startPos) / totalSize;
    let newRatio = dragRef.current.startRatio + delta;

    // Snap to points
    SNAP_POINTS.forEach(point => {
      if (Math.abs(newRatio - point) < SNAP_THRESHOLD) {
        newRatio = point;
      }
    });

    newRatio = Math.max(0.1, Math.min(0.9, newRatio));
    updateSplitRatio(partition.id, newRatio);
  }, [isDragging, partition.id, partition.splitType, updateSplitRatio]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    dragRef.current = null;
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (!partition.splitType) {
    return (
      <div
        className="relative w-full h-full"
        style={{ backgroundColor: partition.color }}
      >
        <PartitionControls
          isRoot={isRoot}
          onRemove={() => removePartition(partition.id)}
          onSplitVertical={() => splitPartition(partition.id, 'vertical')}
          onSplitHorizontal={() => splitPartition(partition.id, 'horizontal')}
        />
      </div>
    );
  }

  const isVertical = partition.splitType === 'vertical';

  return (
    <div 
      className="relative w-full h-full flex" 
      style={{ flexDirection: isVertical ? 'row' : 'column' }}
    >
      <div style={{ flex: partition.splitRatio }}>
        {partition.children[0] && <Partition partition={partition.children[0]} />}
      </div>
      <Divider
        isVertical={isVertical}
        onMouseDown={handleMouseDown}
        ratio={partition.splitRatio}
        isDragging={isDragging}
      />
      <div style={{ flex: 1 - partition.splitRatio }}>
        {partition.children[1] && <Partition partition={partition.children[1]} />}
      </div>
    </div>
  );
};

export default Partition;