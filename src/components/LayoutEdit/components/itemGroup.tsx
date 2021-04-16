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
  onDragStart?: (item: ItemType, evt: Sortable.SortableEvent) => void;
  onDragMove?: (evt: Sortable.MoveEvent, originalEvent: Event) => void;
  onDragEnd?: (item: ItemType, evt: Sortable.SortableEvent) => void;
  forceFallback?: boolean;
}

export const StoreGroup: FC<StoreGroupProps> = ({
  items,
  numPreRow,
  width,
  className,
  itemClassName,
  groupName = 'storeItem',
  onDragStart,
  onDragMove,
  onDragEnd,
  forceFallback = true,
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
    onDragStart && onDragStart(items[evt.oldIndex as number], evt);
  };

  const handleDragMove = (evt: Sortable.MoveEvent, originalEvent: Event) => {
    onDragMove && onDragMove(evt, originalEvent);
  };

  const handleDragEnd = (evt: Sortable.SortableEvent) => {
    onDragEnd && onDragEnd(items[evt.oldIndex as number], evt);
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
      onMove={handleDragMove}
      onEnd={handleDragEnd}
      forceFallback={forceFallback}
    >
      {items.map(item => (
        <StoreItem key={item.key} item={item} className={itemClassName} />
      ))}
    </ReactSortable>
  );
};
