## CheckText

#### 基本使用

```tsx
import React from 'react';
import { Space } from 'antd';
import { CheckText } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

export default () => (
  <ul>
    <li>
      <CheckText text="check item 1" />
    </li>
    <li>
      <CheckText checked text="check item 2" />
    </li>
  </ul>
);
```
