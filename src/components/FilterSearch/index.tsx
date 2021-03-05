import React, { FC, useCallback, useState, useEffect } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import update from 'immutability-helper';
import {
  FieldMeta,
  ICompareOperation,
  ILogicFilter,
  LogicOP,
  FieldService,
} from '../../types/compare';
import { CompareOperation } from './components/CompareOperation';

export interface IFilterSearchProps {
  filterFieldMetas: FieldMeta[];
  value?: Partial<ICompareOperation>[];
  filterFieldServices?: FieldService[];
  onChange: (compares: Partial<ICompareOperation>[]) => Promise<void>;
}

const defaultValue = { logic: LogicOP.AND, compares: [{}] };

export const FilterSearch: FC<IFilterSearchProps> = ({
  value,
  filterFieldMetas,
  filterFieldServices,
  onChange,
}) => {
  const [compares, setCompares] = useState<Partial<ICompareOperation>[]>(
    value || [],
  );

  const handleFilterItem = useCallback(
    (filterItem: Partial<ICompareOperation>, index: number) => {
      console.log('new compare', filterItem);
      setCompares(update(compares, { [index]: { $set: filterItem } }));
    },
    [compares],
  );

  const addFilter = useCallback(() => {
    setCompares(update(compares, { $push: [{}] }));
  }, [compares]);

  const handleRemove = useCallback(
    idx => {
      setCompares(update(compares, { $splice: [[idx, 1]] }));
    },
    [compares],
  );

  const filterFieldService = useCallback(filterItem => {
    const obj =
      filterFieldServices &&
      filterFieldServices.find(field => field.key === filterItem.source);
    // console.log(obj);
    return obj;
  }, []);

  useEffect(() => {
    onChange(compares);
  }, [compares]);

  useEffect(() => {
    if (compares !== value) setCompares(value || []);
  }, [value]);

  return (
    <div>
      {compares.map((filterItem, idx) => (
        <CompareOperation
          key={idx}
          filterFieldMetas={filterFieldMetas}
          compare={filterItem}
          filterFieldService={filterFieldService(filterItem)}
          remove={() => handleRemove(idx)}
          onChange={(filterItem: Partial<ICompareOperation>) =>
            handleFilterItem(filterItem, idx)
          }
        />
      ))}
      <Button type="dashed" style={{ width: '200px' }} onClick={addFilter}>
        <i className="ri-add-circle-line" />
        添加
      </Button>
    </div>
  );
};

export default FilterSearch;
