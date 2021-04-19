import React, { FC, Fragment, ReactNode, useCallback, useMemo } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { MoreFill } from '@airclass/icons';
import { DropDownProps } from 'antd/lib/dropdown';

export interface DropdownMenuProps extends Omit<DropDownProps, 'overlay'> {
  items: MeunBaseItem[];
}

export type MeunBaseItem = MenuItem | MenuSub | MenuDivider;

export interface MenuItem {
  type: 'item';
  text: ReactNode;
  icon?: ReactNode;
  color?: string;
  danger?: boolean;
  disabled?: boolean;
  callback: (...args: any) => void;
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

const DropdownMenu: FC<DropdownMenuProps> = ({ items, children, ...props }) => {
  // const ItemRender = ({ item }: { item: MeunBaseItem}) => {
  //   switch (item.type) {
  //     case 'subMenu':
  //       return <Menu.SubMenu title={item.text}>
  //         {(item as MenuSub).items.map((subItem, idx) => <ItemRender key={idx} item={item} />)}
  //       </Menu.SubMenu>;
  //     case 'divider':
  //       return <Menu.Divider />;
  //     case 'item':
  //     default:
  //       return <Menu.Item
  //         onClick={(item as MenuItem).callback}
  //         icon={item.icon}
  //         disabled={item.disabled}
  //         danger={item.danger}
  //       >
  //         {item.text}
  //       </Menu.Item>;
  //   }
  // };

  const menu = useMemo(() => {
    return (
      <Menu>
        {items.map((item, idx) => {
          switch (item.type) {
            case 'subMenu':
              return (
                <Menu.SubMenu title={item.text}>
                  {(item as MenuSub).items.map((subItem, idx) =>
                    subItem.type === 'divider' ? (
                      <Menu.Divider key={idx} />
                    ) : (
                      <Menu.Item
                        key={idx}
                        onClick={(subItem as MenuItem).callback}
                        icon={item.icon}
                        disabled={item.disabled}
                        danger={item.danger}
                      >
                        {item.text}
                      </Menu.Item>
                    ),
                  )}
                </Menu.SubMenu>
              );
            case 'divider':
              return <Menu.Divider />;
            case 'item':
            default:
              return (
                <Menu.Item
                  key={idx}
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
      {children || (
        <Button type="text">
          <MoreFill />
        </Button>
      )}
    </Dropdown>
  );
};

export default DropdownMenu;
