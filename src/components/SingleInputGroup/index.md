## SingleInputGroup 输入组

```tsx
import React, { useState } from 'react';
import { SingleInputGroup } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

export default () => {
  const [v, setV] = useState(['1', '2', '3', '4']);
  return (
    <>
      {v}
      <SingleInputGroup
        value={v}
        onChange={v => {
          console.log('on', v);
          setV(v);
        }}
      />
    </>
  );
};
```
