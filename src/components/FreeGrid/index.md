## FreeGrid 自由布局

### 基本用法

```tsx
import React, { useCallback, useState } from 'react';
import { FreeGrid } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

export default () => {
  const dataSource = [
    {
      key: 'k1',
      layout: {
        i: 'k1',
        x: 0,
        y: 0,
        w: 4,
        h: 3,
        minW: 4,
        minH: 3,
      },
      itemRender: () => <h3>Item Render 1</h3>,
    },
    {
      key: 'k2',
      layout: {
        i: 'k2',
        x: 5,
        y: 0,
        w: 4,
        h: 3,
        minW: 4,
        minH: 3,
      },
      itemRender: () => <h3>Item Render 2</h3>,
    },
  ];

  return (
    <FreeGrid cols={12} width={800} rowHeight={30} dataSource={dataSource} />
  );
};
```

### 编辑模式

```tsx
import React, { useCallback, useState } from 'react';
import { Switch } from 'antd';
import { FreeGrid } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

export default () => {
  const [editable, setEditable] = useState(false);
  const dataSource = [
    {
      key: 'k1',
      layout: {
        i: 'k1',
        x: 0,
        y: 0,
        w: 4,
        h: 3,
        minW: 4,
        minH: 3,
      },
      itemRender: () => <h3>Item Render 1</h3>,
    },
    {
      key: 'k2',
      layout: {
        i: 'k2',
        x: 5,
        y: 0,
        w: 4,
        h: 3,
        minW: 4,
        minH: 3,
      },
      itemRender: () => <h3>Item Render 2</h3>,
    },
  ];

  return (
    <>
      <Switch value={editable} onChange={setEditable} />
      <FreeGrid
        cols={12}
        width={800}
        rowHeight={30}
        dataSource={dataSource}
        editable={editable}
      />
    </>
  );
};
```

<API></API>
