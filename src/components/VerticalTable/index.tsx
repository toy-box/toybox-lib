import React, { ReactNode, useMemo } from 'react';
import {
  ColumnType,
  DefaultRecordType,
  RowClassName,
} from 'rc-table/lib/interface';
import ColumnRow from './components/ColumnRow';
import { TableContext } from './context/tableContext';
import './style.less';

export interface VericalTableProps<RecordType extends DefaultRecordType> {
  bordered?: boolean;
  columns: ColumnType<DefaultRecordType>[];
  columnWidth?: number;
  headWidth?: number;
  dataSource: DefaultRecordType[];
  ellipsis?: boolean;
  expandedRowClassName?: RowClassName<DefaultRecordType>;
  loading?: boolean | ReactNode;
  rowClassName?: string | RowClassName<DefaultRecordType>;
}

function VericalTable<RecordType = DefaultRecordType>({
  bordered,
  columns,
  columnWidth,
  headWidth,
  dataSource,
  ellipsis,
  expandedRowClassName,
  rowClassName,
}: VericalTableProps<RecordType>) {
  const tableContextValue = useMemo(
    () => ({
      dataSource,
      rowClassName,
      expandedRowClassName,
      columns,
      columnWidth,
      headWidth,
    }),
    [rowClassName, expandedRowClassName, columns, columnWidth, headWidth],
  );
  return (
    <TableContext.Provider value={tableContextValue}>
      <div className="tbox-vertical-table">
        <table>
          <tbody>
            {columns.map((column, index) => (
              <ColumnRow column={column} records={dataSource} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </TableContext.Provider>
  );
}

export default VericalTable;
