import React, { FC, useCallback, useContext, useRef } from 'react';
import classNames from 'classnames';
import { ItemType } from '../interface';
import LayoutEditContext from '../context';

interface StoreItemProps {
  item: ItemType;
  className?: string;
}

export const StoreItem: FC<StoreItemProps> = ({ item, className }) => {
  const context = useContext(LayoutEditContext);
  const ref = useRef<any>();
  const handleLeaveDrag = useCallback(() => {
    context.setDraging && context.setDraging(undefined);
  }, [context.setDraging]);
  return (
    <div
      ref={ref}
      key={item.key}
      className={classNames(`tobx-layout-edit__item-wrapper`, className)}
      draggable
      onDragLeave={handleLeaveDrag}
    >
      {typeof item.content === 'function' ? item.content(item) : item.content}
    </div>
  );
};
