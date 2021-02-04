## LoadingWrapper 加载容器

Demo:

```tsx
import React, { useState, useCallback } from 'react';
import { Button } from 'antd';
import { LoadingWrapper } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

export default () => {
  const [loading, setLoading] = useState(true);
  const toggle = useCallback(() => {
    setLoading(!loading);
  }, [loading]);
  return (
    <div>
      <LoadingWrapper loading={loading}>
        <h1>load completed ...</h1>
      </LoadingWrapper>
      <Button onClick={toggle}>toggle</Button>
    </div>
  );
};
```
