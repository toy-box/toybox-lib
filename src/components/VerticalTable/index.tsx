import React, { createContext, useContext, useMemo } from 'react';
import {
  ColumnsType,
  DefaultRecordType,
  RowClassName,
} from 'rc-table/lib/interface';
import ColumnRow from './components/ColumnRow';
import { TableContext, TableContextProps } from './context/tableContext';

export interface VericalTableProps<RecordType extends DefaultRecordType> {
  columns: ColumnsType<DefaultRecordType>;
  dataSource: DefaultRecordType[];
  componentWidth?: number;
  rowClassName?: string | RowClassName<DefaultRecordType>;
  expandedRowClassName?: RowClassName<DefaultRecordType>;
}

function VericalTable<RecordType = DefaultRecordType>({
  dataSource,
  columns,
  componentWidth,
  rowClassName,
  expandedRowClassName,
}: VericalTableProps<RecordType>) {
  const tableContextValue = useMemo(
    () => ({
      dataSource,
      rowClassName,
      expandedRowClassName,
      columns,
      componentWidth,
    }),
    [rowClassName, expandedRowClassName, columns, componentWidth],
  );
  return;
  <TableContext.Provider value={tableContextValue}>
    <table className="tbox-vertical-table">
      {columns.map((column, index) => (
        <ColumnRow column={column} records={dataSource} key={index} />
      ))}
    </table>
  </TableContext.Provider>;
}

export default VericalTable;
