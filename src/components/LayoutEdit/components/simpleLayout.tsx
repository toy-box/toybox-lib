import React, { FC, ReactNode, useCallback, useContext, useMemo } from 'react';
import classNames from 'classnames';
import { ReactSortable } from 'react-sortablejs';
import sortBy from 'lodash.sortby';
import { ItemType } from '../interface';
import LayoutEditContext from '../context';

import '../styles/simpleLayout.less';

declare type LayoutItemRender = (
  type: string,
  active?: boolean,
  props?: any,
) => ReactNode;

export interface LayoutItem extends ItemType {
  index: number;
}

export interface SimpleLayoutProps {
  itemMap?: Record<string, ReactNode | LayoutItemRender>;
  groupName?: string;
}

const style = {
  border: '1px solid lightgray',
  width: '368px',
  'min-height': '600px',
};

const defaultItemMap = {
  base: () => <div style={{ background: 'blue' }}> Base Item</div>,
  redbox: () => <div style={{ background: 'red' }}> Red Box</div>,
};

const LayoutItemWrapper: FC<{ isActive: boolean; active: () => void }> = ({
  isActive,
  active,
  children,
}) => {
  return (
    <div
      className={classNames('simple-layout-item', { active: isActive })}
      onClick={active}
    >
      {children}
    </div>
  );
};

export const SimpleLayout: FC<SimpleLayoutProps> = ({
  itemMap = defaultItemMap,
  groupName = 'storeItem',
}) => {
  const context = useContext(LayoutEditContext);
  const items = useMemo(
    () =>
      sortBy(context.layout, 'index').map(item => ({ id: item.key, ...item })),
    [context.layout],
  );

  const addItem = useCallback(
    (item: any, evt: any) => {
      context.change('add', { item, index: evt.newIndex });
      return { ...item, index: evt.newIndex };
    },
    [context.change],
  );

  const setList = useCallback(
    (newState: any[], sortable: any, store: any) => {
      context.change(
        'setAll',
        newState.map((item, index) => ({ ...item, index })),
      );
    },
    [context.change],
  );

  const activeItem = useCallback(
    (key: string) => {
      context.change('active', key);
    },
    [context.change],
  );

  return (
    <ReactSortable
      tag="div"
      style={style}
      list={items}
      setList={setList}
      group={groupName}
      clone={addItem}
      className="simple-layout"
      sort
    >
      {items.map(item => {
        const render = itemMap[item.type] || itemMap['base'];
        return (
          <LayoutItemWrapper
            key={item.key}
            active={() => activeItem(item.key)}
            isActive={context.active === item.key}
          >
            {typeof render === 'function'
              ? render(
                  item.type,
                  context.active === item.key,
                  item.defaultProps,
                )
              : render}
          </LayoutItemWrapper>
        );
      })}
    </ReactSortable>
  );
};
