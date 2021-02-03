## Time

### 基本用法:

```tsx
import React from 'react';
import { Space } from 'antd';
import dayjs from 'dayjs';
import { RelativeTime as Time } from '@toy-box/toybox-lib';

export default () => {
  const now = dayjs();
  return (
    <Space>
      <Time time={now.toDate()} />
      <Time time={now.subtract(1, 'minute').toDate()} />
      <Time time={now.subtract(12, 'minute').toDate()} />
      <Time time={now.subtract(1, 'hour').toDate()} />
      <Time time={now.subtract(12, 'hour').toDate()} />
      <Time time={now.subtract(20, 'hour').toDate()} />
      <Time time={now.subtract(1, 'month').toDate()} />
      <Time time={now.subtract(1, 'year').toDate()} />
    </Space>
  );
};
```
