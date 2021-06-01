import React, { FC, useCallback, useMemo } from 'react';
import update from 'immutability-helper';
import { Button } from '../..';
import {
  default as FilterSearch,
  IFilterSearchProps,
  FilterType,
} from '../../FilterSearch/components/FilterSearch';
import { default as FilterTags } from '../../FilterTags';
import { IFieldMeta, BusinessFieldTypeWild } from '../../../types';
import Toolbar from '../../Toolbar';
import { default as ButtonGroup, ButtonItem } from '../../ButtonGroup';

export declare interface IndexViewToolbarProps {
  filterSearch?: Omit<IFilterSearchProps, 'value'>;
  filterValue?: FilterType;
  onFilterChange?: (value?: FilterType) => void;
  buttonItems?: ButtonItem[];
}

const IndexViewToolbar: FC<IndexViewToolbarProps> = ({
  filterSearch,
  filterValue = [],
  onFilterChange,
  buttonItems = [],
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
        <Toolbar
          left={
            filterSearch && (
              <FilterSearch
                {...filterSearch}
                value={filterValue}
                onChange={handleChange}
              />
            )
          }
          right={<ButtonGroup items={buttonItems} />}
        />
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

export default IndexViewToolbar;
