## FilterSearch

基础用法:

```tsx
import React, { useCallback, useState, useMemo } from 'react';
import { FilterSearch, FilterTags } from '@toy-box/toybox-lib';
import update from 'immutability-helper';
import 'antd/dist/antd.css';

export default () => {
  const serviceTest = async function(resolve, key) {
    setTimeout(() => {
      resolve(key);
    }, 100);
  };

  function findOptions(key, name) {
    return new Promise(resolve => {
      serviceTest(resolve, key);
    }).then(res => {
      console.log(res, 'findOptions');
      return [
        {
          label: '2IX',
          value: '123',
        },
        {
          label: 'named',
          value: '456',
        },
      ];
    });
  }

  function findOfValues(key, value) {
    return new Promise(resolve => {
      serviceTest(resolve, key);
    }).then(res => {
      if (key === 'deptId') return [{ value: '1', label: 'Expand to load' }];
      return [
        {
          label: 'SIX',
          value: '123',
        },
        {
          label: 'named',
          value: '456',
        },
      ];
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

  const onChange = useCallback((compares, key) => {
    setTagValue(compares);
  }, []);

  const filter = {
    filterFieldMetas: [
      {
        description: null,
        exclusiveMaximum: null,
        exclusiveMinimum: null,
        format: null,
        key: 'deptId',
        maxLength: null,
        maximum: null,
        minLength: null,
        minimum: null,
        name: '部门',
        options: null,
        parentKey: 'parent_id',
        pattern: null,
        primary: null,
        properties: null,
        refObjectId: '5f9630d977b9ec42e4d0dca5',
        required: null,
        titleKey: 'name',
        type: 'objectId',
        unique: null,
        unBasic: true,
      },
      {
        description: null,
        exclusiveMaximum: null,
        exclusiveMinimum: null,
        format: null,
        key: 'copId',
        maxLength: null,
        maximum: null,
        minLength: null,
        minimum: null,
        name: '公司',
        options: [
          {
            label: '12323232',
            value: '1',
          },
          {
            label: 'bbbbbbb',
            value: '2',
          },
        ],
        pattern: null,
        primary: null,
        properties: null,
        refObjectId: '5f9630d977b9ec42e4d0dca5',
        required: null,
        titleKey: 'name',
        type: 'singleOption',
        unique: null,
        unBasic: true,
      },
      {
        description: null,
        exclusiveMaximum: null,
        exclusiveMinimum: null,
        format: null,
        name: '日期时间',
        key: 'datetime',
        maxLength: null,
        maximum: null,
        minLength: null,
        minimum: null,
        options: null,
        pattern: null,
        primary: null,
        properties: null,
        required: null,
        type: 'datetime',
        unique: null,
      },
      {
        description: null,
        exclusiveMaximum: null,
        exclusiveMinimum: null,
        format: null,
        name: '姓名，拼音，手机号',
        key: 'value',
        maxLength: null,
        maximum: null,
        minLength: null,
        minimum: null,
        options: null,
        pattern: null,
        primary: null,
        properties: null,
        required: null,
        titleKey: 'name',
        type: 'string',
        unique: null,
        unBasic: true,
        layout: 'right',
      },
    ],
    filterFieldService: {
      findOptions: (key, name) => findOptions(key, name),
      findOfValues: (key, value) => findOfValues(key, value),
      findDataTrees: (key, parentId) => findDataTrees(key, parentId),
    },
    simpleFilterKeys: ['deptId', 'copId', 'datetime', 'value'],
  };
  const filterFieldTags = filter.filterFieldMetas.map(meta => {
    if (meta.type === 'objectId' || meta.type === 'singleOption') {
      return {
        fieldMeta: meta,
        remote: remoteOfTags.bind(this),
      };
    }
    return { fieldMeta: meta };
  });
  const value = [
    {
      source: 'deptId',
      op: '$in',
      target: '1',
    },
  ];
  const [tagValue, setTagValue] = useState(value);
  function remoteOfTags(key, value) {
    return new Promise(resolve => {
      serviceTest(resolve);
    }).then(res => {
      const meta = filter.filterFieldMetas.find(filed => filed.key === key);
      if (meta && meta.options) {
        const list = meta.options.map(op => {
          const p = value.find(val => val === op.value);
          if (p) return op.label;
        });
        return list.filter(item => item);
      } else if (key === 'deptId') {
        return ['Expand to load'];
      }
    });
  }

  const removeTag = useCallback(
    index => {
      setTagValue(update(tagValue, { $splice: [[index, 1]] }));
    },
    [tagValue],
  );
  return (
    <div>
      <FilterSearch
        {...filter}
        value={tagValue}
        onChange={compares => onChange(compares)}
      />
      <div style={{ marginTop: '10px' }}>
        <FilterTags
          filterFieldTags={filterFieldTags}
          value={tagValue}
          remove={idx => removeTag(idx)}
        />
      </div>
    </div>
  );
};
```
