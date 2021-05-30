## ImpInput

### 基础用法

```tsx
import React, { useCallback, useState } from 'react';
import { ImpInput } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

export default () => {
  const [data, setData] = useState('');
  return (
    <React.Fragment>
      <ImpInput value={data} onSave={setData} />
    </React.Fragment>
  );
};
```
