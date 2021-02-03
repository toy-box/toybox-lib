## Avatar

### 基本用法

```tsx
import React from 'react';
import { Space, Tooltip, Avatar as AntAvatar } from 'antd';
import { Avatar } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

export default () => {
  return (
    <div>
      <Space>
        <Avatar size="xl" name="小明" tooltip />
        <Avatar size="large" name="小明2" />
        <Avatar size="medium" name="小明3" />
        <Avatar size="small" name="小明4" />
        <Avatar size="xs" name="小明5" />
      </Space>
    </div>
  );
};
```

### 头像组

```tsx
import React from 'react';
import { Space } from 'antd';
import { Avatar } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

const { AvatarGroup } = Avatar;

export default () => {
  const dataSource = [
    {
      name: '小明',
    },
    {
      name: '小红',
    },
    {
      name: '小花',
    },
    {
      name: '小江',
    },
  ];
  return (
    <div>
      <AvatarGroup dataSource={dataSource} maxCount={3} />
    </div>
  );
};
```

### 头像带名字

```tsx
import React from 'react';
import { Space } from 'antd';
import { Avatar } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

export default () => {
  return (
    <div>
      <Avatar.AvatarWithName name="Mike" />
    </div>
  );
};
```
