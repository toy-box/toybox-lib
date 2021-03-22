## FilterTag 筛选条件标签

#### 基本用法

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
      { value: '123', label: '记录数肯德基弗兰克斯的解放路德基弗兰克斯的' },
    ],
  };

  const remoteFilter = {
    title: '用户',
    key: 'user',
    op: '$eq',
    value: ['123'],
  };

  const remote = (value: (string | number)[]) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(value.map(v => `Lable:${v}`));
      }, 300);
    });
  };

  return (
    <div>
      <FilterTag
        key="1"
        style={{ width: '100px' }}
        filter={filter}
        ellipsis
        remove={console.log}
      />
      <FilterTag
        key="2"
        style={{ width: '140px' }}
        filter={filter}
        ellipsis
        remove={console.log}
      />
      <FilterTag key="3" filter={filter} remove={console.log} />
      <FilterTag key="4" filter={remoteFilter} remote={remote} />
    </div>
  );
};
```

<API></API>
