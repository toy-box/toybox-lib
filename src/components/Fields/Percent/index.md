## Percent 百分比

#### 基本用法

```tsx
import React, { useCallback, useState } from 'react';
import { Fields } from '@toy-box/toybox-lib';

import 'antd/dist/antd.css';

const field = {
  key: 'percent',
  name: '百分比',
  type: 'percent',
};

export default () => {
  const [value, setValue] = useState();
  return (
    <div>
      {value}
      <Fields.FieldPercent
        value={value}
        field={field}
        mode="edit"
        onChange={setValue}
      />
    </div>
  );
};
```

<API></API>
