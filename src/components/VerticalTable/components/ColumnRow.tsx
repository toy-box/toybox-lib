import React, { useContext } from 'react';
import { ColumnType } from 'antd/lib/table/interface';
import Cell from './Cell';
import { TableContext } from '../context/tableContext';

export interface ColumnRowProps<RecordType> {
  column: ColumnType<RecordType>;
  render?: ColumnType<RecordType>['render'];
  records: RecordType[];
}

function ColumnRow<RecordType extends object = any>({
  column,
  records,
}: ColumnRowProps<RecordType>) {
  const tableContext = useContext(TableContext);

  const alignStyle = {
    textAlign: column.align || 'center',
  };
  const style = {
    ...alignStyle,
  };
  const Header = () => {
    return <td className={column.className} style={style}></td>;
  };
  return (
    <tr>
      <Header />
      {records.map((record, index) => (
        <Cell record={record} index={index} {...column} />
      ))}
    </tr>
  );
}

export default ColumnRow;
