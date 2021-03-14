import React, { FC, ReactNode, useMemo } from 'react';
import { ReactSortable } from 'react-sortablejs';
import sortBy from 'lodash.sortby';
import { ItemType } from '../interface';

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
  dataSource: LayoutItem[];
  itemMap?: Record<string, ReactNode | LayoutItemRender>;
  active?: string;
  groupName?: string;
  postMessage: (type: string, state: any) => void;
}

const style = {
  border: '1px solid gray',
  width: '368px',
  'min-height': '600px',
};

const defaultItemMap = {
  base: () => <div style={{ background: 'blue' }}> Base Item </div>,
};

export const SimpleLayout: FC<SimpleLayoutProps> = ({
  dataSource,
  itemMap = defaultItemMap,
  active,
  groupName = 'storeItem',
  postMessage,
}) => {
  const items = useMemo(
    () => sortBy(dataSource, 'index').map(item => ({ id: item.key, ...item })),
    [dataSource],
  );
  const addItem = (item: any, evt: any) => {
    console.log('new item', item, evt);
    postMessage('add', { item, index: evt.newIndex });
    return item;
  };
  return (
    <ReactSortable
      tag="div"
      style={style}
      list={items}
      setList={console.log}
      group={groupName}
      clone={addItem}
      className="simple-layout"
    >
      {items.map(item => {
        const render = itemMap[item.type] || itemMap['base'];
        return typeof render === 'function'
          ? render(item.type, active === item.key, item.defaultProps)
          : render;
      })}
    </ReactSortable>
  );
};
