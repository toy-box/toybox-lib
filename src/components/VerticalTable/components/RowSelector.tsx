import React, { FC, useMemo } from 'react';
import {
  ColumnType,
  DefaultRecordType,
  RowClassName,
} from 'rc-table/lib/interface';
import useSelection, {
  SELECTION_ALL,
  SELECTION_INVERT,
  SELECTION_NONE,
} from 'antd/lib/table/hooks/useSelection';
import { TableRowSelection, RowSelectionType } from 'antd/lib/table/interface';
import Header from './Header';

export interface RowSelectorProps<RecordType> {
  rowSelection?: TableRowSelection<RecordType>;
}

function RowSelector<RecordType extends DefaultRecordType>({
  rowSelection,
}: RowSelectorProps<RecordType>) {
  const allSelect = useMemo(() => {
    return;
  }, []);
  return <tr></tr>;
}
