import React, { ReactNode, useMemo } from 'react';
import {
  ColumnType,
  DefaultRecordType,
  RowClassName,
} from 'rc-table/lib/interface';
import classNames from 'classnames';
import ColumnRow from './components/ColumnRow';
import { TableContext } from './context/tableContext';
import './style.less';
import { SizeType } from 'antd/es/config-provider/SizeContext';

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
  size?: SizeType;
}

function VericalTable<RecordType = DefaultRecordType>({
  bordered,
  columns,
  columnWidth,
  dataSource,
  ellipsis,
  expandedRowClassName,
  headWidth,
  rowClassName,
  size,
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
  const classes = classNames('tbox-vertical-table', {
    [`tbox-vertical-table-${size}`]: size,
  });
  return (
    <TableContext.Provider value={tableContextValue}>
      <div className={classes}>
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
