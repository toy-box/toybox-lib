## RelativeTime 相对时间

### 基本用法:

```tsx
import React from 'react';
import { Space } from 'antd';
import dayjs from 'dayjs';
import { RelativeTime } from '@toy-box/toybox-lib';

export default () => {
  const now = dayjs();
  return (
    <Space>
      <RelativeTime time={now.toDate()} />
      <RelativeTime time={now.subtract(1, 'minute').toDate()} />
      <RelativeTime time={now.subtract(12, 'minute').toDate()} />
      <RelativeTime time={now.subtract(1, 'hour').toDate()} />
      <RelativeTime time={now.subtract(12, 'hour').toDate()} />
      <RelativeTime time={now.subtract(20, 'hour').toDate()} />
      <RelativeTime time={now.subtract(1, 'month').toDate()} />
      <RelativeTime time={now.subtract(1, 'year').toDate()} />
    </Space>
  );
};
```
