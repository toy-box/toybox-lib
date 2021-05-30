import React, { FC, useCallback, useMemo, useState, useEffect } from 'react';
import update from 'immutability-helper';
import { Button, Form, Select, Input } from 'antd';
import { CloseLine } from '@airclass/icons';
import get from 'lodash.get';
import { FilterValueInput } from './FilterValueInput';
import {
  ICompareOperation,
  BusinessFieldType,
  FieldService,
  FieldMeta,
  BusinessFieldTypeWild,
  CompareOP,
  DateCompareOP,
  UniteCompareOP,
} from '../../../types/';

const inputStyle = { width: '320px' };

export interface CompareOperationProps {
  filterFieldMetas: FieldMeta[];
  compare: Partial<ICompareOperation>;
  filterFieldService?: FieldService;
  localeData: any;
  onChange: (compare: Partial<ICompareOperation>) => void;
  remove: () => void;
}

export const CompareOperation: FC<CompareOperationProps> = ({
  filterFieldMetas,
  compare,
  onChange,
  remove,
  localeData,
  filterFieldService,
}) => {
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
    let compareOperation: UniteCompareOP[] = [
      CompareOP.EQ,
      CompareOP.NE,
      CompareOP.IN,
      CompareOP.NIN,
    ];
    switch (filterFieldMeta?.type) {
      case BusinessFieldType.NUMBER:
        return compareOperationData([
          CompareOP.EQ,
          CompareOP.NE,
          CompareOP.GT,
          CompareOP.LT,
          CompareOP.GTE,
          CompareOP.LTE,
        ]);
      case BusinessFieldType.DATE:
      case BusinessFieldType.DATETIME:
        return compareOperationData([
          DateCompareOP.UNIT_DATE_RANGE,
          DateCompareOP.BETWEEN,
          CompareOP.EQ,
          CompareOP.NE,
          CompareOP.GT,
          CompareOP.LT,
          CompareOP.GTE,
          CompareOP.LTE,
        ]);
      case BusinessFieldType.STRING:
      case BusinessFieldType.SINGLE_OPTION:
      case BusinessFieldType.OBJECT_ID:
        if (filterFieldMeta.parentKey != null) {
          compareOperation = [CompareOP.IN, CompareOP.NIN];
          return compareOperationData(compareOperation);
        }
        return compareOperationData(compareOperation);
      case BusinessFieldTypeWild.SEARCH_ICON:
        compareOperation = [CompareOP.EQ];
        return compareOperationData(compareOperation);
      default:
        return compareOperationData(compareOperation);
    }
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
      onChange(
        update(compare, {
          target: { $set: undefined },
          source: { $set: source },
        }),
      );
    },
    [onChange, compare, filterFieldMeta],
  );

  const onOperationChange = useCallback(
    (op: UniteCompareOP) => {
      if (
        compare.op === DateCompareOP.UNIT_DATE_RANGE ||
        compare.op === DateCompareOP.BETWEEN ||
        op === DateCompareOP.UNIT_DATE_RANGE ||
        op === DateCompareOP.BETWEEN
      ) {
        onChange(
          update(compare, { op: { $set: op }, target: { $set: undefined } }),
        );
      } else {
        onChange(update(compare, { op: { $set: op } }));
      }
    },
    [compare],
  );

  const onValueChange = useCallback(
    (value: any) => {
      if (value === compare.target) return;
      onChange(update(compare, { target: { $set: value } }));
    },
    [compare, onChange],
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
      <Form layout="inline">
        <Form.Item>
          <Select
            style={{ width: '154px' }}
            value={compare.source}
            options={fieldOptions}
            placeholder={get(localeData.lang, 'filed.placeholderOp.select')}
            onChange={onKeyChange}
          />
        </Form.Item>
        <Form.Item>
          <Select
            style={{ width: '92px' }}
            value={compare.op}
            options={filterOperations}
            onChange={onOperationChange}
            showArrow={false}
          />
        </Form.Item>
        <Form.Item>{filterValueInput}</Form.Item>
        <Form.Item style={{ marginRight: 0 }}>
          <Button type="text" onClick={remove} icon={<CloseLine />}></Button>
        </Form.Item>
      </Form>
    </div>
  );
};
