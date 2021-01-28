import React, { FC } from 'react';
import { Button as AntButton, Tooltip } from 'antd';
import { ButtonProps as AntButtonProps } from 'antd/lib/button'
import { MoreFill } from '@airclass/icons';

export interface ButtonProps extends AntButtonProps {
  tooltip?: boolean;
}

const Button: FC<ButtonProps> = ({ children, icon, tooltip, ...props }) => {
  if (tooltip) {
    return <Tooltip title={children}><AntButton icon={icon || <MoreFill />}{...props}></AntButton></Tooltip>
  }
  return <AntButton icon={icon} {...props}>{children}</AntButton>;
} 

export default Button;