
## MetaTable

### 基本用法:

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
    open: {
      key: 'open',
      name: '开放状态',
      type: 'boolean'
    },
    name: {
      key: 'name',
      name: '名称',
      type: 'string'
    },
    billCycle: {
      key: 'billCycle',
      name: '账期',
      type: 'date'
    },
    amount: {
      key: 'amount',
      name: '金额',
      type: 'number'
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
          type: 'string'
        },
        name: {
          key: 'name',
          name: '用户名',
          type: 'string'
        }
      }
    },
  },
  titleKey: 'name',
}


const data = [
  {
    id: '1234',
    name: '销售',
    billCycle: '2020-01-01',
    amount: 2000,
    user: {
      id: 'xxx',
      name: '熊丽'
    }
  },
  {
    id: '1235',
    name: '销售',
    billCycle: '2020-02-01',
    amount: 1300,
    user: {
      id: 'xxx2',
      name: '熊丽2'
    }
  },
  {
    id: '1236',
    name: '实收',
    billCycle: '2020-03-03',
    amount: 1500
  },
  {
    id: '1237',
    name: '销售',
    billCycle: '2020/04/04',
    amount: 1800
  },
  {
    id: '1238',
    name: '实收',
    billCycle: '2020/05/10',
    amount: 2311
  },
  {
    id: '1239',
    name: '销售',
    billCycle: '2020/06/11',
    amount: 1608
  },
  {
    id: '1240',
    name: '实收',
    billCycle: '2020/07/12',
    amount: 2305
  },
  {
    id: '1241',
    name: '销售',
    billCycle: '2020/08/18',
    amount: 1660
  },
  {
    id: '1242',
    name: '实收',
    billCycle: '2020/08/1',
    amount: 2310
  },
  {
    id: '1243',
    name: '应收',
    billCycle: '2020/09/12',
    amount: 3310
  }
];

export default () => {
  const columnMetas = useMemo(() => {
    return Object.keys(objectMeta.properties)
      .map(key => Object.assign(
        objectMeta.properties[key],
      ));
  }, [objectMeta]);

  return <MetaTable
    dataSource={data}
    columnMetas={columnMetas}
  />
}
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
    open: {
      key: 'open',
      name: '开放状态',
      type: 'boolean'
    },
    name: {
      key: 'name',
      name: '名称',
      type: 'string'
    },
    billCycle: {
      key: 'billCycle',
      name: '账期',
      type: 'date'
    },
    amount: {
      key: 'amount',
      name: '金额',
      type: 'number'
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
          type: 'string'
        },
        name: {
          key: 'name',
          name: '用户名',
          type: 'string'
        }
      }
    },
  },
  titleKey: 'name',
}


const data = [
  {
    id: '1234',
    name: '销售',
    billCycle: '2020-01-01',
    amount: 2000,
    user: {
      id: 'xxx',
      name: '熊丽'
    }
  },
  {
    id: '1235',
    name: '销售',
    billCycle: '2020-02-01',
    amount: 1300,
    user: {
      id: 'xxx2',
      name: '熊丽2'
    }
  },
  {
    id: '1236',
    name: '实收',
    billCycle: '2020-03-03',
    amount: 1500
  },
  {
    id: '1237',
    name: '销售',
    billCycle: '2020/04/04',
    amount: 1800
  },
  {
    id: '1238',
    name: '实收',
    billCycle: '2020/05/10',
    amount: 2311
  },
  {
    id: '1239',
    name: '销售',
    billCycle: '2020/06/11',
    amount: 1608
  },
  {
    id: '1240',
    name: '实收',
    billCycle: '2020/07/12',
    amount: 2305
  },
  {
    id: '1241',
    name: '销售',
    billCycle: '2020/08/18',
    amount: 1660
  },
  {
    id: '1242',
    name: '实收',
    billCycle: '2020/08/1',
    amount: 2310
  },
  {
    id: '1243',
    name: '应收',
    billCycle: '2020/09/12',
    amount: 3310
  }
];

export default () => {
  const columnMetas = useMemo(() => {
    return Object.keys(objectMeta.properties)
      .map(key => Object.assign(
        objectMeta.properties[key],
      ));
  }, [objectMeta]);

  return <MetaTable
    dataSource={data}
    columnMetas={columnMetas}
    operateItems={[
      { text: 'view', type: 'primary', size: 'small', callback: (record, index) => console.log(recode, index) },
      { text: 'edit', type: 'dashed', size: 'small', callback: (record, index) => console.log(recode, index) },
      { text: 'remove', type: 'text', size: 'small', danger: true, callback: (record, index) => console.log(recode, index) }
    ]}
  />
}
```
