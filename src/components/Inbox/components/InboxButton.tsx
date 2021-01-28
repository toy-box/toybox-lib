import React, { FC, ReactNode, useCallback } from 'react';
import classNames from 'classnames';
import { Popover } from 'antd';
import { TooltipPlacement } from 'antd/lib/tooltip';
import { default as Inbox, InboxProps } from './Inbox';
import { InboxBadge } from './InboxBadge';

export type InboxButtonProps = InboxProps & {
  placement?: TooltipPlacement;
  className?: string;
  style?: Record<string, any>;
  badge: number;
  icon?: ReactNode;
};

export const InboxButton: FC<InboxButtonProps> = ({
  remove,
  read,
  loadMore,
  reload,
  messages,
  badge,
  style,
  className,
  placement,
  icon,
  hasMore,
}) => {
  const handleRead = useCallback(async (id: string) => {
    await read(id);
  }, [read]);

  return (
    <Popover
      placement={placement}
      destroyTooltipOnHide={true}
      overlayClassName="popover-no-padding popover-no-arrow"
      content={
        <Inbox
          read={handleRead}
          remove={remove}
          onPick={() => undefined}
          loadMore={loadMore}
          reload={reload}
          messages={messages}
          badge={badge}
          hasMore={hasMore}
        />
      }
      trigger="click"
    >
      <InboxBadge
        icon={icon}
        className={classNames('tbox-inbox-button', className)}
        style={style}
        count={badge}
      />
    </Popover>
  );
}