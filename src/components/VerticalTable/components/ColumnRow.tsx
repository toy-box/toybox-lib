import React, { useContext } from 'react';
import { ColumnType } from 'antd/lib/table/interface';
import Cell from './Cell';
import { TableContext } from '../context/tableContext';

export interface ColumnRowProps<RecordType> {
  column: ColumnType<RecordType>;
  render?: ColumnType<RecordType>['render'];
  records: RecordType[];
  headWidth?: number;
  columnWidth?: number;
}

function ColumnRow<RecordType extends object = any>({
  column,
  records,
  headWidth,
  columnWidth,
}: ColumnRowProps<RecordType>) {
  const tableContext = useContext(TableContext);
  const alignStyle = {
    textAlign: column.align || 'center',
  };
  const style = {
    ...alignStyle,
  };
  const Header = () => {
    return (
      <Cell
        className="tbox-vertical-table-thead"
        width={headWidth}
        fixLeft={1}
        firstFixLeft
      >
        {column.title}
      </Cell>
    );
    // return <td className="tbox-vertical-table-thead" style={style}>{column.title}</td>;
  };
  return (
    <tr>
      <Header />
      {records.map((record, index) => (
        <Cell
          key={index}
          record={record}
          index={index}
          width={columnWidth}
          dataIndex={column.dataIndex || column.key}
        />
      ))}
    </tr>
  );
}

export default ColumnRow;
