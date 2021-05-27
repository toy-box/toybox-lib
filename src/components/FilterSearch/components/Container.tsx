import React, {
  FC,
  useCallback,
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import { Button } from 'antd';
import LocaleContext from 'antd/lib/locale-provider/context';
import styled from 'styled-components';
import { ICompareOperation, FieldService } from '../../../types';
import localeMap from '../locale';
import { FilterBuilder } from '../../FilterBuilder';
import { FieldMeta } from '../../../types/interface';
import { FilterType } from '..';

export interface IFilterContainerProps {
  filterFieldMetas: FieldMeta[];
  value?: FilterType;
  title: string;
  filterFieldService?: FieldService;
  onChange: (compares: FilterType) => void;
  onCancel?: () => void;
}

const FilterSetupWrapper = styled.div`
  width: 560px;
  padding: 12px 0;
  h3 {
    padding: 0 16px;
  }
`;

const FilterSetupItemsWrapper = styled.div`
  height: 380px;
  overflow: auto;
  padding: 0 16px;
`;

const ButtonPanelWrapper = styled.div`
  text-align: right;
  padding: 0 16px;
  button {
    + button {
      margin-left: 8px;
    }
  }
`;

export const Container: FC<IFilterContainerProps> = ({
  value = [],
  filterFieldMetas,
  onChange,
  onCancel,
  title,
  filterFieldService,
}) => {
  const [compares, setCompares] = useState<Partial<ICompareOperation>[]>(value);
  // const [initCompares, setInitCompares] = useState<
  //   Partial<ICompareOperation>[]
  // >(value || []);

  const antLocale = useContext(LocaleContext);
  const locale = useMemo(
    () => (antLocale && antLocale.locale ? antLocale.locale : 'zh_CN'),
    [antLocale],
  );
  const localeData = useMemo(() => localeMap[locale || 'zh_CN'], [locale]);

  // const handleFilter = useCallback(
  //   (filterItem: Partial<ICompareOperation>[]) => {
  //     setInitCompares(filterItem);
  //   },
  //   [initCompares],
  // );

  const handleSave = useCallback(
    () =>
      onChange &&
      onChange(
        compares.filter(
          item => item.source != null && item.op != null,
        ) as FilterType,
      ),
    [compares, onChange],
  );

  useEffect(() => {
    if (compares !== value) setCompares(value || []);
  }, [value]);

  return (
    <FilterSetupWrapper>
      <h3>{title}</h3>
      <FilterSetupItemsWrapper>
        <FilterBuilder
          filterFieldMetas={filterFieldMetas}
          value={compares}
          filterFieldService={filterFieldService}
          onChange={setCompares}
        />
      </FilterSetupItemsWrapper>
      <ButtonPanelWrapper>
        <Button size="small" type="primary" onClick={handleSave}>
          {localeData.lang.filter['savebtn']}
        </Button>
        <Button size="small" onClick={onCancel}>
          {localeData.lang.filter['cancelBtn']}
        </Button>
      </ButtonPanelWrapper>
    </FilterSetupWrapper>
  );
};

export default Container;
