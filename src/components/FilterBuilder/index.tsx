import React, { FC, useCallback, useState, useEffect } from 'react';
import { Button } from 'antd';
import update from 'immutability-helper';
import {
  FieldMeta,
  ICompareOperation,
  LogicOP,
  FieldService,
} from '../../types/compare';
import { CompareOperation } from './components/CompareOperation';
export interface IFilterBuilderProps {
  filterFieldMetas: FieldMeta[];
  value?: Partial<ICompareOperation>[];
  filterFieldService?: FieldService;
  isBaseBuilder?: boolean;
  onChange: (compares: Partial<ICompareOperation>[]) => Promise<void>;
}

export const FilterBuilder: FC<IFilterBuilderProps> = ({
  value,
  filterFieldMetas,
  filterFieldService,
  isBaseBuilder,
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

  // const filterFieldService = useCallback(filterItem => {
  //   const obj =
  //     filterFieldServices &&
  //     filterFieldServices.find(field => field.key === filterItem.source);
  //   // console.log(obj);
  //   return obj;
  // }, []);

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
          compares={compares}
          isBaseBuilder={isBaseBuilder}
          filterFieldService={filterFieldService}
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

export default FilterBuilder;
