## VerticalTable 垂直表格

### 基本用法

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
      headerWidth={100}
      dataSource={data}
      columns={columns}
    />
  );
};
```

### 表格尺寸

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
    <>
      <h4>Middle size table</h4>
      <VerticalTable
        columnWidth={120}
        headerWidth={100}
        dataSource={data}
        columns={columns}
        size={'middle'}
      />
      <br />
      <h4>Small size table</h4>
      <VerticalTable
        columnWidth={120}
        headerWidth={100}
        dataSource={data}
        columns={columns}
        size={'small'}
      />
    </>
  );
};
```

### 带边框

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
    <>
      <VerticalTable
        columnWidth={120}
        headerWidth={100}
        dataSource={data}
        columns={columns}
        bordered
      />
    </>
  );
};
```

### 不显示表头

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
    amount: 2500,
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
    <>
      <VerticalTable
        columnWidth={120}
        headerWidth={100}
        dataSource={data}
        columns={columns}
        showHeader={false}
      />
    </>
  );
};
```

### 可选择

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
    id: '1237',
    name: '实收',
    billCycle: '2020-03-03',
    amount: 2500,
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
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  return (
    <>
      <VerticalTable
        columnWidth={120}
        headerWidth={100}
        dataSource={data}
        columns={columns}
        rowSelection={rowSelection}
        rowKey={'id'}
      />
    </>
  );
};
```

### 横向滚动

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
    id: '1237',
    name: '实收',
    billCycle: '2020-03-03',
    amount: 2500,
  },
  {
    id: '1238',
    name: '实收',
    billCycle: '2020-05-03',
    amount: 2500,
  },
  {
    id: '1239',
    name: '实收',
    billCycle: '2020-06-03',
    amount: 3500,
  },
  {
    id: '1240',
    name: '实收',
    billCycle: '2020-07-03',
    amount: 3700,
  },
  {
    id: '1241',
    name: '实收',
    billCycle: '2020-08-03',
    amount: 3900,
  },
  {
    id: '1242',
    name: '实收',
    billCycle: '2020-09-03',
    amount: 4000,
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
    <>
      <VerticalTable
        columnWidth={120}
        headerWidth={100}
        dataSource={data}
        columns={columns}
      />
    </>
  );
};
```

<API></API>
