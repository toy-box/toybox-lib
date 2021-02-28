## String 文本

### 基本用法

```tsx
import React, { useCallback, useState } from 'react';
import { Fields } from '@toy-box/toybox-lib';

export default () => {
  const [data, setData] = useState('123');

  const field = {
    key: 'string',
    name: 'string',
    type: 'string',
  };

  return (
    <Fields.FieldString
      field={field}
      mode="edit"
      style={{ width: '100%' }}
      placeholder="Please select"
      value={data}
      onChange={e => setData(e.target.value)}
    />
  );
};
```
