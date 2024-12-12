import { create } from "zustand";
import { PartitionsState, PartitionType } from "../types";
import { generateRandomColor } from './useGenerateColor';

export const usePartitions = create<PartitionsState>((set) => ({
    partitions: [
        {
            id: 0,
            name: "Partition1",
            color: generateRandomColor(),
            children: [],
        },
    ],
    addPartition: (parentId: number, partition: PartitionType) =>
        set((state) => ({
            partitions: addPartitionRecursive(state.partitions, parentId, partition),
        })),
    removePartition: (id: number) =>
        set((state) => ({
            partitions: removePartitionRecursive(state.partitions, id),
        })),
    handleSplit: (id: number, splitType: 'vertical' | 'horizontal') =>
        set((state) => ({
            partitions: splitPartitionRecursive(state.partitions, id, splitType),
        })),
}));

const addPartitionRecursive = (partitions: PartitionType[], parentId: number, newPartition: PartitionType): PartitionType[] => {
    return partitions.map(partition => {
        if (partition.id === parentId) {
            return {
                ...partition,
                children: [...partition.children, newPartition],
            };
        } else if (partition.children.length > 0) {
            return {
                ...partition,
                children: addPartitionRecursive(partition.children, parentId, newPartition),
            };
        }
        return partition;
    });
};

const removePartitionRecursive = (partitions: PartitionType[], id: number): PartitionType[] => {
    return partitions.filter(partition => partition.id !== id).map(partition => ({
        ...partition,
        children: removePartitionRecursive(partition.children, id),
    }));
};

const splitPartitionRecursive = (partitions: PartitionType[], id: number, splitType: 'vertical' | 'horizontal'): PartitionType[] => {
    return partitions.map(partition => {
        if (partition.id === id) {
            return {
                ...partition,
                splitType,
                children: [
                    {
                        id: Date.now(),
                        name: `${partition.name} - Child 1`,
                        color: generateRandomColor(),
                        height: partition.height / 2,
                        width: partition.width / 2,
                        children: [],
                    },
                    {
                        id: Date.now() + 1,
                        name: `${partition.name} - Child 2`,
                        color: generateRandomColor(),
                        height: partition.height / 2,
                        width: partition.width / 2,
                        children: [],
                    },
                ],
            };
        } else if (partition.children.length > 0) {
            return {
                ...partition,
                children: splitPartitionRecursive(partition.children, id, splitType),
            };
        }
        return partition;
    });
};
