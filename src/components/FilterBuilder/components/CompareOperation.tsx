import React, { FC, useCallback, useContext, useMemo } from 'react';
import update from 'immutability-helper';
import { Button, Select, Input, Space } from 'antd';
import { CloseLine } from '@airclass/icons';
import get from 'lodash.get';
import { FilterValueInput } from './FilterValueInput';
import {
  ICompareOperation,
  BusinessFieldType,
  FieldService,
  FieldMeta,
  CompareOP,
  DateCompareOP,
  UniteCompareOP,
} from '../../../types/';
import { FilterBuilderContext } from '../context';

const inputStyle = { width: '320px' };

export interface CompareOperationProps {
  index: number;
  filterFieldMetas: FieldMeta[];
  compare: Partial<ICompareOperation>;
  filterFieldService?: FieldService;
  localeData: any;
}

const numberOps = [
  CompareOP.EQ,
  CompareOP.NE,
  CompareOP.GT,
  CompareOP.LT,
  CompareOP.GTE,
  CompareOP.LTE,
];

const dateOps = [
  DateCompareOP.UNIT_DATE_RANGE,
  DateCompareOP.BETWEEN,
  CompareOP.EQ,
  CompareOP.NE,
  CompareOP.GT,
  CompareOP.LT,
  CompareOP.GTE,
  CompareOP.LTE,
];

const stringOps = [
  CompareOP.EQ,
  CompareOP.NE,
  CompareOP.IN,
  CompareOP.NIN,
  CompareOP.GT,
  CompareOP.LT,
  CompareOP.GTE,
  CompareOP.LTE,
];

const optionOps = [CompareOP.EQ, CompareOP.NE, CompareOP.IN, CompareOP.NIN];

const booleanOps = [CompareOP.EQ, CompareOP.NE];

const FieldOpMap: Record<string, Array<UniteCompareOP>> = {
  [BusinessFieldType.INTEGER]: numberOps,
  [BusinessFieldType.NUMBER]: numberOps,
  [BusinessFieldType.STRING]: stringOps,
  [BusinessFieldType.TEXT]: stringOps,
  [BusinessFieldType.BOOLEAN]: booleanOps,
  [BusinessFieldType.DATE]: dateOps,
  [BusinessFieldType.DATETIME]: dateOps,
  [BusinessFieldType.SINGLE_OPTION]: optionOps,
  [BusinessFieldType.OBJECT_ID]: optionOps,
};

export const CompareOperation: FC<CompareOperationProps> = ({
  index,
  filterFieldMetas,
  compare,
  localeData,
  filterFieldService,
}) => {
  const context = useContext(FilterBuilderContext);
  const fieldOptions = useMemo(() => {
    return filterFieldMetas.map(field => ({
      label: field.name,
      value: field.key,
    }));
  }, [filterFieldMetas]);

  const filterFieldMeta = useMemo(
    () => filterFieldMetas.find(f => f.key === compare.source),
    [filterFieldMetas, compare.source],
  );

  const filterOperations = useMemo(() => {
    if (filterFieldMeta?.type) {
      return compareOperationData(
        FieldOpMap[filterFieldMeta.type] || [CompareOP.EQ],
      );
    }
    return [];
  }, [filterFieldMeta]);

  function compareOperationData(compareOperation: UniteCompareOP[]) {
    return compareOperation.map(op => {
      return {
        label: get(localeData.lang, `compareOperation.${op}`),
        value: op,
      };
    });
  }

  const multiple = useMemo(
    () =>
      compare.op === CompareOP.IN ||
      compare.op === CompareOP.NIN ||
      compare.op === DateCompareOP.BETWEEN,
    [compare.op],
  );

  const onKeyChange = useCallback(
    (source: string) => {
      const fieldMeta = filterFieldMetas.find(meta => meta.key === source);
      const op =
        fieldMeta && FieldOpMap[fieldMeta.type].some(op => op === compare.op)
          ? compare.op
          : undefined;
      const newCompare = update(compare, {
        source: { $set: source },
        op: { $set: op },
        target: { $set: undefined },
      });
      context.onChange(
        update(context.value, { [index]: { $set: newCompare } }),
      );
    },
    [context, compare, filterFieldMeta, index],
  );

  const onOperationChange = useCallback(
    (op: UniteCompareOP) => {
      if (
        compare.op === DateCompareOP.UNIT_DATE_RANGE ||
        compare.op === DateCompareOP.BETWEEN ||
        op === DateCompareOP.UNIT_DATE_RANGE ||
        op === DateCompareOP.BETWEEN
      ) {
        // onChange(
        //   update(compare, { op: { $set: op }, target: { $set: undefined } }),
        // );
        const newCompare = update(compare, {
          op: { $set: op },
          target: { $set: undefined },
        });
        context.onChange(
          update(context.value, { [index]: { $set: newCompare } }),
        );
      } else {
        const newCompare = update(compare, { op: { $set: op } });
        context.onChange(
          update(context.value, { [index]: { $set: newCompare } }),
        );
      }
    },
    [compare, context, index],
  );

  const onValueChange = useCallback(
    (value: any) => {
      if (value === compare.target) return;
      const newCompare = update(compare, { target: { $set: value } });
      context.onChange(
        update(context.value, { [index]: { $set: newCompare } }),
      );
    },
    [compare, context, index],
  );

  const handleRemove = useCallback(
    () => context.onChange(update(context.value, { $splice: [[index, 1]] })),
    [context, index],
  );

  const filterValueInput = useMemo(() => {
    return filterFieldMeta ? (
      <FilterValueInput
        value={compare.target}
        multiple={multiple}
        fieldMeta={filterFieldMeta}
        fieldMetaService={filterFieldService}
        onChange={onValueChange}
        operation={compare.op}
        style={inputStyle}
      />
    ) : (
      <Input
        disabled
        placeholder={get(localeData.lang, 'filed.placeholderOp.value')}
        style={inputStyle}
      />
    );
  }, [filterFieldMeta, multiple, compare, onValueChange]);

  return (
    <div className="tbox-filter-compare">
      <Space>
        <Select
          style={{ width: '154px' }}
          value={compare.source}
          options={fieldOptions}
          placeholder={get(localeData.lang, 'filed.placeholderOp.select')}
          onChange={onKeyChange}
        />
        <Select
          style={{ width: '92px' }}
          value={compare.op}
          options={filterOperations}
          onChange={onOperationChange}
          showArrow={false}
        />
        {filterValueInput}
        <Button
          type="text"
          onClick={handleRemove}
          icon={<CloseLine />}
        ></Button>
      </Space>
    </div>
  );
};
