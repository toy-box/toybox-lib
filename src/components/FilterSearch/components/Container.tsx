import React, { FC, useCallback, useState, useEffect } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import update from 'immutability-helper';
import {
  FieldMeta,
  ICompareOperation,
  FieldService,
  LogicOP,
} from '../../../types/compare';
import FilterBuilder from '../../FilterBuilder';

export interface IFilterContainerProps {
  filterFieldMetas: FieldMeta[];
  value?: Partial<ICompareOperation>[];
  title: string;
  filterFieldServices?: FieldService[];
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
  filterFieldServices,
}) => {
  const [compares, setCompares] = useState<Partial<ICompareOperation>[]>(
    value || [],
  );

  const handleFilter = useCallback(
    async (filterItem: Partial<ICompareOperation>[]) => {
      setCompares(filterItem);
    },
    [],
  );

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
        <FilterBuilder
          filterFieldMetas={filterFieldMetas}
          value={compares}
          filterFieldServices={filterFieldServices}
          onChange={(filterItem: Partial<ICompareOperation>[]) =>
            handleFilter(filterItem)
          }
        />
      </FilterSetupItemsWrapper>
      <ButtonPanelWrapper>
        <Button size="small" type="primary" onClick={() => onChange(compares)}>
          保存
        </Button>
        <Button size="small" onClick={onCancel}>
          取消
        </Button>
      </ButtonPanelWrapper>
    </FilterSetupWrapper>
  );
};

export default Container;
