## VerticalTable 垂直表格

#### 基本用法

```tsx
import React from 'react';
import { VerticalTable } from '@toy-box/toybox-lib';

const data = [
  {
    id: '1234',
    name: '销售',
    billCycle: '2020-01-01',
    amount: 2000,
  },
  {
    id: '1235',
    name: '销售',
    billCycle: '2020-02-01',
    amount: 1300,
  },
  {
    id: '1236',
    name: '实收',
    billCycle: '2020-03-03',
    amount: 1500,
  },
  {
    id: '1236',
    name: '实收',
    billCycle: '2020-03-03',
    amount: 1500,
  },
  {
    id: '1236',
    name: '实收',
    billCycle: '2020-03-03',
    amount: 1500,
  },
  {
    id: '1236',
    name: '实收',
    billCycle: '2020-03-03',
    amount: 1500,
  },
  {
    id: '1236',
    name: '实收',
    billCycle: '2020-03-03',
    amount: 1500,
  },
];

const columns = [
  {
    title: 'ID',
    key: 'id',
  },
  {
    title: '名称',
    key: 'name',
  },
  {
    title: '金额',
    key: 'amount',
  },
];

export default () => {
  return (
    <VerticalTable
      columnWidth={120}
      headWidth={100}
      dataSource={data}
      columns={columns}
    />
  );
};
```
