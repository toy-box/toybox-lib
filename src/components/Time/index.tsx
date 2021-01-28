import React, { FC, useMemo } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import classNames from 'classnames';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

export interface TimeProps {
  time: Date | number | string;
  type?: 'fromNow' | 'absolute';
  className?: string;
}

const absolute = (time: Date | number | string) => {
  const now = dayjs(new Date());
  const t = dayjs(time);
  const daysBetweenNow = now.startOf('day').diff(t.startOf('day'));
  const yearsBetweenNow = now.startOf('year').diff(t.startOf('year'));
  const yestoday = '昨天';
  if (daysBetweenNow === 0) {
    return t.format('HH:mm');
  }
  if (daysBetweenNow === 1) {
    return `${yestoday} ${t.format('HH:mm')}`
  }
  if (yearsBetweenNow === 0) {
    return t.format('M-DD HH:mm');
  }
  return t.format('YYYY-M-DD HH:mm'); 
}

const fromNow = (time: Date | number | string) => {
  return dayjs(time).fromNow();
}

const Time: FC<TimeProps> = ({ time, type, className }) => {
  const timeStr = useMemo(() => {
    if (type == 'absolute') {
      return absolute(time);
    }
    if (type === 'fromNow') {
      return fromNow(time);
    }
    return dayjs().diff(time, 'hour') <= 2 ? fromNow(time) : absolute(time);
  }, [time, type])
  return <span className={classNames('tbox-time_mavx', className)}>{timeStr}</span>
}

export default Time;
