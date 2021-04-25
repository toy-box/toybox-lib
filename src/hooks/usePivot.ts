import { ColumnMeta } from '../types';
import { useMemo } from 'react';

declare type RowType = Record<string, any>;
declare type PosIndex = number[];

const compare = (columnMeta: ColumnMeta, prev: any, current: any) => {
  if (prev == null) {
    return 0;
  }
  if (columnMeta.type === 'businessObject') {
    if (
      prev[columnMeta.key][columnMeta.idKey || 'id'] <
      current[columnMeta.key][columnMeta.idKey || 'id']
    ) {
      return -1;
    }
    if (
      prev[columnMeta.key][columnMeta.idKey || 'id'] >
      current[columnMeta.key][columnMeta.idKey || 'id']
    ) {
      return 1;
    }
    return 0;
  }
  if (prev[columnMeta.key] < current[columnMeta.key]) {
    return -1;
  }
  if (prev[columnMeta.key] > current[columnMeta.key]) {
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
  let prev: any;
  let pos = 0;
  rows.forEach((row, index) => {
    if (compare(columnMeta, rows[index - 1], row) != 0) {
      pos++;
    }
    newRowIndex[pos] = (newRowIndex[pos] || 0) + 1;
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
    newPosIndex.push(
      ...sortPosIndex(
        columnMeta,
        rows.filter((row, idx) => idx >= start && idx < start + pos),
      ),
    );
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
    let rows = dataSource;
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
