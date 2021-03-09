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
  return <SelectPro options={options} style={{ width: '200px' }} />;
};
```

### 多选

```tsx
import React from 'react';
import { SelectPro } from '@toy-box/toybox-lib';

const options = [
  {
    label: 'One',
    value: '111',
  },
  {
    label: 'Tow',
    value: '222',
  },
  {
    label: 'Three',
    value: '333',
  },
  {
    label: 'Four',
    value: '444',
  },
  {
    label: 'Five',
    value: '555',
  },
  {
    label: 'Six',
    value: '666',
  },
];
export default () => {
  return (
    <SelectPro
      mode={'multiple'}
      options={options}
      style={{ width: '200px' }}
      showSearch
    />
  );
};
```

### 只读模式

```tsx
import React from 'react';
import { Tag } from 'antd';
import { SelectPro } from '@toy-box/toybox-lib';

const options = [
  {
    label: 'ONE',
    value: '111',
  },
  {
    label: 'TWO',
    value: '222',
  },
  {
    label: 'THREE',
    value: '333',
  },
  {
    label: 'FOUR',
    value: '444',
  },
  {
    label: 'FIVE',
    value: '555',
  },
  {
    label: 'SIX',
    value: '666',
  },
];
export default () => {
  const itemRender = (value: string, title: string) => <Tag>{title}</Tag>;
  return (
    <>
      <SelectPro
        value={['111', '222']}
        mode={'multiple'}
        options={options}
        style={{ width: '200px' }}
        optionSearch
        readMode
      />
      <p />
      <SelectPro
        value={['111', '222']}
        mode={'multiple'}
        options={options}
        style={{ width: '200px' }}
        optionSearch
        itemRender={itemRender}
        readMode
      />
    </>
  );
};
```

### 特色搜索

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
    <SelectPro options={options} style={{ width: '200px' }} optionSearch />
  );
};
```
