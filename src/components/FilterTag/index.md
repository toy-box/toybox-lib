## FilterTag

基础用法:

```tsx
import React, { useCallback, useState } from 'react';
import { FilterTag } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

export default () => {
  const filter = {
    title: '用户',
    key: 'user',
    op: '$eq',
    labelValue: [
      { value: '123', label: '记录数肯德基弗兰克斯的解放路sdfdsflk' },
    ],
  };
  return (
    <div>
      <FilterTag style={{ width: '100px' }} {...filter} ellipsis />
      <FilterTag style={{ width: '100px' }} {...filter} ellipsis />
      <FilterTag style={{ width: '100px' }} {...filter} ellipsis />
    </div>
  );
};
```
