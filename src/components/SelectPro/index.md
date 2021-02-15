## SelectPro 选择器 Pro

### 基本用法

```tsx
import React from 'react';
import { SelectPro } from '@toy-box/toybox-lib';

const options = [
  {
    label: '111',
    value: '111',
  },
  {
    label: '222',
    value: '222',
  },
  {
    label: '333',
    value: '333',
  },
  {
    label: '444',
    value: '444',
  },
  {
    label: '555',
    value: '555',
  },
  {
    label: '666',
    value: '666',
  },
];
export default () => {
  return (
    <SelectPro mode={'multiple'} options={options} style={{ width: '100px' }} />
  );
};
```
