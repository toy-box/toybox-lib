## TabContainer 容器

### 基础使用

```tsx
import React from 'react';
import { Container } from '@toy-box/toybox-lib';

export default () => {
  const contents = [
    {
      key: 'a',
      title: 'IS a',
      content: () => <p>content a</p>,
    },
    {
      key: 'b',
      title: 'IS b',
      content: () => <p>content b</p>,
    },
    {
      key: 'c',
      title: 'IS c',
      content: () => <p>content c</p>,
    },
    {
      key: 'd',
      title: 'IS d',
      content: () => <p>content d</p>,
    },
  ];
  return <Container contents={contents} />;
};
```

### 默认 tab

```tsx
import React from 'react';
import { Container } from '@toy-box/toybox-lib';

export default () => {
  const contents = [
    {
      key: 'a',
      title: 'IS a',
      content: () => <p>content a</p>,
    },
    {
      key: 'b',
      title: 'IS b',
      content: () => <p>content b</p>,
    },
    {
      key: 'c',
      title: 'IS c',
      content: () => <p>content c</p>,
    },
    {
      key: 'd',
      title: 'IS d',
      content: () => <p>content d</p>,
      disabled: true,
    },
  ];
  return <Container contents={contents} activeKey={'c'} />;
};
```

### 导航栏扩展

```tsx
import React from 'react';
import { Container } from '@toy-box/toybox-lib';
import { Button } from 'antd';
import { MoreFill } from '@airclass/icons';

export default () => {
  const contents = [
    {
      key: 'a',
      title: 'IS a',
      content: () => <p>content a</p>,
    },
    {
      key: 'b',
      title: 'IS b',
      content: () => <p>content b</p>,
    },
    {
      key: 'c',
      title: 'IS c',
      content: () => <p>content c</p>,
    },
    {
      key: 'd',
      title: 'IS d',
      content: () => <p>content d</p>,
      disabled: true,
    },
  ];
  return (
    <Container
      contents={contents}
      extraContent={
        <Button type="text">
          <MoreFill />
        </Button>
      }
    />
  );
};
```

<API></API>
