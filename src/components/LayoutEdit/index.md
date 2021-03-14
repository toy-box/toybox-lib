## LayoutEdit 布局编辑器

### ItemStore:

```tsx
import React, { useState, useCallback } from 'react';
import { Button } from 'antd';
import { ItemStore } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

export default () => {
  const items = [
    {
      key: 'a',
      type: 'base',
      title: 'A',
      content: props => <div>{props.title}</div>,
    },
    {
      key: 'b',
      type: 'base',
      title: 'B',
      content: props => <div>{props.title}</div>,
    },
    {
      key: 'c',
      type: 'base',
      title: 'C',
      content: props => <div>{props.title}</div>,
    },
    {
      key: 'd',
      type: 'base',
      title: 'D',
      content: props => <div>{props.title}</div>,
    },
  ];
  return (
    <div>
      <ItemStore dataSource={items} width={120} itemWidth={40} />
    </div>
  );
};
```

### SimpleLayout:

```tsx
import React, { useState, useCallback } from 'react';
import { Button } from 'antd';
import { ItemStore, SimpleLayout } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

const layoutItems = [
  {
    key: 'a',
    type: 'base',
    index: 0,
  },
  {
    key: 'b',
    type: 'base',
    index: 1,
  },
  {
    key: 'c',
    type: 'base',
    index: 2,
  },
  {
    key: 'd',
    type: 'base',
    index: 3,
  },
];

const itemRender = props => {
  return (
    <React.Fragment>
      <div className="in-store">{props.title}</div>
      <div className="in-layout">===={props.title}=====</div>
    </React.Fragment>
  );
};

export default () => {
  const [layout, setLayout] = useState(layoutItems);
  const postMessage = useCallback(
    (type: string, state: any) => {
      const { item, newIndex } = state;
      if (type === 'add') {
        setLayout([
          ...layout.map(l => ({
            ...l,
            index: l.index >= newIndex ? l.index + 1 : l.index,
          })),
          { index: newIndex, ...item },
        ]);
      }
    },
    [layout, setLayout],
  );
  const items = [
    {
      key: 'a',
      type: 'base',
      title: 'A',
      content: itemRender,
    },
    {
      key: 'b',
      type: 'base',
      title: 'B',
      content: itemRender,
    },
    {
      key: 'c',
      type: 'base',
      title: 'C',
      content: itemRender,
    },
    {
      key: 'd',
      type: 'base',
      title: 'D',
      content: itemRender,
    },
  ];

  return (
    <div>
      <ItemStore dataSource={items} width={120} numPerRow={2} />
      <SimpleLayout dataSource={layout} postMessage={postMessage} />
    </div>
  );
};
```
