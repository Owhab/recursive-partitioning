export type PartitionType = {
    id: number;
    name: string;
    color: string;
    children: PartitionType[];
    splitType?: 'vertical' | 'horizontal';
  };
  
  export type PartitionsState = {
    partitions: PartitionType[];
    addPartition: (parentId: number, partition: PartitionType) => void;
    removePartition: (id: number) => void;
    handleSplit: (id: number, splitType: 'vertical' | 'horizontal') => void;
  };