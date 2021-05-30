import React, {
  ForwardRefRenderFunction,
  useCallback,
  useState,
  useEffect,
  ReactNode,
  Ref,
  useRef,
  useImperativeHandle,
  useMemo,
} from 'react';
import { TreeSelectProps, TreeSelect as AntTreeSelect } from 'antd';
import { LabeledValue as AntLabeledValue } from 'antd/lib/select';
import {
  LegacyDataNode,
  ChangeEventExtra,
  RawValueType,
} from 'rc-tree-select/lib/interface';
import { BaseFieldProps } from '../interface';
import { makeArray } from '../../../utils';
import { SimpleNode } from '../../../types';

export interface LabeledValue extends AntLabeledValue {
  disabled?: boolean;
}

export declare type LabeledValueType = LabeledValue | LabeledValue[];
export declare type DefaultValueType = RawValueType | RawValueType[];

export interface FieldTreeSelectProps<ValueType = DefaultValueType>
  extends Omit<BaseFieldProps, 'value' | 'onChange' | 'onClick'>,
    Omit<
      TreeSelectProps<ValueType>,
      | 'loadData'
      | 'mode'
      | 'onChange'
      | 'onSelect'
      | 'onDeselect'
      | 'treeDataSimpleMode'
    > {
  loadData: (id?: RawValueType) => Promise<SimpleNode[]>;
  loadByValue: (ids: RawValueType[]) => Promise<LabeledValue[]>;
  onChange: (value?: ValueType) => void;
  onSelect?: (value: LabeledValueType, node: any) => void;
  onDeselect?: (value: LabeledValueType, node: any) => void;
  treeData?: SimpleNode[];
}

const FieldTreeSelect: ForwardRefRenderFunction<any, FieldTreeSelectProps> = (
  {
    loadData,
    loadByValue,
    onChange,
    onSelect,
    onDeselect,
    mode,
    treeData,
    value,
    multiple,
    defaultValue,
    ...otherProps
  },
  ref: Ref<any>,
) => {
  const inputRef = useRef<any>();
  useImperativeHandle(
    ref,
    () => ({
      ...(inputRef.current || {}),
    }),
    [],
  );
  const [initialized, setInitialized] = useState(false);
  const [realTreeData, setRealTreeData] = useState(treeData);
  const [labelValueCache, setLabelValueCache] = useState<LabeledValue[]>([]);

  useEffect(() => {
    if (!initialized) {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          loadByValue(value).then(data => {
            setLabelValueCache(data);
            setInitialized(true);
          });
        }
      } else if (value != null) {
        loadByValue([value]).then(data => {
          setLabelValueCache(data);
          setInitialized(true);
        });
      } else {
        setInitialized(true);
      }
    }
  }, [initialized, labelValueCache, loadByValue, value]);

  useEffect(() => {
    if (treeData == null || treeData.length === 0) {
      loadData().then(data => {
        if (data.length > 0) {
          const root = data.find(d => d.pId === 0);
          if (root != null) {
            loadData(root.id).then(data => {
              setRealTreeData([root, ...data]);
            });
          }
        }
      });
    }
  }, [treeData, loadData]);

  const innerValue = useMemo(() => {
    if (value == null) {
      return undefined;
    }
    if (Array.isArray(value)) {
      return value.map(
        v =>
          labelValueCache.find(c => c.value === v) ||
          ({ value: v, label: v } as LabeledValue),
      );
    }
    return labelValueCache.find(c => c.value === value);
  }, [value, labelValueCache]);

  const onLoadData = useCallback(
    async (node: LegacyDataNode) => {
      const nodes = await loadData(node.id);
      const newNodes = nodes.filter(
        d => !(realTreeData || []).some(rd => rd.id === d.id),
      );
      if (newNodes.length > 0) {
        setRealTreeData((realTreeData || []).concat(...newNodes));
      }
    },
    [loadData, realTreeData],
  );

  const handleChange = useCallback(
    (
      value: LabeledValueType,
      labelList: React.ReactNode[],
      extra: ChangeEventExtra,
    ) => {
      if (value == null) {
        return onChange(undefined);
      }
      if (Array.isArray(value)) {
        const unCached = value.filter(
          v => !labelValueCache.some(c => c.value === v.value),
        );
        setLabelValueCache(labelValueCache.concat(...unCached));
        return onChange(value.map(v => v.value));
      } else if (value != null) {
        if (!labelValueCache.some(c => c.value === value.value)) {
          setLabelValueCache(labelValueCache.concat(value));
        }
        return onChange(value.value);
      }
    },
    [labelValueCache, onChange],
  );

  if (mode === 'edit' || mode === 'update') {
    return (
      <AntTreeSelect
        ref={inputRef}
        treeDataSimpleMode
        value={innerValue}
        treeCheckable={multiple}
        labelInValue
        multiple={multiple}
        onChange={handleChange}
        treeData={realTreeData}
        showSearch={false}
        loadData={onLoadData}
        {...otherProps}
      />
    );
  } else if (mode === 'read') {
    return (
      <span>
        {makeArray(innerValue)
          .map(i => i.title)
          .join(', ')}
      </span>
    );
  }
  return null;
};

export default React.forwardRef(FieldTreeSelect);
