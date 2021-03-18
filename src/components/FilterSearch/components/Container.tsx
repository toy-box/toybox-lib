import React, {
  FC,
  useCallback,
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import update from 'immutability-helper';
import {
  FieldMeta,
  ICompareOperation,
  FieldService,
  LogicOP,
} from '../../../types/compare';
import localeMap from '../locale';
import LocaleContext from 'antd/lib/locale-provider/context';
import FilterBuilder from '../../FilterBuilder';

export interface IFilterContainerProps {
  filterFieldMetas: FieldMeta[];
  value?: Partial<ICompareOperation>[];
  title: string;
  isBaseBuilder?: boolean;
  filterFieldService?: FieldService;
  onChange: (compares: Partial<ICompareOperation>[]) => Promise<void>;
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
  value,
  filterFieldMetas,
  onChange,
  onCancel,
  title,
  filterFieldService,
  isBaseBuilder,
}) => {
  const [compares, setCompares] = useState<Partial<ICompareOperation>[]>(
    value || [],
  );
  const [initCompares, setInitCompares] = useState<
    Partial<ICompareOperation>[]
  >(value || []);

  const antLocale = useContext(LocaleContext);
  const locale = useMemo(
    () => (antLocale && antLocale.locale ? antLocale.locale : 'zh_CN'),
    [antLocale],
  );
  const localeData = useMemo(() => localeMap[locale || 'zh_CN'], [locale]);

  const handleFilter = useCallback(
    async (filterItem: Partial<ICompareOperation>[]) => {
      setInitCompares(filterItem);
    },
    [initCompares],
  );

  const contentValue = useMemo(() => {
    return {
      isBaseBuilder,
      title,
    };
  }, [isBaseBuilder]);

  useEffect(() => {
    if (compares !== value) setCompares(value || []);
  }, [value]);

  return (
    <FilterSetupWrapper>
      <h3>
        {/* <FormattedMessage id="report.builder.label.filter" />
        <FormattedMessage id="report.builder.label.and" /> */}
        {title}
      </h3>
      <FilterSetupItemsWrapper>
        {/* <BuilderContext.Provider value={contentValue}> */}
        <FilterBuilder
          filterFieldMetas={filterFieldMetas}
          value={compares}
          isBaseBuilder={isBaseBuilder}
          filterFieldService={filterFieldService}
          onChange={(filterItem: Partial<ICompareOperation>[]) =>
            handleFilter(filterItem)
          }
        />
        {/* </BuilderContext.Provider> */}
      </FilterSetupItemsWrapper>
      <ButtonPanelWrapper>
        <Button
          size="small"
          type="primary"
          onClick={() => onChange(initCompares)}
        >
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
