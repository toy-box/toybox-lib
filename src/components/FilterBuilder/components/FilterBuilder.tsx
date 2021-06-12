import React, { FC, useCallback, useContext, useMemo } from 'react';
import update from 'immutability-helper';
import { AddCircleLine } from '@airclass/icons';
import LocaleContext from 'antd/lib/locale-provider/context';
import { ICompareOperation, FieldService } from '../../../types';
import { FieldMeta } from '../../../types/interface';
import localeMap from '../locale';
import { CompareOperation } from './CompareOperation';
import Button from '../../Button';

import '../styles/index.less';
import { FilterBuilderContext } from '../context';

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

  const addFilter = () => {
    onChange && onChange(update(value, { $push: [{}] }));
  };

  return (
    <FilterBuilderContext.Provider value={{ value, onChange }}>
      <div>
        {value.map((filterItem, idx) => (
          <CompareOperation
            key={idx}
            index={idx}
            filterFieldMetas={filterFieldMetas}
            compare={filterItem}
            localeData={localeData}
            filterFieldService={filterFieldService}
          />
        ))}
        <Button onClick={addFilter} type="dashed" icon={<AddCircleLine />}>
          {addText || localeData.lang.operate['add']}
        </Button>
      </div>
    </FilterBuilderContext.Provider>
  );
};

export default FilterBuilder;
