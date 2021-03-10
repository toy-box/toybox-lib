## FreeGrid 自由布局

### 基本用法

```tsx
import React, { FCuseCallback, useEffect, useState } from 'react';
import { Switch } from 'antd';
import { FreeGrid } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

const ItemRender: FC<{ x: string }> = props => {
  return <h3>Item Render {props.x}</h3>;
};

const items = [
  {
    key: 'k1',
    itemProps: { x: 'k1' },
    itemRender: props => <ItemRender {...props.itemProps} />,
  },
  {
    key: 'k2',
    itemProps: { x: 'k2' },
    itemRender: props => <ItemRender {...props.itemProps} />,
  },
];

export default () => {
  const [editable, setEditable] = useState(true);
  const [layout, setLayout] = useState([
    {
      i: 'k1',
      x: 0,
      y: 0,
      w: 4,
      h: 3,
      minW: 4,
      minH: 3,
    },
    {
      i: 'k2',
      x: 5,
      y: 0,
      w: 4,
      h: 3,
      minW: 4,
      minH: 3,
    },
  ]);

  useEffect(() => {
    setLayout(layout.map(l => ({ ...l, static: !editable })));
  }, [editable]);

  return (
    <>
      编辑模式 <Switch checked={editable} onChange={setEditable} />
      <FreeGrid
        cols={12}
        width={800}
        rowHeight={30}
        layout={layout}
        editable={editable}
        items={items}
        onChange={setLayout}
      />
    </>
  );
};
```
