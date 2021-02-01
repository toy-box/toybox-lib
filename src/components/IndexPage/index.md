
## IndexPage

### 基本用法:

```tsx
import React, { useMemo } from 'react';
import { IndexPage } from '@toy-box/toybox-lib';
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
  }
];

export default () => {
  const loadData = () => {
    const result = {
      list: data,
      total: 3
    };
    const promise = new Promise<{ list: { [key: string]: any }[], total: number }>(function (resolve) {
      setTimeout(function () {
        resolve(result);
      }, 1000);
    });
    return promise;
  }

  return <IndexPage
    objectMeta={objectMeta}
    loadData={loadData}
  />
}
```



### 多选控制:

```tsx
import React, { useMemo, useState } from 'react';
import { IndexPage } from '@toy-box/toybox-lib';
import { Button, Switch } from 'antd';
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
  }
];

export default () => {
  const [selectionToggle, setSelectionToggle] = useState(true);
  const loadData = () => {
    const result = {
      list: data,
      total: 3
    };
    const promise = new Promise<{ list: { [key: string]: any }[], total: number }>(function (resolve) {
      setTimeout(function () {
        resolve(result);
      }, 1000);
    });
    return promise;
  }

  return <div>
    <IndexPage
      selectionToggle={selectionToggle}
      objectMeta={objectMeta}
      loadData={loadData}
    />
  </div>;
}
```


### 按钮控制:

```tsx
import React, { useMemo } from 'react';
import { IndexPage } from '@toy-box/toybox-lib';
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
  }
];

export default () => {
  const loadData = () => {
    const result = {
      list: data,
      total: 3
    };
    const promise = new Promise<{ list: { [key: string]: any }[], total: number }>(function (resolve) {
      setTimeout(function () {
        resolve(result);
      }, 1000);
    });
    return promise;
  }

  const panelItems = [
    {
      type: 'button',
      props: {
        items: [
          {
            text: 'Create',
            type: 'primary'
          }
        ]
      }
    },
    {
      type: 'dropdownMenu',
      props: {
        items: [
          {
            text: 'import',
          },
          {
            text: 'bulkDelete',
            danger: true,
          }
        ]
      }
    }
  ];

  return <IndexPage
    objectMeta={objectMeta}
    loadData={loadData}
    panelItems={panelItems}
  />
}
```
