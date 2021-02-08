## SingleInputGroup 输入组

### 普通用法

```tsx
import React, { useState } from 'react';
import { SingleInputGroup } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

export default () => {
  const [v, setV] = useState([]);
  return (
    <div style={{ width: '320px' }}>
      <SingleInputGroup
        value={v}
        onChange={v => {
          console.log('on', v);
          setV(v);
        }}
      />
    </div>
  );
};
```

### 限定数字

```tsx
import React, { useState } from 'react';
import { SingleInputGroup } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

export default () => {
  const [v, setV] = useState([]);
  return (
    <div style={{ width: '320px' }}>
      <SingleInputGroup
        type="number"
        value={v}
        onChange={v => {
          console.log('on', v);
          setV(v);
        }}
      />
    </div>
  );
};
```

<API></API>
