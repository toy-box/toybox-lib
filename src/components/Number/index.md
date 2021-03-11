## Number 数字

### 基本用法:

```tsx
import React from 'react';
import { ConfigProvider, Space } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { Number } from '@toy-box/toybox-lib';

export default () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Space>
        <Number value={1000} />
        <Number value={1500} />
        <Number value={1500.0} currency />
      </Space>
    </ConfigProvider>
  );
};
```
