export interface PartitionType {
    id: string;
    color: string;
    children: [PartitionType | null, PartitionType | null];
    splitType: 'vertical' | 'horizontal' | null;
    splitRatio: number;
  }