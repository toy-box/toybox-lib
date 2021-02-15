import React, { FC, useCallback, useMemo } from 'react';
import { DefaultRecordType } from 'rc-table/lib/interface';
import VerticalTable, { VerticalTableProps } from '../VerticalTable';
import { ColumnMeta } from '../../types/interface';
import { DefaultColumnRenderMap } from '../MetaTable/components';
import { metaRender } from '../../utils/meta';
import { ColumnFCProps } from '../MetaTable/interface';

export interface MetaVerticalTableProps<RecordType>
  extends Omit<VerticalTableProps<RecordType>, 'columns'> {
  columnMetas: ColumnMeta[];
  columnComponents?: Record<string, FC<ColumnFCProps>>;
}

const MetaVerticalTable: FC<MetaVerticalTableProps<DefaultRecordType>> = ({
  columnMetas,
  dataSource,
  columnWidth,
  columnComponents = {},
  headWidth,
}) => {
  const mergeRenders = useMemo(() => {
    return Object.assign(DefaultColumnRenderMap, columnComponents);
  }, [columnComponents]);

  const makeColumns = useCallback(
    (columnMetas: ColumnMeta[]) => {
      const columns = columnMetas.map(columnMeta => {
        return {
          key: columnMeta.key,
          title: columnMeta.name,
          dataIndex: columnMeta.key,
          render: metaRender(
            columnMeta,
            mergeRenders,
            DefaultColumnRenderMap['string'],
          ),
        };
      });
      return columns;
    },
    [mergeRenders],
  );

  const columns = useMemo(() => makeColumns(columnMetas), [
    columnMetas,
    makeColumns,
  ]);

  return (
    <VerticalTable
      columns={columns}
      columnWidth={columnWidth}
      headWidth={headWidth}
      dataSource={dataSource}
    />
  );
};

export default MetaVerticalTable;
