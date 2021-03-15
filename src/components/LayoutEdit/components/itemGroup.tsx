import React, { FC, useMemo } from 'react';
import { ReactSortable } from 'react-sortablejs';
import classNames from 'classnames';
import { ItemType, NumPerRowType } from '../interface';

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
  const style = {
    width,
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
    >
      {items.map(item => (
        <div
          key={item.key}
          className={classNames(`tobx-layout-edit__item-wrapper`, itemClass)}
        >
          {typeof item.content === 'function'
            ? item.content(item)
            : item.content}
        </div>
      ))}
    </ReactSortable>
  );
};
