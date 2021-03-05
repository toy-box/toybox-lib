## FilterModel

基础用法:

```tsx
import React, { useCallback, useState } from 'react';
import { FilterModel } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

export default () => {
  const serviceTest = async function(resolve, fieldMeta) {
    setTimeout(() => {
      resolve(fieldMeta);
    }, 1000);
  };

  function test(fieldMeta) {
    return new Promise(resolve => {
      serviceTest(resolve, fieldMeta);
    }).then(res => {
      // console.log(res, 1223333);
      return res;
    });
  }

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
    ],
    value: [
      {
        source: 'deptId',
        op: '$in',
        target: '123',
      },
    ],
    filterFieldServices: [
      {
        key: 'deptId',
        customCallback: fieldMeta => test(fieldMeta),
      },
    ],
  };
  return (
    <div>
      <FilterModel {...filter} />
    </div>
  );
};
```
