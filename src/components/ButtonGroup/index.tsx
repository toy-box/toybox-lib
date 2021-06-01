import React, { FC, ReactNode, useMemo } from 'react';
import { Space } from 'antd';
import { ButtonType, ButtonSize } from 'antd/lib/button';
import Button from '../Button';
import DropdownMenu, { MenuItem } from '../DropdownMenu';

export interface ButtonGroupProps {
  items: ButtonItem[];
  max?: number;
}

export interface ButtonItem {
  text: string;
  icon?: ReactNode;
  color?: string;
  type?: ButtonType;
  danger?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  tooltip?: boolean;
  callback: (...args: any) => void;
}

const ButtonGroup: FC<ButtonGroupProps> = ({ items, max = 3 }) => {
  const overSize = useMemo(() => items.length > max, []);

  const visiableItems = useMemo(
    () => (overSize ? items.filter((item, idx) => idx < max - 1) : items),
    [],
  );

  const dropDownItems = useMemo(
    () =>
      overSize
        ? items
            .filter((item, idx) => idx >= max - 1)
            .map(
              item =>
                ({
                  type: 'item',
                  ...item,
                } as MenuItem),
            )
        : [],
    [],
  );

  const dropDownRender = useMemo(
    () =>
      dropDownItems.length > 0 ? (
        <DropdownMenu items={dropDownItems} />
      ) : (
        undefined
      ),
    [dropDownItems],
  );

  return (
    <Space>
      {visiableItems.map((item, idx) => (
        <Button
          key={idx}
          type={item.type}
          onClick={item.callback}
          icon={item.icon}
          size={item.size}
          disabled={item.disabled}
          danger={item.danger}
          tooltip={item.tooltip}
        >
          {item.text}
        </Button>
      ))}
      {dropDownRender}
    </Space>
  );
};

export default ButtonGroup;
