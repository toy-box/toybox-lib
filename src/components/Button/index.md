## Button 按钮

### 普通按钮

```tsx
import React from 'react';
import { Button } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

export default () => <Button tooltip="tooltip">this is a button</Button>;
```

### 图标按钮

```tsx
import React from 'react';
import { Button } from '@toy-box/toybox-lib';
import { HomeFill } from '@airclass/icons';
import 'antd/dist/antd.css';

export default () => (
  <Button.Icon type="primary" tooltip="Home" icon={<HomeFill />} />
);
```

<API></API>
