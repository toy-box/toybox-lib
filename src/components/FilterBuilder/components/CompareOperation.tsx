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
import get from 'lodash.get';
import {
  ICompareOperation,
  CompareOP,
  BusinessFieldType,
  FieldService,
} from '../../../types/compare';
import { FieldMeta } from '../../../types/interface';

const CompareOperationWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const inputStyle = { width: '198px' };

export interface CompareOperationProps {
  filterFieldMetas: FieldMeta[];
  compare: Partial<ICompareOperation>;
  // compares: Partial<ICompareOperation>[];
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
  const [filterKey, setFilterKey] = useState(compare.source);
  const [filterOperation, setFilterOperation] = useState(compare.op);
  const [filterValue, setFilterValue] = useState(compare.target);
  // const [filterValues, setFilterValues] = useState<(string | number)[]>([]);

  const fieldOptions = useMemo(() => {
    return filterFieldMetas.map(field => ({
      label: field.name,
      value: field.key,
    }));
  }, [filterFieldMetas]);

  const filterFieldMeta = useMemo(
    () => filterFieldMetas.find(f => f.key === filterKey),
    [filterFieldMetas, filterKey],
  );

  const filterOperations = useMemo(() => {
    switch (filterFieldMeta?.type) {
      case BusinessFieldType.NUMBER:
      case BusinessFieldType.DATE:
      case BusinessFieldType.DATETIME:
        const compareOperation = ['$eq', '$ne', '$gt', '$lt', '$gte', '$lte'];
        return compareOperation.map(op => {
          return {
            label: get(localeData.lang, `compareOperation.${op}`),
            value: op,
          };
        });
      case BusinessFieldType.STRING:
      case BusinessFieldType.SINGLE_OPTION:
      case BusinessFieldType.OBJECT_ID:
        if (filterFieldMeta.parentKey != null) {
          const compareOperation = ['$in', '$nin'];
          return compareOperation.map(op => {
            return {
              label: get(localeData.lang, `compareOperation.${op}`),
              value: op,
            };
          });
        }
        const operations = ['$eq', '$ne', '$in', '$nin'];
        return operations.map(op => {
          return {
            label: get(localeData.lang, `compareOperation.${op}`),
            value: op,
          };
        });
      case BusinessFieldType.SEARCH_ICON:
        const likes = ['$eq'];
        return likes.map(op => {
          return {
            label: get(localeData.lang, `compareOperation.${op}`),
            value: op,
          };
        });
      default:
        const defultOperation = ['$eq', '$ne', '$in', '$nin'];
        return defultOperation.map(op => {
          return {
            label: get(localeData.lang, `compareOperation.${op}`),
            value: op,
          };
        });
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
      console.log(value, filterValue);
      setFilterValue(value);
      onChange(update(compare, { target: { $set: value } }));
    },
    [compare, onChange],
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
      <Input
        disabled
        placeholder={get(localeData.lang, 'filed.placeholderOp.value')}
        style={inputStyle}
      />
    );
  }, [filterValue, filterFieldMeta, multiple, onValueChange]);

  useEffect(() => {
    setFilterKey(compare.source);
    setFilterOperation(compare.op);
    setFilterValue(compare.target);
  }, [compare]);

  return (
    <CompareOperationWrapper>
      <Form layout="inline">
        <Form.Item>
          <Select
            style={{ width: '154px' }}
            value={filterKey}
            options={fieldOptions}
            placeholder={get(localeData.lang, 'filed.placeholderOp.select')}
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
