import { create } from 'zustand';
import { generateRandomColor } from '../utils/colors';
import type { PartitionType } from '../types/partition';

interface PartitionState {
  root: PartitionType;
  splitPartition: (id: string, type: 'vertical' | 'horizontal') => void;
  removePartition: (id: string) => void;
  updateSplitRatio: (id: string, ratio: number) => void;
}

const createInitialPartition = (): PartitionType => ({
  id: '1',
  color: generateRandomColor(),
  children: [null, null],
  splitType: null,
  splitRatio: 0.5,
});

const findPartition = (
  root: PartitionType,
  id: string,
  parent?: PartitionType,
  index?: number
): { partition: PartitionType; parent?: PartitionType; index?: number } | null => {
  if (root.id === id) {
    return { partition: root, parent, index };
  }

  for (let i = 0; i < 2; i++) {
    const child = root.children[i];
    if (child) {
      const found = findPartition(child, id, root, i);
      if (found) return found;
    }
  }

  return null;
};

export const usePartitionStore = create<PartitionState>((set) => ({
  root: createInitialPartition(),

  splitPartition: (id, type) =>
    set((state) => {
      const newState = { ...state };
      const found = findPartition(newState.root, id);
      
      if (found) {
        const { partition } = found;
        partition.splitType = type;
        partition.children = [
          {
            id: `${id}-1`,
            color: partition.color,
            children: [null, null],
            splitType: null,
            splitRatio: 0.5,
          },
          {
            id: `${id}-2`,
            color: generateRandomColor(),
            children: [null, null],
            splitType: null,
            splitRatio: 0.5,
          },
        ];
      }

      return newState;
    }),

  removePartition: (id) =>
    set((state) => {
      const newState = { ...state };
      const found = findPartition(newState.root, id);

      if (found && found.parent && typeof found.index === 'number') {
        const sibling = found.parent.children[found.index === 0 ? 1 : 0];
        if (sibling) {
          found.parent.color = sibling.color;
          found.parent.children = [null, null];
          found.parent.splitType = null;
        }
      }

      return newState;
    }),

  updateSplitRatio: (id, ratio) =>
    set((state) => {
      const newState = { ...state };
      const found = findPartition(newState.root, id);
      
      if (found) {
        found.partition.splitRatio = ratio;
      }

      return newState;
    }),
}));