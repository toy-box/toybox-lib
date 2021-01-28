import React, { FC, useCallback, useMemo, ReactNode } from 'react';
import classNames from 'classnames';
import { CloseLine, CheckDoubleLine, InformationLine } from '@airclass/icons';
import { Badge } from 'antd';
import Time from '../../Time';
import Avatar from '../../Avatar';

export interface NotificationMessage {
  id: string;
  title: string;
  content: string;
  link?: string;
  userId: string;
  creator: {
    userId: string;
    avatarUrl: string;
    name: string;
    isSystem: boolean;
  };
  type: string;
  icon: string;
  createdAt: Date | string | number;
  updatedAt: Date | string | number;
  haveRead: boolean;
  mode: string;
  props?: Record<string, any>;
  badge?: number;
  appId?: string;
}

export interface NotificationProps {
  message: NotificationMessage;
  remove: (id: string) => void;
  read: (id: string) => void;
  onPick: (message: NotificationMessage) => void;
  selected?: boolean;
  style?: any;
  icons?: { [key: string]: ReactNode };
}

export const Notification: FC<NotificationProps> = ({ message, remove, read, onPick, style, selected = false, icons }) => {
  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    onPick(message);
  }, [message, onPick]);

  const handleRemove = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (typeof remove === 'function') {
      remove(message.id);
    }
  }, [message.id, remove]);

  const handleRead = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!message.haveRead && typeof read === 'function') {
      read(message.id);
    }
  }, [message.haveRead, message.id, read]);

  const mergeIcons = useMemo(() => Object.assign({
    default: <InformationLine />,
  }, icons), [icons]);

  const icon = useMemo(() => mergeIcons[message.appId || 'default'] || mergeIcons['default'], [mergeIcons]);

  const operate = useMemo(() => {
    return (
      <div className="notification-operate">
        {
          message.haveRead
            ? null
            :
            <div className="notification-operate--item" onClick={handleRead} key="read">
              <CheckDoubleLine />
            </div>
        }
        <div className="notification-operate--item" onClick={handleRemove} key="remove">
          <CloseLine />
        </div>
      </div>
    )
  }, [handleRead, handleRemove, message.haveRead]);

  const badgeItem = useMemo(() => {
    if (message.haveRead) {
      return null;
    }
    return (message.badge != null && message.badge > 0)
      ? <Badge className="notification-not-read" count={message.badge} />
      : <Badge className="notification-not-read" dot />
  }, [message.badge, message.haveRead]);

  return (
    <div className={classNames('tbox-notification', { selected })} onClick={handleClick} style={style}>
      <div className="notification-header">
        <span className="notification-type">
          {icon}
        </span>
        <span className="notification-title">
          {message.title}
        </span>
        {operate}
        {badgeItem}
      </div>
      <div className="notification-body">
        <Avatar style={{flex: 'none'}} name={message.creator.name} size="xs" img={message.creator.avatarUrl} />
        <div className="notification-content">
          <p>{message.content}</p>
          <Time time={message.createdAt} />
        </div>
      </div>
    </div>
  )
}