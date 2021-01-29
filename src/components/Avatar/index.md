
## Avatar

### 基本用法
暂时不建议用

```tsx
import React from 'react';
import { Space } from 'antd';
import { Avatar } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

export default () => {
  return <div>
    <Space>
      <Avatar size="xl" name="小明" />
      <Avatar size="large" name="小明" />
      <Avatar size="medium" name="小明" />
      <Avatar size="small" name="小明" />
      <Avatar size="xs" name="小明" />
    </Space>
  </div>
}
```