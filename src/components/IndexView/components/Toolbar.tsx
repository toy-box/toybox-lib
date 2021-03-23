import React, { FC, useCallback } from 'react';
import update from 'immutability-helper';
import { Button } from '../../';
import {
  default as FilterSearch,
  IFilterSearchProps,
} from '../../FilterSearch';
import { default as FilterTags } from '../../FilterTags';
import { ICompareOperation } from '../../../types/compare';

export declare interface ToolbarProps {
  filterSearch?: Omit<IFilterSearchProps, 'value'>;
  filterValue?: Partial<ICompareOperation>[];
  onFilterChange?: (value: Partial<ICompareOperation>[]) => void;
}

const Toolbar: FC<ToolbarProps> = ({
  filterSearch,
  filterValue = [],
  onFilterChange,
}) => {
  const removeTag = useCallback(
    index =>
      onFilterChange &&
      onFilterChange(update(filterValue, { $splice: [[index, 1]] })),
    [filterValue, onFilterChange],
  );

  const handleChange = useCallback(
    (value: Partial<ICompareOperation>[]) => {
      onFilterChange && onFilterChange(value);
    },
    [filterSearch],
  );

  return (
    <div className="tbox-index-view-toolbar">
      <div className="tbox-index-view-toolbar-main">
        <div className="tbox-index-view-toolbar-main-left">
          {filterSearch && (
            <FilterSearch
              {...filterSearch}
              value={filterValue}
              onChange={handleChange}
            />
          )}
        </div>
        <div className="tbox-index-view-toolbar-main-right button-group">
          <Button type="primary">新建</Button>
          <Button>其他</Button>
        </div>
      </div>
      <div className="tbox-index-view-toolbar-footer">
        {filterSearch && (
          <FilterTags
            filterFieldTags={filterSearch.filterFieldMetas}
            value={filterValue}
            remove={idx => removeTag(idx)}
          />
        )}
      </div>
    </div>
  );
};

export default Toolbar;
