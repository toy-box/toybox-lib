import React, {
  FC,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  ReactNode,
} from 'react';
import { Empty } from 'antd';
import { useSize, useScroll, useThrottleFn } from 'ahooks';
import { Notification, NotificationMessage } from './Notification';
import LoadingWrapper from '../../LoadingWrapper';

export interface InboxContentProps {
  onPick: (message: NotificationMessage) => void;
  loading?: boolean;
  hasMore: boolean;
  messages?: NotificationMessage[];
  selectedId?: string | number;
  icons?: Record<string, ReactNode>;
  loadMore: (offset: number, limit: number) => Promise<any>;
  remove: (id: string) => void;
  read: (id: string) => void;
}

export const InboxContent: FC<InboxContentProps> = ({
  loading,
  hasMore,
  onPick,
  messages = [],
  selectedId,
  icons,
  loadMore,
  read,
  remove,
}) => {
  const ref = useRef<any>();
  const contentRef = useRef<any>();
  const size = useSize(ref);
  const scroll = useScroll(contentRef);
  const contentSize = useSize(contentRef);

  const isTouchButton = useMemo(() => {
    return scroll.top + (contentSize.height || 0) >= (size.height || 0);
  }, [contentSize.height, scroll.top, size.height]);

  const loadMoreItems = useCallback(
    (start: number, stop: number) => {
      if (!loading) {
        return loadMore(start, stop);
      }
      return null;
    },
    [loadMore, loading],
  );

  const { run } = useThrottleFn(
    (start: number, stop: number) => loadMoreItems(start, stop),
    { wait: 500 },
  );

  useEffect(() => {
    if (isTouchButton && hasMore) {
      run(messages.length, 10);
    }
  }, [isTouchButton, messages.length, hasMore, run]);

  const isEmpty = useMemo(() => {
    return (messages == null || messages.length === 0) && !loading;
  }, [loading, messages]);

  const messageList = useMemo(() => {
    return (
      <LoadingWrapper loading={messages == null}>
        <div
          className="notification-list"
          style={isEmpty ? { display: 'none' } : undefined}
          ref={ref}
        >
          {messages.map((message, index) => (
            <Notification
              key={index}
              onPick={onPick}
              selected={message.id === selectedId}
              message={message}
              remove={remove}
              read={read}
              icons={icons}
            />
          ))}
        </div>
        {isEmpty ? (
          <div style={{ paddingTop: '60px' }}>
            <Empty description="没发现消息通知" />
          </div>
        ) : null}
      </LoadingWrapper>
    );
  }, [messages, isEmpty, onPick, selectedId, remove, read, icons]);

  return (
    <div className="tbox-inbox-content" ref={contentRef}>
      {messageList}
    </div>
  );
};
