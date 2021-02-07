## DropdownMenu 下拉菜单

### 基础用法

目前由于 antd 实现的限制只能配置 2 级菜单

```tsx
import React from 'react';
import { DropdownMenu } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

const items = [
  {
    type: 'item',
    text: 'Menu 1',
    callback: () => console.log('menu1 clicked'),
  },
  {
    type: 'divider',
  },
  {
    type: 'item',
    text: 'Menu 2',
    callback: () => console.log('menu2 clicked'),
  },
];
export default () => <DropdownMenu items={items} />;
```

### 多级菜单

目前由于 antd 实现的限制只能配置 2 级菜单

```tsx
import React from 'react';
import { DropdownMenu } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

const items = [
  {
    type: 'item',
    text: 'Menu 1',
    callback: () => console.log('menu1 clicked'),
  },
  {
    type: 'divider',
  },
  {
    type: 'item',
    text: 'Menu 2',
    callback: () => console.log('menu2 clicked'),
  },
  {
    type: 'subMenu',
    text: 'Sub Menu 1',
    items: [
      {
        type: 'item',
        text: 'layer2 menu1',
        callback: () => console.log('layer2 menu1 clicked'),
      },
      {
        type: 'item',
        text: 'layer2 menu2',
        callback: () => console.log('layer2 menu2 clicked'),
      },
    ],
  },
];
export default () => <DropdownMenu items={items} />;
```

<API></API>
