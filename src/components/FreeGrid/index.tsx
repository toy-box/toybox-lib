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
  layout?: GridLayout.Layout;
}

export interface FreeGridProps {
  cols: number;
  width: number;
  rowHeight: number;
  layout: GridLayout.Layout[];
  items: GridItem[];
  editable?: boolean;
  onChange?: (layout: GridLayout.Layout[]) => void;
  removeItem?: (key: string) => void;
  gridItemClass?: string;
}

const FreeGrid: FC<FreeGridProps> = ({
  cols,
  width,
  rowHeight,
  layout,
  items,
  onChange,
  editable,
  gridItemClass,
  removeItem,
}) => {
  const { run } = useDebounceFn(
    (layout: GridLayout.Layout[]) => {
      if (typeof onChange === 'function') {
        onChange(
          layout.map(item => {
            const itemLayout = layout.find(l => l.i === item.i) as Layout;
            return itemLayout;
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
      run(layout);
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
        {items.map(item => (
          <div key={item.key}>
            <FreeGridItem
              itemKey={item.key}
              itemRender={item.itemRender}
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
