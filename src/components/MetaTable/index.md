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

  return (
    <MetaTable resizableTitle dataSource={data} columnMetas={columnMetas} />
  );
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
import React, { useMemo, useState } from 'react';
import { MetaTable, usePivot } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

const objectMeta = {
  key: null,
  name: null,
  description: null,
  properties: {
    date: {
      key: 'date',
      name: '年月',
      primary: null,
      description: null,
      type: 'string',
      options: null,
      refObjectId: null,
      unique: null,
      required: null,
      maximum: null,
      minimum: null,
      exclusiveMaximum: null,
      exclusiveMinimum: null,
      maxLength: null,
      minLength: null,
      pattern: null,
      format: null,
      titleKey: null,
      parentKey: null,
      properties: null,
    },
    deptId: {
      key: 'deptId',
      name: '部门',
      primary: null,
      description: null,
      type: 'document',
      options: null,
      refObjectId: '5f9630d977b9ec42e4d0dca5',
      unique: null,
      required: null,
      maximum: null,
      minimum: null,
      exclusiveMaximum: null,
      exclusiveMinimum: null,
      maxLength: null,
      minLength: null,
      pattern: null,
      format: null,
      titleKey: 'name',
      parentKey: null,
      properties: {
        parent_id: {
          key: 'parent_id',
          name: '父ID',
          primary: null,
          description: null,
          type: 'string',
          options: null,
          refObjectId: null,
          unique: null,
          required: null,
          maximum: null,
          minimum: null,
          exclusiveMaximum: null,
          exclusiveMinimum: null,
          maxLength: null,
          minLength: null,
          pattern: null,
          format: null,
          titleKey: null,
          parentKey: null,
          properties: null,
        },
        name: {
          key: 'name',
          name: '名称',
          primary: null,
          description: null,
          type: 'string',
          options: null,
          refObjectId: null,
          unique: null,
          required: true,
          maximum: null,
          minimum: null,
          exclusiveMaximum: null,
          exclusiveMinimum: null,
          maxLength: null,
          minLength: null,
          pattern: null,
          format: null,
          titleKey: null,
          parentKey: null,
          properties: null,
        },
        id: {
          key: 'id',
          name: 'ID',
          primary: true,
          description: null,
          type: 'string',
          options: null,
          refObjectId: null,
          unique: null,
          required: null,
          maximum: null,
          minimum: null,
          exclusiveMaximum: null,
          exclusiveMinimum: null,
          maxLength: null,
          minLength: null,
          pattern: null,
          format: null,
          titleKey: null,
          parentKey: null,
          properties: null,
        },
      },
    },
    entryCount: {
      key: 'entryCount',
      name: '入职人数',
      primary: null,
      description: null,
      type: 'integer',
      options: null,
      refObjectId: null,
      unique: null,
      required: null,
      maximum: null,
      minimum: null,
      exclusiveMaximum: null,
      exclusiveMinimum: null,
      maxLength: null,
      minLength: null,
      pattern: null,
      format: null,
      titleKey: null,
      parentKey: null,
      properties: null,
    },
  },
  titleKey: null,
  type: 'aggregate',
};

