import React, { FC, useMemo } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { MoreFill } from '@airclass/icons';

export interface OperateColumnProps {
  text: { [key: string]: any };
  record: { [key: string]: any };
  index: number;
  operateItems: OperateItem[];
}

export type OperateItem = ButtonProps & {
  text?: string;
  icon?: string;
  color?: string;
  callback?: (record: Record<string, any> , index: number) => void;
  disabled?: (text: any, record: Record<string, any>, index: number) => boolean | boolean;
}

export const operateFactory = (operateItems: OperateItem[], fc: FC<{ text: any; record: { [key: string]: any }; index: number, operateItems: OperateItem[] }>) => {
  return (text: any, record: { [key: string]: any }, index: number) => {
    return fc({ text, record, index, operateItems });
  };
}

export const OperateColumn: FC<OperateColumnProps> = ({ text, record, index, operateItems }) => {
  return <div className="tbox-operate-column">
    {
      operateItems.map((item, idx) => {
        const doDisabled = typeof item.disabled === 'function'
          ? item.disabled(text, record, index)
          : item.disabled;
        return (
          <Button
            key={idx}
            disabled={doDisabled}
            onClick={() => item.callback && item.callback(record, index)}
            {...item}
          >
            {item.text}
          </Button>
        );
      })
    }
  </div>
}

export const OperateDropdown: FC<OperateColumnProps> = ({ text, record, index, operateItems }) => {
  const menu = useMemo(() => {
    return <Menu>
      {
        operateItems.map((item, idx) => {
          const doDisabled = typeof item.disabled === 'function'
            ? item.disabled(text, record, index)
            : item.disabled;
          return <Menu.Item
            key={idx}
            onClick={() => item.callback && item.callback(record, index)}
            danger={item.danger}
            disabled={doDisabled}
          >
            {item.text}
          </Menu.Item>
        })
      }
    </Menu>
  }, [index, operateItems, record, text]);

  return <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
    <Button type="text" icon={<MoreFill />} />
  </Dropdown>
}
