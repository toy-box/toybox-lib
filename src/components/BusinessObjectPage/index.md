## BusinessObjectPage 业务详情页

### 基础用法

```tsx
import React from 'react';
import { BusinessObjectPage } from '@toy-box/toybox-lib';

const objectMeta = {
  key: 'bill',
  name: '账单',
  description: '账单',
  properties: {
    id: {
      key: 'id',
      name: 'ID',
      description: 'ID',
      type: 'string',
    },
    open: {
      key: 'open',
      name: '开放状态',
      type: 'boolean',
    },
    name: {
      key: 'name',
      name: '名称',
      type: 'string',
    },
    billCycle: {
      key: 'billCycle',
      name: '账期',
      type: 'date',
    },
    amount: {
      key: 'amount',
      name: '金额',
      type: 'number',
    },
    user: {
      key: 'user',
      name: '用户',
      type: 'businessObject',
      titleKey: 'name',
      properties: {
        id: {
          key: 'id',
          name: 'ID',
          type: 'string',
        },
        name: {
          key: 'name',
          name: '用户名',
          type: 'string',
        },
      },
    },
  },
  titleKey: 'name',
};

const data = {
  id: '1234',
  name: '销售',
  billCycle: '2020-01-01',
  amount: 2000,
  user: {
    id: 'xxx',
    name: '熊丽',
  },
};

export default () => {
  return (
    <BusinessObjectPage
      businessObjectMeta={objectMeta}
      data={data}
      extraContent={null}
    />
  );
};
```

### 扩展

```tsx
import React from 'react';
import { BusinessObjectPage } from '@toy-box/toybox-lib';

const objectMeta = {
  key: 'bill',
  name: '账单',
  description: '账单',
  properties: {
    id: {
      key: 'id',
      name: 'ID',
      description: 'ID',
      type: 'string',
    },
    open: {
      key: 'open',
      name: '开放状态',
      type: 'boolean',
    },
    name: {
      key: 'name',
      name: '名称',
      type: 'string',
    },
    billCycle: {
      key: 'billCycle',
      name: '账期',
      type: 'date',
    },
    amount: {
      key: 'amount',
      name: '金额',
      type: 'number',
    },
    user: {
      key: 'user',
      name: '用户',
      type: 'businessObject',
      titleKey: 'name',
      properties: {
        id: {
          key: 'id',
          name: 'ID',
          type: 'string',
        },
        name: {
          key: 'name',
          name: '用户名',
          type: 'string',
        },
      },
    },
  },
  titleKey: 'name',
};

const data = {
  id: '1234',
  name: '销售',
  billCycle: '2020-01-01',
  amount: 2000,
  user: {
    id: 'xxx',
    name: '熊丽',
  },
};

const extraContent = [
  {
    key: 'extra1',
    title: '扩展1',
    render: () => <p>扩展1的内容</p>,
  },
  {
    key: 'extra2',
    title: '扩展2',
    render: () => <p>扩展2的内容</p>,
  },
  {
    key: 'extra3',
    title: '扩展3',
    render: () => <p>扩展3的内容</p>,
  },
];

export default () => {
  return (
    <BusinessObjectPage
      businessObjectMeta={objectMeta}
      data={data}
      extraContent={extraContent}
    />
  );
};
```

<API></API>
