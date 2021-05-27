import React, { FC, useCallback, useMemo } from 'react';
import update from 'immutability-helper';
import { Button } from '../../';
import {
  default as FilterSearch,
  IFilterSearchProps,
  FilterType,
} from '../../FilterSearch';
import { default as FilterTags } from '../../FilterTags';
import { IFieldMeta, BusinessFieldTypeWild } from '../../../types';

export declare interface ToolbarProps {
  filterSearch?: Omit<IFilterSearchProps, 'value'>;
  filterValue?: FilterType;
  onFilterChange?: (value?: FilterType) => void;
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
    (value?: FilterType) => {
      onFilterChange && onFilterChange(value);
    },
    [filterSearch],
  );

  const isRemoteTag = useCallback((fieldMeta: IFieldMeta) => {
    return (
      fieldMeta.type === BusinessFieldTypeWild.BUSINESS_OBJECT ||
      fieldMeta.type === BusinessFieldTypeWild.OBJECT
    );
  }, []);

  const filterFieldTags = useMemo(() => {
    return (filterSearch?.filterFieldMetas || []).map(fieldMeta => {
      return {
        fieldMeta,
        remote: isRemoteTag(fieldMeta)
          ? async (key: string, value: (string | number)[]) => {
              if (filterSearch?.filterFieldService?.findOfValues) {
                const data = await filterSearch.filterFieldService.findOfValues(
                  key,
                  value,
                );
                return data.map(
                  record =>
                    record.title || record.label?.toString() || record.value,
                );
              }
              return [];
            }
          : undefined,
      };
    });
  }, []);

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
            filterFieldTags={filterFieldTags}
            value={filterValue}
            remove={idx => removeTag(idx)}
          />
        )}
      </div>
    </div>
  );
};

export default Toolbar;
