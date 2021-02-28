## TreeSelect 树选择器

### 基本用法

```tsx
import React, { useCallback, useState } from 'react';
import { Fields } from '@toy-box/toybox-lib';

export default () => {
  const [value, setValue] = useState();
  const [treeData, setTreeData] = useState([
    { id: '1', pId: 0, value: '1', title: 'Expand to load' },
    {
      id: 'h4xv',
      pId: '1',
      value: 'h4xv',
      title: 'Expand to load',
      isLeaf: false,
    },
  ]);

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

  const onLoadData = useCallback(
    id => {
      console.log('treeNode', id);
      return new Promise(resolve => {
        if (id == null) {
          return;
        }
        setTimeout(() => {
          resolve([genTreeNode(id, false), genTreeNode(id, true)]);
        }, 300);
      });
    },
    [treeData, setTreeData, genTreeNode],
  );

  const field = {
    key: 'tree',
    name: 'Tree',
    type: 'treeSelect',
  };

  return (
    <Fields.FieldTreeSelect
      field={field}
      mode="edit"
      style={{ width: '100%' }}
      placeholder="Please select"
      loadData={onLoadData}
      treeData={treeData}
      multiple={true}
      onChange={setValue}
      value={value}
    />
  );
};
```

```tsx
import React, { useCallback, useState } from 'react';
import { Fields } from '@toy-box/toybox-lib';

export default () => {
  const [value, setValue] = useState(['1']);
  const [treeData, setTreeData] = useState([
    { id: '1', pId: 0, value: '1', title: 'Expand to load' },
    {
      id: 'h4xv',
      pId: '1',
      value: 'h4xv',
      title: 'Expand to load',
      isLeaf: false,
    },
  ]);

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

  const onLoadData = useCallback(
    id => {
      return new Promise(resolve => {
        if (id == null) {
          return;
        }
        setTimeout(() => {
          resolve([genTreeNode(id, false), genTreeNode(id, true)]);
        }, 300);
      });
    },
    [treeData, setTreeData, genTreeNode],
  );

  const onLoadByValue = useCallback(ids => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([{ id: '1', pId: 0, value: '1', title: 'Expand to load' }]);
      }, 300);
    });
  }, []);

  const field = {
    key: 'tree',
    name: 'Tree',
    type: 'treeSelect',
  };

  return (
    <Fields.FieldTreeSelect
      field={field}
      mode="read"
      style={{ width: '100%' }}
      placeholder="Please select"
      loadData={onLoadData}
      loadByValue={onLoadByValue}
      treeData={treeData}
      multiple={true}
      onChange={setValue}
      value={value}
    />
  );
};
```
