import React, {
  FC,
  ReactNode,
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import GridLayout, { Layout } from 'react-grid-layout';
import { useDebounceFn } from 'ahooks';
import { FreeGirdContext } from './context';

import './style.less';

export interface SimpleLayout {
  i?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  static?: boolean;
}

export interface GirdItem {
  key: string;
  itemProps?: Record<string, any>;
  itemRender: (itemProps: Record<string, any>) => ReactNode;
  layout: Omit<GridLayout.Layout, 'i'>;
}

export interface FreeGirdProps {
  cols: number;
  width: number;
  rowHeight: number;
  dataSource: GirdItem[];
  editable?: boolean;
  onChange?: (items: GirdItem[]) => void;
  removeItem?: (key: string) => void;
  setEditable?: (editable: boolean) => void;
}

export const FreeGird: FC<FreeGirdProps> = ({
  cols,
  width,
  rowHeight,
  dataSource,
  onChange,
  editable,
  setEditable,
  removeItem,
}) => {
  const layout = useMemo(
    () => dataSource.map(item => Object.assign(item.layout, { i: item.key })),
    [dataSource],
  );
  const { run } = useDebounceFn(
    (layout: GridLayout.Layout[]) => {
      if (typeof onChange === 'function') {
        onChange(
          dataSource.map(item => {
            const itemLayout = layout.find(l => l.i === item.key) as Layout;
            return Object.assign(item, { layout: itemLayout });
          }),
        );
      }
    },
    {
      wait: 1000,
    },
  );

  const onLayoutChange = useCallback(
    (layout: GridLayout.Layout[]) => {
      if (editable && typeof onChange === 'function') {
        run(layout);
      }
    },
    [run],
  );

  const actions = {
    removeItem,
  };

  return (
    <FreeGirdContext.Provider value={actions}>
      <GridLayout
        className="free-layout"
        layout={layout}
        onLayoutChange={onLayoutChange}
        cols={cols}
        rowHeight={rowHeight}
        width={width}
      ></GridLayout>
    </FreeGirdContext.Provider>
  );
};
