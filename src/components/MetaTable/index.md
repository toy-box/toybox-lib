## MetaTable 元数据表格

### 基本用法

```tsx
import React, { useMemo } from 'react';
import { MetaTable } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

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

const data = [
  {
    id: '1234',
    name: '销售',
    billCycle: '2020-01-01',
    amount: 2000,
    user: {
      id: 'xxx',
      name: '熊丽',
    },
  },
  {
    id: '1235',
    name: '销售',
    billCycle: '2020-02-01',
    amount: 1300,
    user: {
      id: 'xxx2',
      name: '熊丽2',
    },
  },
  {
    id: '1236',
    name: '实收',
    billCycle: '2020-03-03',
    amount: 1500,
  },
];

export default () => {
  const columnMetas = useMemo(() => {
    return Object.keys(objectMeta.properties).map(key =>
      Object.assign(objectMeta.properties[key]),
    );
  }, [objectMeta]);

  return <MetaTable dataSource={data} columnMetas={columnMetas} />;
};
```

### 行操作

```tsx
import React, { useMemo } from 'react';
import { MetaTable } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

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

const data = [
  {
    id: '1234',
    name: '销售',
    billCycle: '2020-01-01',
    amount: 2000,
    user: {
      id: 'xxx',
      name: '熊丽',
    },
  },
  {
    id: '1235',
    name: '销售',
    billCycle: '2020-02-01',
    amount: 1300,
    user: {
      id: 'xxx2',
      name: '熊丽2',
    },
  },
  {
    id: '1236',
    name: '实收',
    billCycle: '2020-03-03',
    amount: 1500,
  },
];

export default () => {
  const columnMetas = useMemo(() => {
    return Object.keys(objectMeta.properties).map(key =>
      Object.assign(objectMeta.properties[key]),
    );
  }, [objectMeta]);

  return (
    <MetaTable
      dataSource={data}
      columnMetas={columnMetas}
      operateItems={[
        {
          text: 'view',
          type: 'primary',
          size: 'small',
          callback: (record, index) => console.log(recode, index),
        },
        {
          text: 'edit',
          type: 'dashed',
          size: 'small',
          callback: (record, index) => console.log(recode, index),
        },
        {
          text: 'remove',
          type: 'text',
          size: 'small',
          danger: true,
          callback: (record, index) => console.log(recode, index),
        },
      ]}
    />
  );
};
```

### 自定义字段组件

```tsx
import React, { useMemo } from 'react';
import { MetaTable } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

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
    name: {
      key: 'name',
      name: '名称',
      type: 'string',
      component: 'name',
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

const data = [
  {
    id: '1234',
    name: '销售',
    billCycle: '2020-01-01',
    amount: 2000,
    user: {
      id: 'xxx',
      name: '熊丽',
    },
  },
  {
    id: '1235',
    name: '销售',
    billCycle: '2020-02-01',
    amount: 1300,
    user: {
      id: 'xxx2',
      name: '熊丽2',
    },
  },
  {
    id: '1236',
    name: '实收',
    billCycle: '2020-03-03',
    amount: 1500,
  },
];

const nameComponent: React.FC<{ text: string; record: any }> = ({
  text,
  record,
}) => {
  return (
    <div
      style={{
        background: 'lightblue',
        color: 'gray',
        border: '1px solid blue',
      }}
    >
      {text}
    </div>
  );
};

export default () => {
  const columnMetas = useMemo(() => {
    return Object.keys(objectMeta.properties).map(key =>
      Object.assign(objectMeta.properties[key]),
    );
  }, [objectMeta]);

  return (
    <MetaTable
      dataSource={data}
      columnMetas={columnMetas}
      columnComponents={{ name: nameComponent }}
      operateHeader={'操作'}
    />
  );
};
```

### 行展开

```tsx
import React, { useMemo } from 'react';
import { MetaTable } from '@toy-box/toybox-lib';
import { ArrowDownSLine, ArrowRightSLine } from '@airclass/icons';
import 'antd/dist/antd.css';

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

const data = [
  {
    id: '1234',
    name: '销售',
    billCycle: '2020-01-01',
    amount: 2000,
    user: {
      id: 'xxx',
      name: '熊丽',
    },
  },
  {
    id: '1235',
    name: '销售',
    billCycle: '2020-02-01',
    amount: 1300,
    user: {
      id: 'xxx2',
      name: '熊丽2',
    },
  },
  {
    id: '1236',
    name: '实收',
    billCycle: '2020-03-03',
    amount: 1500,
  },
];

export default () => {
  const columnMetas = useMemo(() => {
    return Object.keys(objectMeta.properties).map(key =>
      Object.assign(objectMeta.properties[key]),
    );
  }, [objectMeta]);

  const expandable = {
    expandedRowRender: record => <p style={{ margin: 0 }}>{record.name}</p>,
  };

  return (
    <MetaTable
      dataSource={data}
      columnMetas={columnMetas}
      expandable={expandable}
    />
  );
};
```

### 交叉表

```tsx
import React, { useMemo } from 'react';
import { MetaTable, usePivot } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

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
    name: {
      key: 'name',
      name: '名称',
      type: 'string',
      isDimension: true,
    },
    billCycle: {
      key: 'billCycle',
      name: '账期',
      type: 'date',
      isDimension: true,
    },
    amount: {
      key: 'amount',
      name: '金额',
      type: 'number',
    },
  },
  titleKey: 'name',
};

const data = [
  {
    id: '1234-1',
    name: '销售',
    billCycle: '2020-01-01',
    amount: 1000,
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
    id: '1234',
    name: '销售',
    billCycle: '2020-01-01',
    amount: 2000,
  },
  {
    id: '1236-1',
    name: '实收',
    billCycle: '2020-04-03',
    amount: 1500,
  },
  {
    id: '1235-1',
    name: '销售',
    billCycle: '2020-02-01',
    amount: 1500,
  },
];

const dimensions = ['name', 'billCycle'];

export default () => {
  const columnMetas = useMemo(() => {
    return Object.keys(objectMeta.properties).map(key =>
      Object.assign(objectMeta.properties[key]),
    );
  }, [objectMeta]);

  return (
    <MetaTable
      dataSource={data}
      pivotOption={{ dimensions }}
      columnMetas={columnMetas}
      bordered
    />
  );
};
```

<API></API>
