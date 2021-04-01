import React, { FC, useContext, useCallback, useMemo } from 'react';
import LayoutEditContext from '../context';
import { ItemStore, ItemStoreProps } from './itemStore';
import { ItemType } from '../interface';

export declare type ItemStoreWrapProps = Omit<
  ItemStoreProps,
  'onDragStart' | 'onDragEnd'
>;

const ItemStoreWrap: FC<ItemStoreWrapProps> = props => {
  const context = useContext(LayoutEditContext);
  const onDragStart = useCallback(
    (item: ItemType) => {
      context.setDraging && context.setDraging(item);
    },
    [context.setDraging],
  );

  const onDragEnd = useCallback(() => {
    context.setDraging && context.setDraging(undefined);
    context.messager && context.messager.broadcast('palaceholderEnd', null);
  }, [context.setDraging, context.messager]);

  const storeProps = useMemo(
    () =>
      ({
        ...props,
        onDragStart,
        onDragEnd,
      } as ItemStoreProps),
    [onDragStart, onDragEnd],
  );

  return <ItemStore {...storeProps} />;
};

export default ItemStoreWrap;
