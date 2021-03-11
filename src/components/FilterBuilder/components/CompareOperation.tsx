import React, {
  FC,
  useCallback,
  useMemo,
  useState,
  useEffect,
  useContext,
} from 'react';
import styled from 'styled-components';
import update from 'immutability-helper';
import { Button, Form, Select, Input } from 'antd';
import { FilterValueInput } from './FilterValueInput';
import { CloseLine } from '@airclass/icons';
import {
  ICompareOperation,
  CompareOP,
  FieldMeta,
  BusinessFieldType,
  FieldService,
} from '../../../types/compare';

const CompareOperationWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const inputStyle = { width: '198px' };

export interface CompareOperationProps {
  filterFieldMetas: FieldMeta[];
  compare: Partial<ICompareOperation>;
  compares: Partial<ICompareOperation>[];
  filterFieldService?: FieldService;
  isBaseBuilder?: boolean;
  onChange: (compare: Partial<ICompareOperation>) => void;
  remove: () => void;
}

export const CompareOperation: FC<CompareOperationProps> = ({
  filterFieldMetas,
  compare,
  compares,
  onChange,
  isBaseBuilder,
  remove,
  filterFieldService,
}) => {
  const [filterKey, setFilterKey] = useState(compare.source);
  const [filterOperation, setFilterOperation] = useState(compare.op);
  const [filterValue, setFilterValue] = useState(compare.target);
  // const [filterValues, setFilterValues] = useState<(string | number)[]>([]);

  const fieldOptions = useMemo(() => {
    if (!isBaseBuilder)
      return filterFieldMetas.map(field => ({
        label: field.name,
        value: field.key,
      }));
    const newFieldMetas: FieldMeta[] = [];
    filterFieldMetas.forEach(field => {
      const p = compares && compares.find(com => com.source === field.key);
      if (!p || compare.source === field.key) newFieldMetas.push(field);
    });
    return newFieldMetas.map(field => ({
      label: field.name,
      value: field.key,
    }));
  }, [filterFieldMetas]);

  const filterFieldMeta = useMemo(
    () => filterFieldMetas.find(f => f.key === filterKey),
    [filterFieldMetas, filterKey],
  );

  const disabledFieldOption = useMemo(() => {
    return true;
  }, []);

  const filterOperations = useMemo(() => {
    switch (filterFieldMeta?.type) {
      case BusinessFieldType.NUMBER:
      case BusinessFieldType.DATE:
      case BusinessFieldType.DATETIME:
        return [
          { label: '等于', value: '$eq' },
          { label: '不等于', value: '$ne' },
          { label: '大于', value: '$gt' },
          { label: '小于', value: '$lt' },
          { label: '大于等于', value: '$gte' },
          { label: '小于等于', value: '$lte' },
        ];
      case BusinessFieldType.STRING:
      case BusinessFieldType.SINGLE_OPTION:
      case BusinessFieldType.OBJECT_ID:
        if (filterFieldMeta.parentKey != null) {
          return [
            { label: '包括', value: '$in' },
            { label: '不包括', value: '$nin' },
          ];
        }
        return [
          { label: '等于', value: '$eq' },
          { label: '不等于', value: '$ne' },
          { label: '包括', value: '$in' },
          { label: '不包括', value: '$nin' },
        ];
      default:
        return [
          { label: '等于', value: '$eq' },
          { label: '不等于', value: '$ne' },
          { label: '包括', value: '$in' },
          { label: '不包括', value: '$nin' },
        ];
    }
  }, [filterFieldMeta]);

  const multiple = useMemo(
    () => filterOperation === CompareOP.IN || filterOperation === CompareOP.NIN,
    [filterOperation],
  );

  const onKeyChange = useCallback(
    (source: string) => {
      setFilterKey(source);
      setFilterValue(undefined);
      // setFilterValues([]);
      onChange(
        update(compare, {
          target: { $set: undefined },
          source: { $set: source },
        }),
      );
    },
    [onChange, compare, filterKey, filterFieldMeta, filterOperation],
  );

  const onOperationChange = useCallback(
    (op: CompareOP) => {
      setFilterOperation(op);
      onChange(update(compare, { op: { $set: op } }));
    },
    [onChange, compare, filterKey, filterFieldMeta, filterValue],
  );

  const onValueChange = useCallback(
    (value: any) => {
      if (value === filterValue) return;
      setFilterValue(value);
      onChange(update(compare, { target: { $set: value } }));
    },
    [compare, filterFieldMeta, filterKey, filterOperation, onChange],
  );

  const FilterValue = useMemo(() => {
    return filterFieldMeta ? (
      <FilterValueInput
        value={filterValue}
        multiple={multiple}
        filterField={filterFieldMeta}
        filterFieldService={filterFieldService}
        onChange={onValueChange}
        style={inputStyle}
      />
    ) : (
      <Input disabled placeholder="请选择维度值" style={inputStyle} />
    );
  }, [filterValue, filterFieldMeta, multiple, onValueChange]);

  // useEffect(() => {
  //   console.log(compare, 'compare.target');
  //   if (compare.source === filterKey && compare.source === filterOperation
  //       && compare.source === filterValue) return;
  //   setFilterKey(compare.source);
  //   setFilterOperation(compare.op);
  //   setFilterValue(compare.target);
  // }, [compare]);

  return (
    <CompareOperationWrapper>
      <Form layout="inline">
        <Form.Item>
          <Select
            style={{ width: '154px' }}
            value={filterKey}
            options={fieldOptions}
            placeholder="请选择维度"
            onChange={onKeyChange}
          />
        </Form.Item>
        <Form.Item>
          <Select
            style={{ width: '84px' }}
            value={filterOperation}
            options={filterOperations}
            onChange={onOperationChange}
            showArrow={false}
          />
        </Form.Item>
        <Form.Item>{FilterValue}</Form.Item>
        <Form.Item style={{ marginRight: 0 }}>
          <Button type="text" onClick={remove} icon={<CloseLine />}></Button>
        </Form.Item>
      </Form>
    </CompareOperationWrapper>
  );
};
