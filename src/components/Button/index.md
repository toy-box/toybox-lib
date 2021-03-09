## Button 按钮

#### 普通按钮

```tsx
import React from 'react';
import { Button } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

export default () => <Button tooltip="tooltip">this is a button</Button>;
```

#### 图标按钮

```tsx
import React from 'react';
import { Space } from 'antd';
import { Button } from '@toy-box/toybox-lib';
import { HomeFill } from '@airclass/icons';
import 'antd/dist/antd.css';

export default () => (
  <>
    <Space>
      <Button.Icon size="small" icon={<HomeFill />} />
      <Button.Icon
        size="small"
        type="primary"
        tooltip="Home"
        icon={<HomeFill />}
      />
      <Button.Icon
        size="small"
        type="primary"
        pure
        icon={<HomeFill />}
        circle
      />
    </Space>
    <br />
    <Space>
      <Button.Icon icon={<HomeFill />} />
      <Button.Icon type="primary" tooltip="Home" icon={<HomeFill />} />
      <Button.Icon type="primary" icon={<HomeFill />} circle />
    </Space>
    <br />
    <Space>
      <Button.Icon
        size="large"
        icon={<HomeFill />}
        onClick={() => console.log('xxx')}
      />
      <Button.Icon
        size="large"
        type="primary"
        tooltip="Home"
        icon={<HomeFill />}
      />
      <Button.Icon size="large" type="primary" icon={<HomeFill />} circle />
    </Space>
  </>
);
```

<API></API>

## IconButton

<API src="./components/IconButton.tsx"></API>
