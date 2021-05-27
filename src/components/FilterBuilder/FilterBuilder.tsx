import React, { FC, useCallback, useContext, useMemo } from 'react';
import update from 'immutability-helper';
import { ICompareOperation, FieldService } from '../../types';
import { FieldMeta } from '../../types/interface';
import localeMap from './locale';
import LocaleContext from 'antd/lib/locale-provider/context';
import { CompareOperation } from './components/CompareOperation';
import Button from '../Button';

import './styles/index.less';
import { AddCircleLine } from '@airclass/icons';

export type IUncheckCompares = Partial<ICompareOperation>[];

export interface IFilterBuilderProps {
  filterFieldMetas: FieldMeta[];
  value?: IUncheckCompares;
  filterFieldService?: FieldService;
  onChange: (compares: IUncheckCompares) => void;
  addText?: string;
}

export const FilterBuilder = ({
  value = [],
  filterFieldMetas,
  filterFieldService,
  onChange,
  addText,
}: IFilterBuilderProps) => {
  const antLocale = useContext(LocaleContext);
  const locale = useMemo(
    () => (antLocale && antLocale.locale ? antLocale.locale : 'zh_CN'),
    [antLocale],
  );
  const localeData = useMemo(() => localeMap[locale || 'zh_CN'], [locale]);

  const handleFilterItem = useCallback(
    (filterItem: Partial<ICompareOperation>, index: number) => {
      console.log('new compare', filterItem);
      onChange && onChange(update(value, { [index]: { $set: filterItem } }));
    },
    [onChange, value],
  );

  const addFilter = useCallback(() => {
    onChange && onChange(update(value, { $push: [{}] }));
  }, [onChange, value]);

  const handleRemove = useCallback(
    idx => {
      onChange && onChange(update(value, { $splice: [[idx, 1]] }));
    },
    [onChange, value],
  );

  return (
    <div>
      {value.map((filterItem, idx) => (
        <CompareOperation
          key={idx}
          filterFieldMetas={filterFieldMetas}
          compare={filterItem}
          localeData={localeData}
          filterFieldService={filterFieldService}
          remove={() => handleRemove(idx)}
          onChange={(filterItem: Partial<ICompareOperation>) =>
            handleFilterItem(filterItem, idx)
          }
        />
      ))}
      <Button onClick={addFilter} type="dashed" icon={<AddCircleLine />}>
        {addText || localeData.lang.operate['add']}
      </Button>
    </div>
  );
};

export default FilterBuilder;
