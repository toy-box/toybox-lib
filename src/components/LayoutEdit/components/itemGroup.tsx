import React, { FC, useCallback, useContext, useMemo } from 'react';
import { ReactSortable, Sortable } from 'react-sortablejs';
import classNames from 'classnames';
import { StoreItem } from './storeItem';
import { ItemType, NumPerRowType } from '../interface';
import LayoutEditContext from '../context';

export interface StoreGroupProps {
  items: ItemType[];
  width: number;
  numPreRow: NumPerRowType;
  itemClassName?: string;
  className?: string;
  groupName?: string;
}

export const StoreGroup: FC<StoreGroupProps> = ({
  items,
  numPreRow,
  width,
  className,
  itemClassName,
  groupName = 'storeItem',
}) => {
  const context = useContext(LayoutEditContext);

  const style = {
    width,
    userSelect: 'none' as 'none',
  };

  const list = useMemo(() => items.map(item => ({ id: item.key, ...item })), [
    items,
  ]);

  const handleDragStart = (evt: Sortable.SortableEvent) => {
    context.setDraging && context.setDraging(items[evt.oldIndex as number]);
  };

  const handleDragEnd = () => {
    context.setDraging && context.setDraging(undefined);
    context.messager && context.messager.broadcast('palaceholderEnd', null);
  };

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
      group={{ name: groupName, pull: 'clone', put: false }}
      sort={false}
      setList={() => undefined}
      onStart={handleDragStart}
      onEnd={handleDragEnd}
      forceFallback
    >
      {items.map(item => (
        <StoreItem key={item.key} item={item} className={itemClassName} />
      ))}
    </ReactSortable>
  );
};