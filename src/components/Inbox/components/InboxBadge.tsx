import React, { FC, ReactNode } from 'react';
import { Badge } from 'antd';
import classNames from 'classnames';
import { Notification4Line } from '@airclass/icons';

import '../style.less';


export type InboxBadgeProps = {
  className?: string;
  style?: Record<string, any>;
  icon?: ReactNode;
  count: number;
  color?: string;
};

export const InboxBadge: FC<InboxBadgeProps> = ({ count, style, className, icon, color }) => {
  return (
    <div className={classNames('tbox-inbox-badge', className)} style={style}>
      <Badge count={count} style={color ? { background: color } : undefined}>
        {icon || <Notification4Line />}
      </Badge>
    </div>
  );
}