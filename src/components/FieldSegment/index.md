## FieldSegment 字段内容区块

### 基本用法

```tsx
import React from 'react';
import { Form, Space } from 'antd';
import { FieldSegment, FieldRow, Fields } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

export default () => {
  return (
    <FieldSegment title="区块A">
      <FieldRow key="1">
        <Space>
          <Form.Item label="文本字段">
            <Fields.FieldString mode="edit" field={{ fieldName: '文本字段' }} />
          </Form.Item>
          <Form.Item label="数字字段">
            <Fields.FieldNumber mode="edit" field={{ fieldName: '数字字段' }} />
          </Form.Item>
        </Space>
      </FieldRow>
      <FieldRow key="2">
        <div>aaa</div>
        <div>bbb</div>
        <div>ccc</div>
      </FieldRow>
    </FieldSegment>
  );
};
```

### 开启展开收缩

```tsx
import React from 'react';
import { Form, Space } from 'antd';
import { FieldSegment, FieldRow, Fields } from '@toy-box/toybox-lib';
import 'antd/dist/antd.css';

export default () => {
  return (
    <>
      <FieldSegment title="区块A" key="a" collapsible>
        <FieldRow key="1">
          <Space>
            <Form.Item label="文本字段">
              <Fields.FieldString
                mode="edit"
                field={{ fieldName: '文本字段' }}
              />
            </Form.Item>
            <Form.Item label="数字字段">
              <Fields.FieldNumber
                mode="edit"
                field={{ fieldName: '数字字段' }}
              />
            </Form.Item>
          </Space>
        </FieldRow>
        <FieldRow key="2">
          <div>aaa</div>
          <div>bbb</div>
          <div>ccc</div>
        </FieldRow>
      </FieldSegment>
      <FieldSegment title="区块B" key="b" collapsible>
        <FieldRow key="1">
          <Space>
            <Form.Item label="文本字段">
              <Fields.FieldString
                mode="edit"
                field={{ fieldName: '文本字段' }}
              />
            </Form.Item>
            <Form.Item label="数字字段">
              <Fields.FieldNumber
                mode="edit"
                field={{ fieldName: '数字字段' }}
              />
            </Form.Item>
          </Space>
        </FieldRow>
        <FieldRow key="2">
          <div>xxx</div>
          <div>yyy</div>
          <div>zzz</div>
        </FieldRow>
      </FieldSegment>
    </>
  );
};
```
