import React, { FC, ReactNode, useMemo, useCallback } from 'react';
import GridLayout, { Layout } from 'react-grid-layout';
import { useDebounceFn } from 'ahooks';
import { FreeGridContext } from './context';

import './style.less';
import { FreeGridItem } from './components/FreeGridItem';

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

export interface GridItem {
  key: string;
  itemProps?: Record<string, any>;
  itemRender: (props: Record<string, any>, remove: () => void) => ReactNode;
  layout: GridLayout.Layout;
}

export interface FreeGridProps {
  cols: number;
  width: number;
  rowHeight: number;
  dataSource: GridItem[];
  editable?: boolean;
  onChange?: (items: GridItem[]) => void;
  removeItem?: (key: string) => void;
  setEditable?: (editable: boolean) => void;
  gridItemClass?: string;
}

const FreeGrid: FC<FreeGridProps> = ({
  cols,
  width,
  rowHeight,
  dataSource,
  onChange,
  editable,
  setEditable,
  gridItemClass,
  removeItem,
}) => {
  const layout = useMemo(
    () =>
      dataSource.map(item =>
        Object.assign(item.layout, { i: item.key, static: !editable }),
      ),
    [dataSource, editable],
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
    <FreeGridContext.Provider value={actions}>
      <GridLayout
        className="free-layout"
        layout={layout}
        onLayoutChange={onLayoutChange}
        cols={cols}
        rowHeight={rowHeight}
        width={width}
      >
        {dataSource.map(item => (
          <div key={item.key}>
            <FreeGridItem
              itemRender={item.itemRender}
              layout={item.layout}
              editable={editable}
              className={gridItemClass}
            />
          </div>
        ))}
      </GridLayout>
    </FreeGridContext.Provider>
  );
};

export default FreeGrid;
