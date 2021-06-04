import { useMemo } from 'react';
import { BusinessFieldType, ColumnMeta } from '../../../types';

declare type RowType = Record<string, any>;
declare type PosIndex = number[];

const compare = (columnMeta: ColumnMeta, prev: any, current: any) => {
  if (
    columnMeta.type === BusinessFieldType.OBJECT ||
    columnMeta.type === 'businessObject' ||
    columnMeta.type === 'document'
  ) {
    const prevObj = prev != null ? prev[columnMeta.key] : null;
    const currentObj = current != null ? current[columnMeta.key] : null;
    const prevValue = prevObj ? prevObj[columnMeta.idKey || 'id'] : null;
    const currentValue = currentObj
      ? currentObj[columnMeta.idKey || 'id']
      : null;
    if (prevValue < currentValue) {
      return -1;
    }
    if (prevValue > currentValue) {
      return 1;
    }
    if (prevValue == null && currentValue != null) {
      return -1;
    }
    if (prevValue != null && currentValue == null) {
      return 1;
    }
    return 0;
  }
  if (
    (prev != null ? prev[columnMeta.key] : null) <
    (current != null ? current[columnMeta.key] : null)
  ) {
    return -1;
  }
  if (
    (prev != null ? prev[columnMeta.key] : null) >
    (current != null ? current[columnMeta.key] : null)
  ) {
    return 1;
  }
  return 0;
};

const sortMetaData = (columnMeta: ColumnMeta, rows: RowType[]) => {
  return rows.sort((prev, current) => compare(columnMeta, prev, current));
};

const mulSortMetaData = (
  columnMeta: ColumnMeta,
  rows: RowType[],
  posIndex: number[],
) => {
  const newRows: RowType[] = [];
  let start = -1;
  posIndex.forEach(pos => {
    const sorted = sortMetaData(
      columnMeta,
      rows.filter((row, idx) => idx > start && idx <= start + pos),
    );
    newRows.push(...sorted);
    start += pos;
  });
  return newRows;
};

const sortPosIndex = (columnMeta: ColumnMeta, rows: RowType[]) => {
  const newRowIndex: number[] = [];
  let pos = 0;
  rows.forEach((row, index) => {
    if (pos === 0) {
      pos++;
    } else {
      if (compare(columnMeta, rows[index - 1], row) !== 0) {
        if (pos > 0) {
          newRowIndex.push(pos);
          pos = 1;
        }
      } else {
        pos++;
      }
    }
    if (index === rows.length - 1) {
      newRowIndex.push(pos);
    }
  });
  return newRowIndex;
};

const mulSortPosIndex = (
  columnMeta: ColumnMeta,
  rows: RowType[],
  posIndex: number[],
) => {
  const newPosIndex: number[] = [];

  let start = -1;
  posIndex.forEach(pos => {
    const rowsInPos = rows.filter(
      (row, idx) => idx > start && idx <= start + pos,
    );
    newPosIndex.push(...sortPosIndex(columnMeta, rowsInPos));
    start += pos;
  });

  return newPosIndex;
};

const usePivot = (
  dataSource: RowType[],
  columnMetas: ColumnMeta[],
  dimensions: string[] = [],
) => {
  const pivotData = useMemo(() => {
    let rows = dataSource.map(item => item);
    let posIndexes: Array<number[]> = [];
    dimensions.forEach((key, keyIdx) => {
      const columnMeta = columnMetas.find(c => c.key === key);
      if (columnMeta == null) return;
      if (keyIdx === 0) {
        rows = sortMetaData(columnMeta, rows);
        posIndexes.push(sortPosIndex(columnMeta, rows));
      } else {
        rows = mulSortMetaData(columnMeta, rows, posIndexes[keyIdx - 1]);
        posIndexes.push(
          mulSortPosIndex(columnMeta, rows, posIndexes[keyIdx - 1]),
        );
      }
    });
    return {
      rows,
      posIndexes,
    };
  }, [dataSource, columnMetas, dimensions]);

  return [pivotData.rows, pivotData.posIndexes] as [RowType[], PosIndex[]];
};

export default usePivot;
