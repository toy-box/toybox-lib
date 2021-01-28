import React, { FC, useMemo, useCallback, ReactNode } from 'react';
import { Table } from 'antd';
import { TablePaginationConfig, TableProps } from 'antd/lib/table';
import { ColumnsType } from 'antd/lib/table/interface';
import { DateColumn } from './components/DateColumn';
import { ObjectColumn } from './components/ObjectColumn';
import { DefaultColumn } from './components/DefaultColumn';
import { BooleanColumn } from './components/BooleanColumn';
import { SingleOptionColumn } from './components/SingleOptionColumn';
import { OperateItem, OperateDropdown, operateFactory } from './components/OperateColumn';
import { ColumnFCProps } from './interface';
import { ColumnMeta } from '../../types/interface';

import './style.less';

export type RowData = Record<string, any>;

export interface MetaTableProps extends Pick<TableProps<RowData>, 'rowKey' | 'rowSelection' | 'expandable' | 'pagination' | 'loading' | 'dataSource' | 'bordered' | 'size' | 'showHeader' | 'summary'> {
  columnMetas: ColumnMeta[];
  columnComponents?: Record<string, (...args: any) => React.ReactNode>;
  operateItems?: OperateItem[];
  onChange: (pagination: TablePaginationConfig, filters?: any, sorter?: any) => void;
  rowClassName?: (record: RowData, index: number) => string;
  title?: (dataSource: RowData[]) => ReactNode;
}

export const columnFactory = (columnMeta: ColumnMeta, render: FC<ColumnFCProps>) => {
  return (text: any, record: { [key: string]: any }, index: number) => {
    return render({ text, record, index, columnMeta });
  };
}

const defaultColumnsComponents: Record<string, React.FC<ColumnFCProps>> = {
  businessObject: ObjectColumn,
  date: DateColumn,
  datetime: DateColumn,
  document: ObjectColumn,
  object: ObjectColumn,
  singleOption: SingleOptionColumn,
  boolean: BooleanColumn,
  string: DefaultColumn,
  number: DefaultColumn
}

const MetaTable: FC<MetaTableProps> = ({
  rowKey = 'id',
  size,
  columnMetas,
  dataSource,
  columnComponents = {},
  pagination,
  operateItems,
  showHeader,
  expandable,
  bordered,
  rowSelection,
  summary,
  title,
  onChange,
  rowClassName,
}) => {
  const mergeColumnComponents = useMemo(() => {
    return Object.assign(defaultColumnsComponents, columnComponents);
  }, [columnComponents]);

  const pickComponent = useCallback((columnMeta: ColumnMeta) => {
    if (columnMeta.component != null) {
      return columnFactory(columnMeta, mergeColumnComponents[columnMeta.component])
    }
    if (
      columnMeta.type === 'businessObject'
      || columnMeta.type === 'object'
      || columnMeta.type === 'document'
    ) {
      return columnFactory(columnMeta, mergeColumnComponents[columnMeta.key] || mergeColumnComponents['businessObject']);
    }
    return columnFactory(columnMeta, mergeColumnComponents[columnMeta.type] || DefaultColumn);
  }, [mergeColumnComponents]);

  const makeColumns = useCallback((columnMetas: ColumnMeta[]) => {
    const columns: ColumnsType<RowData> = columnMetas.map(columnMeta => {
      return {
        key: columnMeta.key,
        title: columnMeta.name,
        dataIndex: columnMeta.key,
        render: pickComponent(columnMeta),
      };
    });
    if (operateItems != null && operateItems.length > 0) {
      columns.push({
        key: 'meta-table-operate',
        title: '',
        dataIndex: 'meta-table-operate',
        align: 'right',
        render: operateFactory(operateItems, OperateDropdown),
      });
    }
    return columns;
  }, [operateItems, pickComponent]);

  const columns = useMemo(
    () => makeColumns(columnMetas),
    [columnMetas, makeColumns]
  );

  return (
    <Table
      rowKey = { rowKey }
      rowClassName = { rowClassName }
      size = { size }
      columns = { columns }
      onChange = { onChange }
      dataSource = { dataSource }
      pagination = { pagination }
      summary = { summary }
      title = { title }
      showHeader = { showHeader }
      expandable = { expandable }
      bordered = { bordered }
      rowSelection = { rowSelection }
    />
  )
}

export default MetaTable;
