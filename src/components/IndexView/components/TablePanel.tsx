import React, { FC, useCallback, useContext, useMemo, useState } from 'react';
import { LayoutColumnLine } from '@airclass/icons';
import classNames from 'classnames';
import styled from 'styled-components';
import Button from '../../Button';
import SortableSelect from '../../SortableSelect';
import { SelectItem, ValueType } from '../../SortableSelect/interface';
import { IndexMode } from '..';
import IndexViewContext from '../context';

export interface ColumnSet {
  columns: SelectItem[];
  setColumns: (columnSets: SelectItem[]) => void;
  visibleKeys?: string[];
}

export interface TablePanelProps {
  placement?: 'left' | 'right';
  viewModes?: IndexMode[];
}

const TablePanel: FC<TablePanelProps> = ({
  placement = 'right',
  viewModes,
}) => {
  const context = useContext(IndexViewContext);
  const columnFilter = useMemo(() => {
    if (context.visibleColumnSet) {
      return (
        <SortableSelect
          title={<h4 style={{ margin: '6px 0' }}>配置表格字段</h4>}
          dataSource={context.columns || []}
          value={context.visibleKeys}
          onChange={(keys: ValueType) => {
            context.setVisibleKeys && context.setVisibleKeys(keys as string[]);
          }}
          onSortEnd={options =>
            context.setColumns && context.setColumns(options)
          }
          multiple
        >
          <Button.Icon size="small" icon={<LayoutColumnLine />} />
        </SortableSelect>
      );
    }
    return null;
  }, [context]);

  const modeSetup = useMemo(() => {}, []);

  return (
    <div className={classNames('tbox-index-view-panel', placement)}>
      {columnFilter}
    </div>
  );
};

export default TablePanel;
