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
  expandedRowClassName?: RowClassName<RecordType>;

  columns: ColumnsType<RecordType>;
  flattenColumns?: readonly ColumnType<RecordType>[];

  componentWidth?: number;
  tableLayout?: TableLayout;
  fixColumn?: boolean;
  horizonScroll?: boolean;
  indentSize?: number;
  expandableType?: ExpandableType;
  expandRowByClick?: boolean;
  expandedRowRender?: ExpandedRowRender<RecordType>;
  expandIcon?: RenderExpandIcon<RecordType>;
  onTriggerExpand?: TriggerEventHandler<RecordType>;
  expandIconColumnIndex?: number;
}

export const TableContext = React.createContext<TableContextProps | undefined>(
  undefined,
);
