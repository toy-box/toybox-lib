import React, { useMemo } from 'react';
import { Button as AntButton, Tooltip } from 'antd';
import { ButtonProps as AntButtonProps } from 'antd/lib/button';
import { MoreFill } from '@airclass/icons';
import IconButton from './components/IconButton';

export interface ButtonProps extends AntButtonProps {
  tooltip?: boolean;
}

const Button = ({ children, icon, tooltip, ...props }: ButtonProps) => {
  if (tooltip) {
    return (
      <Tooltip title={children}>
        <AntButton icon={icon || <MoreFill />} {...props}></AntButton>
      </Tooltip>
    );
  }
  return (
    <AntButton icon={icon} {...props}>
      {children}
    </AntButton>
  );
};

Button.Icon = IconButton;
export default Button;
