import React, { FC, useCallback, useMemo, useState, ReactNode } from 'react';
import { Table } from 'antd';
import update from 'immutability-helper';
import { ColumnsType, TablePaginationConfig, TableProps } from 'antd/lib/table';
import { RenderExpandIconProps } from 'rc-table/lib/interface';
import {
  operateFactory,
  OperateDropdown,
  OperateItem,
} from './components/OperateColumn';
import { ArrowRightSLine } from '@airclass/icons';
import { ColumnFCProps } from './interface';
import { ColumnMeta } from '../../types/interface';

import './style.less';
import { metaRender } from '../../utils/meta';
import {
  DefaultColumnRenderMap,
  ResizableTitle,
  ResizeCallbackData,
} from './components';
import { usePivot } from './hooks';

export type RowData = Record<string, any>;

export type PivotOption = {
  dimensions: string[];
};

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
  resizableTitle?: boolean;
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
  /**
   * @description 表格交叉显示配置
   */
  pivotOption?: PivotOption;
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
  resizableTitle,
  showHeader,
  expandable,
  bordered,
  rowSelection,
  pivotOption,
  summary,
  title,
  onChange,
  rowClassName,
}) => {
  const [columnWidths, setColumnWidths] = useState<number[]>(
    Array(columnMetas.length).fill(100),
  );

  const mergeRenders = useMemo(() => {
    return Object.assign(DefaultColumnRenderMap, columnComponents);
  }, [columnComponents]);

  const leftMetas = useMemo(() => {
    if (pivotOption) {
      return columnMetas.filter(meta =>
        pivotOption.dimensions.includes(meta.key),
      );
    }
    return columnMetas;
  }, [columnMetas, pivotOption]);

  const rightMetas = useMemo(() => {
    if (pivotOption) {
      return columnMetas.filter(
        meta => !pivotOption.dimensions.includes(meta.key),
      );
    }
    return [];
  }, [columnMetas]);

  const innerColumnMetas = useMemo(() => [...leftMetas, ...rightMetas], [
    columnMetas,
    pivotOption,
  ]);

  const [rows, posIndexes] = usePivot(
    dataSource || [],
    innerColumnMetas,
    pivotOption?.dimensions,
  );

  const rowSpanIndexes = useMemo(
    () =>
      posIndexes.map(posIndex => {
        const arr: number[] = [];
        posIndex.forEach(pos => {
          const empty: number[] = new Array(pos - 1).fill(0);
          arr.push(...[pos, ...empty]);
        });
        return arr;
      }),
    [posIndexes],
  );

  const getRowSpan = useCallback(
    (columnMeta: ColumnMeta, index: number) => {
      if (pivotOption) {
        const posIndex =
          rowSpanIndexes[
            pivotOption.dimensions.findIndex(d => d === columnMeta.key)
          ];
        return posIndex ? posIndex[index] : undefined;
      }
      return undefined;
    },
    [pivotOption],
  );

  const makeColumns = useCallback(
    (columnMetas: ColumnMeta[], columnWidths: number[]) => {
      const columns: ColumnsType<Record<string, any>> = columnMetas.map(
        (columnMeta, index) => {
          return {
            key: columnMeta.key,
            title: columnMeta.name,
            dataIndex: columnMeta.key,
            align: columnMeta.align,
            width: columnWidths[index] || columnMeta.width,
            render: (text, record, index) => {
              const MetaRender = metaRender(
                columnMeta,
                mergeRenders,
                DefaultColumnRenderMap['string'],
              );
              const obj = {
                children: (
                  <MetaRender text={text} record={record} index={index} />
                ),
                props: {
                  rowSpan: getRowSpan(columnMeta, index),
                },
              };
              return obj;
            },
            onHeaderCell: (column: { width: number }) => ({
              width: column.width,
              onResize: handleResize(index),
            }),
          };
        },
      );
      return columns;
    },
    [mergeRenders, posIndexes],
  );

  const columns = useMemo(() => {
    const columns = makeColumns(innerColumnMetas, columnWidths);
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
  }, [innerColumnMetas, makeColumns, columnWidths]);

  const handleResize = (index: number) => {
    return (
      e: React.SyntheticEvent<Element, Event>,
      data: ResizeCallbackData,
    ) => {
      console.log('handleResize', data.size);
      setColumnWidths(
        update(columnWidths, { [index]: { $set: data.size.width } }),
      );
    };
  };

  const mixExpandable = useMemo(() => {
    return expandable
      ? {
          expandIcon: ({
            expanded,
            onExpand,
            record,
          }: RenderExpandIconProps<RowData>) =>
            expanded ? (
              <ArrowRightSLine
                style={{
                  transform: 'rotate(90deg)',
                  transition: 'transform .2s ease-in-out',
                }}
                onClick={e => onExpand(record, e)}
              />
            ) : (
              <ArrowRightSLine
                style={{
                  transform: 'rotate(0deg)',
                  transition: 'transform .2s ease-in-out',
                }}
                onClick={e => onExpand(record, e)}
              />
            ),
          ...expandable,
        }
      : undefined;
  }, [expandable]);

  const components = useMemo(
    () =>
      resizableTitle
        ? {
            header: {
              cell: ResizableTitle,
            },
          }
        : undefined,
    [resizableTitle],
  );

  return (
    <Table
      components={components}
      rowKey={rowKey}
      rowClassName={rowClassName}
      size={size}
      columns={columns}
      onChange={onChange}
      dataSource={rows}
      pagination={pagination}
      summary={summary}
      title={title}
      showHeader={showHeader}
      expandable={mixExpandable}
      bordered={bordered}
      rowSelection={rowSelection}
    />
  );
};

export default MetaTable;
