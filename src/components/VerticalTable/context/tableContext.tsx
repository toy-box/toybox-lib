import * as React from 'react';
import {
  ColumnType,
  DefaultRecordType,
  ColumnsType,
  TableLayout,
  RenderExpandIcon,
  ExpandableType,
  RowClassName,
  TriggerEventHandler,
  ExpandedRowRender,
} from 'rc-table/lib/interface';

export interface TableContextProps<RecordType = DefaultRecordType> {
  rowClassName?: string | RowClassName<RecordType>;
  showHeader?: boolean;
  columns: ColumnsType<RecordType>;
  flattenColumns?: readonly ColumnType<RecordType>[];
  columnWidth?: number;
  headWidth?: number;
  componentWidth?: number;
  tableLayout?: TableLayout;
  fixColumn?: boolean;
  horizonScroll?: boolean;
  indentSize?: number;
}

export const TableContext = React.createContext<TableContextProps | undefined>(
  undefined,
);
