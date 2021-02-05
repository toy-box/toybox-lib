import React, { ReactNode } from 'react';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import '../style.less';

export type IconType = 'primary' | 'danger' | 'default';
export type IconSize = 'xs' | 'small' | 'medium';
type Loading = number | boolean;

export interface IconButtonProps {
  icon: ReactNode;
  type?: IconType;
  tooltip?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  size?: IconSize;
  loading?: boolean;
}

const IconButton: React.ForwardRefRenderFunction<unknown, IconButtonProps> = (
  { icon, type = 'default', tooltip, onClick, disabled, size, loading = false },
  ref,
) => {
  const buttonRef = (ref as any) || React.createRef<HTMLElement>();
  const [innerLoading, setLoading] = React.useState<Loading>(!!loading);

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>,
  ) => {
    if (innerLoading) {
      return;
    }
    if (onClick) {
      (onClick as React.MouseEventHandler<
        HTMLButtonElement | HTMLAnchorElement
      >)(e);
    }
  };

  const classes = classNames('tbox-icon-button', `tbox-icon-button-${type}`, {
    [`tbox-icon-button-${size}`]: size,
    disabled,
  });

  return tooltip ? (
    <Tooltip title={tooltip}>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        className={classes}
      >
        {icon}
      </button>
    </Tooltip>
  ) : (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      className={classes}
    >
      {icon}
    </button>
  );
};

export default IconButton;
