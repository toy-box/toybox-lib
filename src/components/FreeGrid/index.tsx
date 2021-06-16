import React, { FC, ReactNode, useCallback, useRef } from 'react';
import GridLayout from 'react-grid-layout';
import { useDebounceFn, useSize } from 'ahooks';
import { FreeGridContext } from './context';

import './style.less';
import { FreeGridItem, Background } from './components';

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
  itemRender: (props: Record<string, any>) => ReactNode;
  layout?: GridLayout.Layout;
}

export interface LayoutType extends GridLayout.Layout {
  item: GridItem;
}
export interface FreeGridProps {
  cols: number;
  width: number;
  rowHeight: number;
  layout: LayoutType[];
  editable?: boolean;
  onChange?: (layout: LayoutType[]) => void;
  removeItem?: (key: string) => void;
  gridItemClass?: string;
}

const FreeGrid: FC<FreeGridProps> = ({
  cols,
  width,
  rowHeight,
  layout,
  onChange,
  editable,
  gridItemClass,
  removeItem,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);
  const { run } = useDebounceFn(
    (newLayout: GridLayout.Layout[]) => {
      if (typeof onChange === 'function') {
        onChange(
          newLayout.map(nl => {
            const l = layout.find(l => l.i === nl.i);
            return { ...nl, item: l?.item } as LayoutType;
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

  return (
    <FreeGridContext.Provider value={{ removeItem }}>
      <div className="free-grid">
        <div className="gird">
          {editable && (
            <Background
              cols={cols}
              width={width}
              height={size.height}
              rowHeight={rowHeight}
            />
          )}
        </div>
        <GridLayout
          className="free-layout"
          layout={layout}
          onLayoutChange={onLayoutChange}
          cols={cols}
          rowHeight={rowHeight}
          width={width}
        >
          {layout.map(itemLayout => {
            const { item } = itemLayout;
            return item ? (
              <div key={itemLayout.i}>
                <FreeGridItem
                  itemProps={item.itemProps}
                  itemKey={item.key}
                  itemRender={item.itemRender}
                  editable={editable}
                  className={gridItemClass}
                />
              </div>
            ) : (
              undefined
            );
          })}
        </GridLayout>
      </div>
    </FreeGridContext.Provider>
  );
};

export default FreeGrid;
