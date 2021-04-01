## LayoutEdit 布局编辑器

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
    type: 'card1',
    title: 'BASE',
    content: itemRender,
  },
  {
    key: 'b',
    type: 'card2',
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
    (state: any) => {
      setLayout(state);
    },
    [setLayout],
  );

  const src = 'http://localhost:8080';

  return (
    <div style={{ display: 'flex', position: 'relative', height: '720px' }}>
      <LayoutEditContext.Provider
        value={{
          layout,
          change,
          active,
          setActive,
          messager,
          draging,
          setDraging,
        }}
      >
        <ItemStore
          dataSource={items}
          width={200}
          numPreRow={2}
          style={{ position: 'absolute' }}
        />
        <LayoutFrame
          src={src}
          ref={ref}
          fixWidth={318 + 24 + 200 - 15}
          style={{
            position: 'absolute',
            left: '180px',
            top: 0,
            bottom: 0,
            right: 0,
          }}
        />
      </LayoutEditContext.Provider>
    </div>
  );
};
```

### SimpleLayout:

```tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'antd';
import { ItemStoreWrap, SimpleLayout } from '@toy-box/toybox-lib';
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
  const [layout, setLayout] = useState({ items: layoutItems });
  const [active, setActive] = useState();
  const change = useCallback(
    (state: any) => {
      setLayout(state);
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
          setActive,
        }}
      >
        <ItemStoreWrap dataSource={items} width={200} numPreRow={2} />
        <SimpleLayout />
      </LayoutEditContext.Provider>
    </div>
  );
};
```