const data = [
  {
    date: '2020',
    entryCount: 1,
    deptId: {
      parent_id: '6273a9c08ffe4c6a9b356c3c360e5394',
      name: '研发一部',
      id: 'd56433cfaea144ecaa63f9884c90e6b6',
    },
  },
  {
    date: '2020',
    entryCount: 3,
    deptId: {
      parent_id: '01344463d3504d43bb4706801db844bf',
      name: '运维一部',
      id: '25dbfc77c3394bf794ccfc0c8766c263',
    },
  },
  {
    date: '2021',
    entryCount: 2,
    deptId: {
      parent_id: '01344463d3504d43bb4706801db844bf',
      name: '运维一部',
      id: '25dbfc77c3394bf794ccfc0c8766c263',
    },
  },
  {
    date: '2020',
    entryCount: 6,
    deptId: {
      parent_id: 'e7219217a856449db60e0a5afda22d5d',
      name: 'Bingo',
      id: '6273a9c08ffe4c6a9b356c3c360e5394',
    },
  },
  {
    date: '2021',
    entryCount: 7,
    deptId: {
      parent_id: 'e7219217a856449db60e0a5afda22d5d',
      name: 'Bingo',
      id: '6273a9c08ffe4c6a9b356c3c360e5394',
    },
  },
  {
    date: '2020',
    entryCount: 1,
    deptId: {
      parent_id: 'b046b03466dc41b6b2abf85f6c23eb53',
      name: '上海研发区',
      id: 'c3771981b59a4ecca54d0b2f81bcedef',
    },
  },
  {
    date: '2020',
    entryCount: 3,
    deptId: {
      parent_id: 'e8db4d8d917241d5b20179b0dcfbdcb4',
      name: 'IT采购部',
      id: 'b1cb9bcd20094da3ad759a05842c0a29',
    },
  },
  {
    date: '2021',
    entryCount: 3,
    deptId: {
      parent_id: 'e8db4d8d917241d5b20179b0dcfbdcb4',
      name: 'IT采购部',
      id: 'b1cb9bcd20094da3ad759a05842c0a29',
    },
  },
  {
    date: '2021',
    entryCount: 11,
    deptId: {
      parent_id: 'e7219217a856449db60e0a5afda22d5d',
      name: '测试',
      id: '87222c17fd5d4f8a8dda8da2deabf79c',
    },
  },
  {
    date: '2020',
    entryCount: 2,
    deptId: {
      parent_id: 'e8db4d8d917241d5b20179b0dcfbdcb4',
      name: 'Newtouch',
      id: 'e7219217a856449db60e0a5afda22d5d',
    },
  },
  {
    date: '2021',
    entryCount: 24,
    deptId: {
      parent_id: 'e8db4d8d917241d5b20179b0dcfbdcb4',
      name: 'Newtouch',
      id: 'e7219217a856449db60e0a5afda22d5d',
    },
  },
  {
    date: '2020',
    entryCount: 9,
    deptId: {
      parent_id: '0',
      name: 'HRM',
      id: 'e8db4d8d917241d5b20179b0dcfbdcb4',
    },
  },
  {
    date: '2021',
    entryCount: 7,
    deptId: {
      parent_id: '0',
      name: 'HRM',
      id: 'e8db4d8d917241d5b20179b0dcfbdcb4',
    },
  },
  {
    date: '2020',
    entryCount: 3,
    deptId: {
      parent_id: '00581f89768f44a3b934696647c8709e',
      name: '运维四部',
      id: 'e9e0d977b14241ff9f6bde1905c41322',
    },
  },
  {
    date: '2021',
    entryCount: 3,
    deptId: {
      parent_id: '00581f89768f44a3b934696647c8709e',
      name: '运维四部',
      id: 'e9e0d977b14241ff9f6bde1905c41322',
    },
  },
  {
    date: '2020',
    entryCount: 7,
    deptId: {
      parent_id: '6273a9c08ffe4c6a9b356c3c360e5394',
      name: '日本项目运维',
      id: 'eb100995ff9d472a912f7bfe4c12f7a2',
    },
  },
  {
    date: '2021',
    entryCount: 10,
    deptId: {
      parent_id: '6273a9c08ffe4c6a9b356c3c360e5394',
      name: '日本项目运维',
      id: 'eb100995ff9d472a912f7bfe4c12f7a2',
    },
  },
  {
    date: '2021',
    entryCount: 4,
    deptId: {
      parent_id: 'e7219217a856449db60e0a5afda22d5d',
      name: 'newtouchNew',
      id: 'c72502b39dce47c4bea390ad81be206e',
    },
  },
  {
    date: '2020',
    entryCount: 1,
    deptId: {
      parent_id: '01344463d3504d43bb4706801db844bf',
      name: '运维三部',
      id: '00581f89768f44a3b934696647c8709e',
    },
  },
  {
    date: '2021',
    entryCount: 1,
    deptId: {
      parent_id: '01344463d3504d43bb4706801db844bf',
      name: '运维三部',
      id: '00581f89768f44a3b934696647c8709e',
    },
  },
  {
    date: '2021',
    entryCount: 1,
    deptId: {
      parent_id: 'e8db4d8d917241d5b20179b0dcfbdcb4',
      name: '测试',
      id: '710bb8f2eb694a6a9fbe0b6709b42864',
    },
  },
  {
    date: '2020',
    entryCount: 3,
    deptId: {
      parent_id: 'b1cb9bcd20094da3ad759a05842c0a29',
      name: '研发二部',
      id: '3db1e78122914d37ab349e8e61f05126',
    },
  },
  {
    date: '2021',
    entryCount: 12,
    deptId: {
      parent_id: 'b1cb9bcd20094da3ad759a05842c0a29',
      name: '研发二部',
      id: '3db1e78122914d37ab349e8e61f05126',
    },
  },
  {
    date: '2020',
    entryCount: 4,
    deptId: {
      parent_id: '7d786fb59af848f1a312b2ae9c9380da',
      name: '研发二部',
      id: 'cd2acd71c2f04eb4a483d21203737c57',
    },
  },
];

const dimensions = ['date', 'deptId'];

export default () => {
  const [pagination, setPagination] = useState({
    size: 'small',
    pageSize: 50,
    showSizeChanger: true,
  });
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
      pagination={pagination}
      onChange={pagination => setPagination}
      bordered
    />
  );
};
```

<API></API>
