import React, { FC, useCallback, useContext, useMemo } from 'react';
import LocaleContext from 'antd/lib/locale-provider/context';
import update from 'immutability-helper';
import { AddCircleFill } from '@airclass/icons';
import Button from '../../Button';
import FilterBuilder from './FilterBuilder';
import localeMap from '../locale';
import {
  ICompareOperation,
  FieldService,
  IUncheckLogicFilter,
  LogicOP,
} from '../../../types';
import { FieldMeta } from '../../../types/interface';

import '../styles/multi.less';

export interface IMultiFilterBuilderProps {
  segmentlogic?: LogicOP;
  filterFieldMetas: FieldMeta[];
  value?: IUncheckLogicFilter[];
  filterFieldService?: FieldService;
  onChange: (value: IUncheckLogicFilter[]) => void;
  addText?: string;
  addSegmentText?: string;
}

const MultiFilterBuilder: FC<IMultiFilterBuilderProps> = ({
  segmentlogic = LogicOP.AND,
  filterFieldMetas,
  value = [],
  filterFieldService,
  onChange,
  addText,
  addSegmentText,
}) => {
  const antLocale = useContext(LocaleContext);
  const locale = useMemo(
    () => (antLocale && antLocale.locale ? antLocale.locale : 'zh_CN'),
    [antLocale],
  );
  const localeData = useMemo(() => localeMap[locale || 'zh_CN'], [locale]);

  const handleFilterChange = useCallback(
    (compares: Partial<ICompareOperation>[], index: number) => {
      if (compares == null || compares.length === 0) {
        onChange && onChange(update(value, { $splice: [[index, 1]] }));
      } else {
        onChange &&
          onChange(
            update(value, { [index]: { compares: { $set: compares } } }),
          );
      }
    },
    [onChange, value],
  );

  const FilterSegment = ({
    logicFilter,
    index,
  }: {
    logicFilter: IUncheckLogicFilter;
    index: number;
  }) => {
    return (
      <div className="tbox-multi-filter-segment">
        <FilterBuilder
          value={logicFilter.compares}
          filterFieldMetas={filterFieldMetas}
          filterFieldService={filterFieldService}
          onChange={compares => handleFilterChange(compares, index)}
          addText={addText}
        />
      </div>
    );
  };

  const addSegment = useCallback(() => {
    const newSegment: IUncheckLogicFilter = {
      logic: segmentlogic,
      compares: [{ source: undefined, op: undefined, target: undefined }],
    };
    onChange && onChange(update(value, { $push: [newSegment] }));
  }, [onChange, value]);

  return (
    <div className="tbox-multi-filter">
      {value.map((logicFilter, index) => (
        <FilterSegment key={index} logicFilter={logicFilter} index={index} />
      ))}
      <div className="tbox-multi-filter-panel">
        <Button type="dashed" onClick={addSegment} icon={<AddCircleFill />}>
          {addSegmentText || localeData.lang.operate['addSegment']}
        </Button>
      </div>
    </div>
  );
};

export default MultiFilterBuilder;
