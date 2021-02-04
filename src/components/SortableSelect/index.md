## SortableSelect 可排序选择器

### 基本用法:

```tsx
import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { SortableSelect } from '@toy-box/toybox-lib';

const opts = [
  {
    label: '选项A',
    value: 'a',
  },
  {
    label: '选项B',
    value: 'b',
    disabled: true,
  },
  {
    label: '选项C',
    value: 'c',
  },
  {
    label: '选项D',
    value: 'd',
  },
  {
    label: '选项E',
    value: 'e',
  },
  {
    label: '选项F',
    value: 'f',
    disabled: true,
  },
  {
    label: '选项G',
    value: 'g',
  },
  {
    label: '选项H',
    value: 'h',
  },
];

export default () => {
  const [value, setValue] = useState(['b', 'c']);
  const [dataSource, setDataSource] = useState(opts);
  return (
    <div>
      <SortableSelect
        title="排序选择器"
        value={value}
        dataSource={dataSource}
        onChange={setValue}
        onSortEnd={setDataSource}
        multiple
      >
        <Button>Setup</Button>
      </SortableSelect>
    </div>
  );
};
```

<API></API>
