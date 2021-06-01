import React, { FC, ReactNode, useMemo } from 'react';
import { Dropdown, Menu } from 'antd';
import { MoreFill } from '@airclass/icons';
import { DropDownProps } from 'antd/lib/dropdown';
import { ButtonProps, default as Button } from '../Button';

export type DropdownMenuProps = Omit<DropDownProps, 'overlay'> & {
  items: MeunBaseItem[];
} & Pick<ButtonProps, 'type'>;

export declare type MeunBaseItem = MenuItem | MenuSub | MenuDivider;

export declare type MenuItemType = 'item' | 'subMenu' | 'divider';

export interface MenuItem {
  type: 'item';
  text: ReactNode;
  icon?: ReactNode;
  color?: string;
  danger?: boolean;
  disabled?: boolean;
  callback?: (...args: any) => void;
}

export interface MenuDivider {
  type: 'divider';
}

export interface MenuSub {
  type: 'subMenu';
  text: ReactNode;
  icon?: ReactNode;
  color?: string;
  danger?: boolean;
  disabled?: boolean;
  items: MeunBaseItem[];
}

const DropdownMenu: FC<DropdownMenuProps> = ({
  items,
  type,
  children,
  ...props
}) => {
  const menu = useMemo(() => {
    return (
      <Menu>
        {items.map((item, index) => {
          switch (item.type) {
            case 'subMenu':
              return (
                <Menu.SubMenu title={item.text} key={index}>
                  {(item as MenuSub).items.map((subItem, idx) =>
                    subItem.type === 'divider' ? (
                      <Menu.Divider key={idx} />
                    ) : (
                      <Menu.Item
                        key={idx}
                        onClick={(subItem as MenuItem).callback}
                        icon={subItem.icon}
                        disabled={subItem.disabled}
                        danger={subItem.danger}
                      >
                        {subItem.text}
                      </Menu.Item>
                    ),
                  )}
                </Menu.SubMenu>
              );
            case 'divider':
              return <Menu.Divider key={index} />;
            case 'item':
            default:
              return (
                <Menu.Item
                  key={index}
                  onClick={(item as MenuItem).callback}
                  icon={item.icon}
                  disabled={item.disabled}
                  danger={item.danger}
                >
                  {item.text}
                </Menu.Item>
              );
          }
        })}
      </Menu>
    );
  }, [items]);

  return (
    <Dropdown overlay={menu} {...props}>
      {children || <Button type={type} icon={<MoreFill />} />}
    </Dropdown>
  );
};

export default DropdownMenu;
