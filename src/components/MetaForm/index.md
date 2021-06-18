## MetaForm

基础用法:

```tsx
import React, { useCallback, useState } from 'react';
import { Fields, MetaForm } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

const options = [
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b' },
  { label: 'C', value: 'c' },
  { label: 'D', value: 'd' },
  { label: 'E', value: 'e' },
];

const fieldMetaProfiles = [
  {
    key: 'sellerId',
    name: '销售',
    type: 'object',
    refObjectId: 'user',
    remote: async (key?: string) => {
      if (key === '' || key == null) {
        return await options.filter((opt, idx) => idx < 3);
      }
      const opts = await options.filter(opt => opt.label === key);
      return opts;
    },
    remoteByValue: async (value: string) => {
      return await { label: 'D', value: 'd' };
    },
  },
  {
    key: 'string',
    name: '字符串',
    type: 'string',
  },
  {
    key: 'date',
    name: '日期',
    type: 'date',
  },
];

export default () => {
  const [value, setValue] = useState<string>();
  return <MetaForm fieldMetaProfiles={fieldMetaProfiles} />;
};
```
