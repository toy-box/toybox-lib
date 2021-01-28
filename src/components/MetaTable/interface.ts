import { ColumnMeta } from '../../types/interface';

export interface ColumnFCProps {
  text: any;
  record: Record<string, any>;
  index: number;
  columnMeta: ColumnMeta;
}
