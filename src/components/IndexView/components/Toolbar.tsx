import React, { useState } from 'react';
import { Select, Form } from 'antd';
import Search from '../../Search';
import { Button, FilterTag } from '../../';
import { FilterData } from '../../FilterTag';

const Toolbar = () => {
  const [filters, setFilters] = useState<FilterData[]>([]);

  return (
    <div className="tbox-index-view-toolbar">
      <div className="tbox-index-view-toolbar-main">
        <div className="tbox-index-view-toolbar-main-left">
          <Form layout="inline">
            <Form.Item>
              <Select placeholder="please select" />
            </Form.Item>
            <Form.Item>
              <Search.IconSearch />
            </Form.Item>
          </Form>
        </div>
        <div className="tbox-index-view-toolbar-main-right button-group">
          <Button type="primary">新建</Button>
          <Button>其他</Button>
        </div>
      </div>
      <div className="tbox-index-view-toolbar-footer">
        {filters.map(filter => (
          <FilterTag filter={filter} />
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
