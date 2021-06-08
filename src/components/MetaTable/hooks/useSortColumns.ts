import dayjs from 'dayjs';
import { BusinessFieldType, ColumnMeta } from '../../../types';

export const useSortColumns = (columnMetas: ColumnMeta[]) => {
  return columnMetas.map(columnMeta => ({
    ...columnMeta,
    sorter: sorterProvider(columnMeta),
  }));
};

const sorterProvider = (columnMeta: ColumnMeta) => {
  switch (columnMeta.type) {
    case BusinessFieldType.DATE:
    case BusinessFieldType.DATETIME:
      return (prev: Record<string, any>, current: Record<string, any>) => {
        return dayjs(prev[columnMeta.key]).diff(dayjs(current[columnMeta.key]));
      };
    case BusinessFieldType.OBJECT:
      if (columnMeta.titleKey != null) {
        return (prev: Record<string, any>, current: Record<string, any>) => {
          const prevData = prev[columnMeta.key];
          const currentData = current[columnMeta.key];
          if (prevData != null && currentData == null) {
            return 1;
          }
          if (prevData == null && currentData != null) {
            return -1;
          }
          if (prevData == null && currentData == null) {
            return 0;
          }
          if (
            prevData[columnMeta.titleKey as string] >
            currentData[columnMeta.titleKey as string]
          ) {
            return 1;
          }
          if (
            prevData[columnMeta.titleKey as string] <
            currentData[columnMeta.titleKey as string]
          ) {
            return -1;
          }
          return 0;
        };
      }
      return undefined;
    case BusinessFieldType.ARRAY:
      return undefined;
    default:
      return (prev: Record<string, any>, current: Record<string, any>) => {
        if (prev[columnMeta.key] > current[columnMeta.key]) {
          return 1;
        }
        if (prev[columnMeta.key] < current[columnMeta.key]) {
          return -1;
        }
        return 0;
      };
  }
};
