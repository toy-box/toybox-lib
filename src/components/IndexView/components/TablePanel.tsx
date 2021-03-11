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

const TitleWrapper = styled.h4`
  margin: 6px 0;
`;

const TablePanel: FC<TablePanelProps> = ({
  placement = 'right',
  viewModes,
}) => {
  const context = useContext(IndexViewContext);
  const title = useMemo(() => <TitleWrapper>配置表格字段</TitleWrapper>, []);
  const columnFilter = useMemo(() => {
    if (context.visibleColumnSet) {
      return (
        <SortableSelect
          title={title}
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
          <Button.Icon icon={<LayoutColumnLine />} />
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
