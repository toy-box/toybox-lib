## LayoutEdit 布局编辑器

### SimpleLayout:

```tsx
import React, { useState, useEffect, useCallback } from 'react';
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

### LayoutFrame:

```tsx
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ItemStore, LayoutFrame, Messager } from '@toy-box/toybox-lib';
import LayoutEditContext from './context';
import 'antd/dist/antd.css';

const itemRender = props => {
  return (
    <React.Fragment>
      <div className="in-store">{props.title}</div>
      <div className="in-layout">===={props.title}=====</div>
    </React.Fragment>
  );
};

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

const layoutItems = [
  {
    key: 'card1',
    type: 'card',
    index: 0,
    props: {
      title: 'This is iPad',
      desc: '描述信息',
      price: 3100,
      thumb: 'https://img.yzcdn.cn/vant/ipad.jpeg',
    },
  },
  {
    key: 'card2',
    type: 'card',
    index: 1,
    props: {
      title: 'This is iPad Pro',
      desc: '描述信息',
      price: 7200,
      thumb: 'https://img.yzcdn.cn/vant/ipad.jpeg',
    },
  },
];

export default () => {
  const [layout, setLayout] = useState(layoutItems);
  const [active, setActive] = useState();
  const [messager, setMessager] = useState();
  const [draging, setDraging] = useState(false);
  const ref = useRef();

  useEffect(() => {
    setMessager(
      new Messager(ref.current.contentWindow, 'http://localhost:8080'),
    );
  }, [setMessager, ref.current]);

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

  const src = 'http://localhost:8080';
  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      <LayoutEditContext.Provider
        value={{
          layout,
          change,
          active,
          messager,
          draging,
          setDraging,
        }}
      >
        <ItemStore dataSource={items} width={200} numPreRow={2} />
        <LayoutFrame src={src} style={{ width: '440px' }} ref={ref} />
      </LayoutEditContext.Provider>
    </div>
  );
};
```
