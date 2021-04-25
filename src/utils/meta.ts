import { FC } from 'react';
import { ColumnFCProps } from '../components/MetaTable/interface';
import { ColumnMeta } from '../types/interface';

export function metaRender(
  columnMeta: ColumnMeta,
  renders: Record<string, FC<ColumnFCProps>>,
  defaultRender: FC<ColumnFCProps>,
) {
  const columnFactory = (columnMeta: ColumnMeta, render: FC<ColumnFCProps>) => {
    return ({
      text,
      record,
      index,
    }: {
      text: any;
      record: { [key: string]: any };
      index: number;
    }) => {
      return render({ text, record, index, columnMeta });
    };
  };
  if (columnMeta.component != null) {
    return columnFactory(columnMeta, renders[columnMeta.component]);
  }
  if (
    columnMeta.type === 'businessObject' ||
    columnMeta.type === 'object' ||
    columnMeta.type === 'document'
  ) {
    return columnFactory(
      columnMeta,
      renders[columnMeta.key] || renders['businessObject'],
    );
  }
  return columnFactory(columnMeta, renders[columnMeta.type] || defaultRender);
}
