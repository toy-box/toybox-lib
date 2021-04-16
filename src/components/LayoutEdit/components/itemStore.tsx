import React, { FC } from 'react';
import { Collapse } from 'antd';
import classNames from 'classnames';
import { StoreGroup, StoreGroupProps } from './itemGroup';
import { GroupType, ItemType, NumPerRowType } from '../interface';

import '../styles/item.less';
import Sortable from 'sortablejs';
interface StoreBaseValue
  extends Omit<StoreGroupProps, 'onDragStart' | 'onDragMove' | 'onDragEnd'> {
  width: number;
  numPreRow: NumPerRowType;
  className?: string;
  itemClassName?: string;
  style?: any;
  forceFallback?: boolean;
}

export interface ItemStoreValue extends StoreBaseValue {
  dataSource: ItemType[];
  group?: false;
}

export interface GroupItemStoreValue extends StoreBaseValue {
  dataSource: GroupType[];
  group: true;
}

export declare type ItemStoreProps = ItemStoreValue | GroupItemStoreValue;

export const ItemStore: FC<ItemStoreProps> = ({
  dataSource,
  group,
  width,
  numPreRow,
  className,
  itemClassName,
  style,
  forceFallback,
  onDragStart,
  onDragEnd,
}) => {
  const prefixCls = 'tbox-layout-edit__item-store';
  const mixStyle = {
    ...style,
    width: `${width}px`,
  };
  if (group) {
    return (
      <div className={classNames(prefixCls, className)} style={mixStyle}>
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          className={`${prefixCls}-groups`}
        >
          {(dataSource as GroupType[]).map((group, idx) => (
            <Collapse.Panel key={idx} header={group.title}></Collapse.Panel>
          ))}
        </Collapse>
      </div>
    );
  }
  return (
    <div className={classNames(prefixCls, className)} style={mixStyle}>
      <StoreGroup
        items={dataSource as ItemType[]}
        width={width}
        numPreRow={numPreRow}
        itemClassName={itemClassName}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        forceFallback={forceFallback}
      />
    </div>
  );
};
