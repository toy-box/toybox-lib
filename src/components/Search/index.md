## Search 搜索框

#### 基本使用

```tsx
import React from 'react';
import { Search } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

export default () => <Search placeholder={'请输入关键词'}></Search>;
```

#### 导航栏(Nav)模式

```tsx
import React from 'react';
import { Search } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

export default () => (
  <Search type="nav-search" placeholder="请输入关键词"></Search>
);
```

#### 图标模式

```tsx
import React from 'react';
import { Space } from 'antd';
import { SearchLine, Search2Line } from '@airclass/icons';
import { Button, Search } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

export default () => (
  <>
    <Search.IconSearch placeholder="请输入关键词" key="1" />
    <br />
    <Search.IconSearch placeholder="请输入关键词" key="2">
      <SearchLine />
    </Search.IconSearch>
  </>
);
```

<API src="./components/Search.tsx"></API>
