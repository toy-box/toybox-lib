import React, { FC, useCallback, useContext, useMemo } from 'react';
import { ReactSortable } from 'react-sortablejs';
import classNames from 'classnames';
import { StoreItem } from './storeItem';
import { ItemType, NumPerRowType } from '../interface';
import LayoutEditContext from '../context';

export interface StoreGroupProps {
  items: ItemType[];
  width: number;
  numPreRow: NumPerRowType;
  itemClass?: string;
  className?: string;
}

export const StoreGroup: FC<StoreGroupProps> = ({
  items,
  numPreRow,
  width,
  className,
  itemClass,
}) => {
  const context = useContext(LayoutEditContext);

  const style = {
    width,
    userSelect: 'none' as 'none',
  };

  const list = useMemo(() => items.map(item => ({ id: item.key, ...item })), [
    items,
  ]);

  return (
    <ReactSortable
      tag="div"
      className={classNames(
        `tobx-layout-edit__item-store-group`,
        `num-per-row-${numPreRow}`,
        className,
      )}
      style={style}
      list={list}
      group={{ name: 'storeItem', pull: 'clone', put: false }}
      sort={false}
      setList={() => undefined}
      onStart={() => context.setDraging && context.setDraging(true)}
      onEnd={() => context.setDraging && context.setDraging(false)}
    >
      {items.map(item => (
        <StoreItem key={item.key} item={item} className={itemClass} />
      ))}
    </ReactSortable>
  );
};
