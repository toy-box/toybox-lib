import React, {
  FC,
  useCallback,
  useState,
  useEffect,
  useContext,
  useMemo,
} from 'react';
import { Button } from 'antd';
import update from 'immutability-helper';
import { ICompareOperation, LogicOP, FieldService } from '../../types/compare';
import { FieldMeta } from '../../types/interface';
import localeMap from './locale';
import LocaleContext from 'antd/lib/locale-provider/context';
import { CompareOperation } from './components/CompareOperation';
export interface IFilterBuilderProps {
  filterFieldMetas: FieldMeta[];
  value?: Partial<ICompareOperation>[];
  filterFieldService?: FieldService;
  onChange: (compares: Partial<ICompareOperation>[]) => Promise<void>;
}

export const FilterBuilder: FC<IFilterBuilderProps> = ({
  value,
  filterFieldMetas,
  filterFieldService,
  onChange,
}) => {
  const [compares, setCompares] = useState<Partial<ICompareOperation>[]>(
    value || [],
  );

  const antLocale = useContext(LocaleContext);
  const locale = useMemo(
    () => (antLocale && antLocale.locale ? antLocale.locale : 'zh_CN'),
    [antLocale],
  );
  const localeData = useMemo(() => localeMap[locale || 'zh_CN'], [locale]);

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

  useEffect(() => {
    onChange(compares);
  }, [compares]);

  return (
    <div>
      {compares.map((filterItem, idx) => (
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
      <Button type="dashed" style={{ width: '200px' }} onClick={addFilter}>
        <i className="ri-add-circle-line" />
        {localeData.lang.operate['add']}
      </Button>
    </div>
  );
};

export default FilterBuilder;
