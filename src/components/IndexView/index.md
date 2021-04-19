## IndexView 索引列表视图

#### 基本用法

```tsx
import React, { useCallback, useMemo } from 'react';
import { IndexView } from '@toy-box/toybox-lib';
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

const userList = [
  {
    id: 'user1',
    name: '熊丽',
  },
  {
    id: 'user2',
    name: '小米',
  },
  {
    id: 'user3',
    name: '大佬',
  },
  {
    id: 'user4',
    name: '国旅',
  },
  {
    id: 'user5',
    name: '刘敏',
  },
];

const data = [
  {
    id: '1234',
    name: '销售',
    billCycle: '2020-01-01',
    amount: 2000,
    user: {
      id: 'user3',
      name: '大佬',
    },
  },
  {
    id: '1235',
    name: '销售',
    billCycle: '2020-02-01',
    amount: 1300,
    user: {
      id: 'user1',
      name: '熊丽',
    },
  },
  {
    id: '1236',
    name: '实收',
    billCycle: '2020-03-03',
    amount: 1500,
  },
];

const visibleColumns = [
  {
    key: 'name',
    visiable: true,
  },
  {
    key: 'billCycle',
    visiable: true,
  },
  {
    key: 'amount',
    visiable: true,
  },
  {
    key: 'user',
    visiable: true,
  },
];

async function serviceTest(resolve, key) {
  setTimeout(() => {
    resolve(key);
  }, 100);
}

function findOptions(key, name) {
  return new Promise(resolve => {
    serviceTest(resolve, key);
  }).then(res => {
    if (key === 'user') {
      return userList.map(user => ({ label: user.name, value: user.id }));
    }
    return [];
  });
}

function findOfValues(key, value) {
  return new Promise(resolve => {
    serviceTest(resolve, key);
  }).then(res => {
    if (key === 'user') {
      return userList
        .filter(user => value.some(v => v === user.id))
        .map(user => ({ label: user.name, value: user.id }));
    }
  });
}

const genTreeNode = useCallback((parentId, isLeaf = false) => {
  const random = Math.random()
    .toString(36)
    .substring(2, 6);
  return {
    id: random,
    pId: parentId,
    value: random,
    title: isLeaf ? 'Tree Node' : 'Expand to load',
    isLeaf,
  };
}, []);

function findDataTrees(key, parentId) {
  return new Promise(resolve => {
    serviceTest(resolve, key);
  }).then(res => {
    if (parentId === '2') return [];
    if (parentId)
      return [
        {
          id: '2',
          pId: '1',
          value: '2',
          title: 'Expand to load11111',
        },
      ];
    return [{ id: '1', pId: 0, value: '1', title: 'Expand to load' }];
  });
}

const filterFieldService = {
  findOptions: (key, name) => findOptions(key, name),
  findOfValues: (key, value) => findOfValues(key, value),
  findDataTrees: (key, parentId) => findDataTrees(key, parentId),
};

export default () => {
  const loadData = (...args: any) => {
    const result = {
      list: data,
      total: 3,
    };
    const promise = new Promise<{
      list: Record<string, any>[];
      total: number;
    }>(function(resolve) {
      setTimeout(function() {
        resolve(result);
      }, 1000);
    });
    return promise;
  };

  const filterSearch = {
    filterKeys: ['billCycle', 'user'],
    simpleFilterKeys: ['billCycle', 'user'],
    filterFieldService,
  };

  return (
    <IndexView
      visibleColumns={visibleColumns}
      objectMeta={objectMeta}
      loadData={loadData}
      filterSearch={filterSearch}
      visibleColumnSet
      urlQuery
    />
  );
};
```
