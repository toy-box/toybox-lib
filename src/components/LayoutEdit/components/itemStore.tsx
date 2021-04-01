import React, { FC } from 'react';
import { Collapse } from 'antd';
import classNames from 'classnames';
import { StoreGroup } from './itemGroup';
import { GroupType, ItemType, NumPerRowType } from '../interface';

import '../styles/item.less';
interface StoreBaseProps {
  width: number;
  numPreRow: NumPerRowType;
  className?: string;
  itemClassName?: string;
  style?: any;
}

interface ItemStoreProps extends StoreBaseProps {
  dataSource: ItemType[];
  group?: false;
}

interface GroupItemStoreProps extends StoreBaseProps {
  dataSource: GroupType[];
  group: true;
}

export const ItemStore: FC<ItemStoreProps | GroupItemStoreProps> = ({
  dataSource,
  group,
  width,
  numPreRow,
  className,
  itemClassName,
  style,
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
      />
    </div>
  );
};