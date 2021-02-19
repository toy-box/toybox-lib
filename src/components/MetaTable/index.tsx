import React, { FC, useMemo, useCallback, ReactNode } from 'react';
import { Table } from 'antd';
import { ColumnsType, TablePaginationConfig, TableProps } from 'antd/lib/table';
import {
  operateFactory,
  OperateDropdown,
  OperateItem,
} from './components/OperateColumn';
import { ColumnFCProps } from './interface';
import { ColumnMeta } from '../../types/interface';

import './style.less';
import { metaRender } from '../../utils/meta';
import { DefaultColumnRenderMap } from './components';

export type RowData = Record<string, any>;

export interface MetaTableProps
  extends Pick<
    TableProps<RowData>,
    | 'rowKey'
    | 'rowSelection'
    | 'expandable'
    | 'pagination'
    | 'loading'
    | 'dataSource'
    | 'bordered'
    | 'size'
    | 'showHeader'
    | 'summary'
  > {
  /**
   * @description 字段源属性
   */
  columnMetas: ColumnMeta[];
  /**
   * @description 自定义字段组件
   */
  columnComponents?: Record<string, (...args: any) => React.ReactNode>;
  /**
   * @description 操作字段组件配置
   */
  operateItems?: OperateItem[];
  /**
   * @description 操作字段表头
   */
  operateHeader?: ReactNode;
  /**
   * @description 当表格查询条件变化时
   */
  onChange: (
    pagination: TablePaginationConfig,
    filters?: any,
    sorter?: any,
  ) => void;
  /**
   * @description 行自定义class
   */
  rowClassName?: (record: RowData, index: number) => string;
  /**
   * @description 表格标题
   */
  title?: (dataSource: RowData[]) => ReactNode;
}

export const columnFactory = (
  columnMeta: ColumnMeta,
  render: FC<ColumnFCProps>,
) => {
  return (text: any, record: { [key: string]: any }, index: number) => {
    return render({ text, record, index, columnMeta });
  };
};

const MetaTable: FC<MetaTableProps> = ({
  rowKey = 'id',
  size,
  columnMetas,
  dataSource,
  columnComponents = {},
  pagination,
  operateItems,
  operateHeader,
  showHeader,
  expandable,
  bordered,
  rowSelection,
  summary,
  title,
  onChange,
  rowClassName,
}) => {
  const mergeRenders = useMemo(() => {
    return Object.assign(DefaultColumnRenderMap, columnComponents);
  }, [columnComponents]);

  const makeColumns = useCallback(
    (columnMetas: ColumnMeta[]) => {
      const columns: ColumnsType<Record<string, any>> = columnMetas.map(
        columnMeta => {
          return {
            key: columnMeta.key,
            title: columnMeta.name,
            dataIndex: columnMeta.key,
            align: columnMeta.align,
            render: metaRender(
              columnMeta,
              mergeRenders,
              DefaultColumnRenderMap['string'],
            ),
          };
        },
      );
      return columns;
    },
    [mergeRenders],
  );

  const columns = useMemo(() => {
    const columns = makeColumns(columnMetas);
    if (operateItems != null && operateItems.length > 0) {
      columns.push({
        key: 'meta-table-operate',
        title: operateHeader,
        dataIndex: 'meta-table-operate',
        align: 'right',
        render: operateFactory(operateItems, OperateDropdown),
      });
    }
    return columns;
  }, [columnMetas, makeColumns]);

  return (
    <Table
      rowKey={rowKey}
      rowClassName={rowClassName}
      size={size}
      columns={columns}
      onChange={onChange}
      dataSource={dataSource}
      pagination={pagination}
      summary={summary}
      title={title}
      showHeader={showHeader}
      expandable={expandable}
      bordered={bordered}
      rowSelection={rowSelection}
    />
  );
};

export default MetaTable;
