## Search

### 基本使用

```tsx
import React from 'react';
import { Search } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

export default () => <Search placeholder="请输入关键词"></Search>
```

### 导航栏(Nav)模式

```tsx
import React from 'react';
import { Search } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

export default () => <Search type="nav-search" placeholder="请输入关键词"></Search>
```

### 图标模式

```tsx
import React from 'react';
import { Search } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

export default () =>   <Search.IconSearch placeholder="请输入关键词"></Search.IconSearch>
```
