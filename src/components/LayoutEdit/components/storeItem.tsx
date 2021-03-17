import React, { FC, LegacyRef, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { ItemType } from '../interface';

interface StoreItemProps {
  item: ItemType;
  className?: string;
}

export const StoreItem: FC<StoreItemProps> = ({ item, className }) => {
  const ref = useRef<any>();
  return (
    <div
      ref={ref}
      key={item.key}
      className={classNames(`tobx-layout-edit__item-wrapper`, className)}
      draggable
    >
      {typeof item.content === 'function' ? item.content(item) : item.content}
    </div>
  );
};
