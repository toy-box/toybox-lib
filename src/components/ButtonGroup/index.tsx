import React, { FC, ReactNode } from 'react';
import { ButtonType, ButtonSize } from 'antd/lib/button';
import Button from '../Button';


export interface ButtonGroupProps {
  items: ButtonItem[];  
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

const ButtonGroup: FC<ButtonGroupProps> = ({ items }) => {
  return <React.Fragment>
    {
      items.map(
        (item, idx) =>
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
      )
    }
  </React.Fragment>
}

export default ButtonGroup;
