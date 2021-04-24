import { ColumnMeta } from '../../../types';

declare type RowType = Record<string, any>;

const usePivot = (columnMetas: ColumnMeta[], dataSource: RowType[]) => {
  const dimKeys = columnMetas.filter(c => c.isDimension).map(c => c.key);
  let sortedRows = dataSource;
  let posIndexes: Array<number[]> = [];
  dimKeys.forEach((key, keynum) => {
    const columnMeta = columnMetas.find(c => c.key === key);
    if (columnMeta == null) return;
    if (keynum === 0) {
      sortedRows = sortMetaData(columnMeta, sortedRows);
      posIndexes.push(sortPosIndex(columnMeta, sortedRows));
    } else {
      sortedRows = mulSortMetaData(
        columnMeta,
        sortedRows,
        posIndexes[keynum - 1],
      );
      posIndexes.push(
        mulSortPosIndex(columnMeta, sortedRows, posIndexes[keynum - 1]),
      );
    }
  });

  const compare = (columnMeta: ColumnMeta, prev: any, current: any) => {
    if (columnMeta.type === 'businessObject') {
      return (
        prev[columnMeta.key][columnMeta.idKey || 'id'] -
        current[columnMeta.key][columnMeta.idKey || 'id']
      );
    }
    return prev[columnMeta.key] - current[columnMeta.key];
  };
  const sortMetaData = (columnMeta: ColumnMeta, rows: RowType[]) => {
    return rows.sort((prev, current) => compare(columnMeta, prev, current));
  };
  const mulSortMetaData = (
    columnMeta: ColumnMeta,
    rows: RowType[],
    rowIndex: number[],
  ) => {
    const newRows: RowType[] = [];
    let start = -1;
    rowIndex.forEach(num => {
      newRows.push(
        sortMetaData(
          columnMeta,
          rows.filter((row, idx) => idx >= start && idx <= num),
        ),
      );
      start += num;
    });
    return newRows;
  };

  const sortPosIndex = (columnMeta: ColumnMeta, rows: RowType[]) => {
    const newRowIndex: number[] = [];
    let prev: any;
    let idx = -1;
    rows.forEach(row => {
      if (!compare(columnMeta, prev, row)) {
        idx++;
      }
      newRowIndex[idx] = (newRowIndex[idx] || 0) + 1;
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
};
