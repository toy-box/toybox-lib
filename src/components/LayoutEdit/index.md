## LayoutEdit 布局编辑器

### ItemStore

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
import LayoutEditContext from './context';
import 'antd/dist/antd.css';

const layoutItems = [
  {
    key: 'a',
    type: 'base',
    index: 0,
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
  const [active, setActive] = useState();
  const change = useCallback(
    (action: string, state: any) => {
      if (action === 'add') {
        const { item, newIndex } = state;
        setLayout([
          ...layout.map(l => ({
            ...l,
            index: l.index >= newIndex ? l.index + 1 : l.index,
          })),
          { index: newIndex, ...item },
        ]);
      }
      if (action === 'setAll') {
        setLayout(state);
      }
      if (action === 'active') {
        setActive(state);
      }
    },
    [layout, setLayout],
  );

  const items = [
    {
      key: 'a',
      type: 'base',
      title: 'BASE',
      content: itemRender,
    },
    {
      key: 'b',
      type: 'redbox',
      title: 'RED BOX',
      content: itemRender,
    },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <LayoutEditContext.Provider
        value={{
          layout,
          change,
          active,
        }}
      >
        <ItemStore dataSource={items} width={200} numPreRow={2} />
        <SimpleLayout />
      </LayoutEditContext.Provider>
    </div>
  );
};
```
