import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
  ReactNode,
  ReactText,
} from 'react';
import { DatePicker, Input, InputNumber, Select as AntSelect } from 'antd';
// import { useSelector } from 'react-redux';
import { SelectValue, LabeledValue } from 'antd/lib/select';
import { RawValueType } from 'rc-tree-select/lib/interface';
import moment from 'moment';
import Fields from '../../Fields';
import SelectPro from '../../SelectPro';
// import Fields from '../../Fields';
// import { Select } from '../../fields/Select';
import {
  FieldMeta,
  BusinessFieldType,
  FieldService,
} from '../../../types/compare';
import { OptionItem } from '../../../types/interface';
// import { filterSearch, filterFindByIds, filterSearchTree } from '../../services/scene.service';

// export interface OptionItem {
//   label: React.ReactNode;
//   value: React.ReactText;
// }

function isReactText(value: ReactNode): boolean {
  return typeof value === 'string' || typeof value === 'number';
}

export interface FilterValueInputProps {
  filterField: FieldMeta;
  value?: any;
  multiple?: boolean;
  onChange: (value: any) => void;
  style?: any;
  filterFieldService?: FieldService;
}

export const FilterValueInput: FC<FilterValueInputProps> = ({
  filterField,
  value,
  onChange,
  multiple,
  style,
  filterFieldService,
}) => {
  const [initial, setInitial] = useState(false);
  const [treeData, setTreeData] = useState([]);
  // const [innerValues, setInnerValues] = useState<(number | string)[]>([]);

  // const sceneSetupState = useSelector(state => state.sceneSetup);

  const remote = useMemo(
    () =>
      filterField.type === BusinessFieldType.OBJECT_ID ||
      filterField.type === 'businessObject' ||
      filterField.type === 'document',
    [filterField.type],
  );

  const handleValue = useCallback(
    (value?: SelectValue) => {
      onChange(value === undefined ? null : value);
    },
    [onChange],
  );

  const handleSelectOptions = useCallback(
    (value: SelectValue, options: OptionItem | OptionItem[]) => {
      if (Array.isArray(options)) {
        handleValue(value);
      } else {
        handleValue(value);
      }
    },
    [handleValue],
  );

  const handleTreeSelect = useCallback(
    (labelValue: RawValueType | RawValueType[]) => {
      // if (Array.isArray(labelValue)) {
      //   handleValue(labelValue.map(l => l));
      // } else {
      //   handleValue(labelValue);
      // }
      handleValue(labelValue as RawValueType | RawValueType[]);
    },
    [handleValue],
  );

  useEffect(() => {
    const init = () => {
      if (initial) {
        return;
      }
      if (filterField.type === BusinessFieldType.DATE) {
        const newValues =
          value != null ? [moment(value).format('YYYY-MM-DD')] : [];
        onChange(value);
      } else if (filterField.type === BusinessFieldType.DATETIME) {
        const newValues =
          value != null ? [moment(value).format('YYYY-MM-DD HH:mm:ss')] : [];
        onChange(value);
      } else {
        onChange(value);
      }
      setInitial(true);
    };
    init();
  }, [filterField.key, filterField.type, initial, onChange, remote, value]);

  useEffect(
    () => {
      if (multiple) {
        if (value != null && !Array.isArray(value)) {
          onChange([value]);
        }
        // if (innerValues != null && !Array.isArray(innerValues)) {
        //   setInnerValues([innerValues]);
        // }
      } else {
        if (Array.isArray(value)) {
          // setInnerValue(innerValue[0]);
          onChange(value[0]);
        }
        // if (Array.isArray(innerValues)) {
        //   setInnerValues([innerValues[0]]);
        // }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [multiple],
  );

  // const searchOptions = useCallback(async (keyword: string = '') => {
  //   try {
  //     const { data } = await filterSearch(sceneSetupState.id, {
  //       key: filterField.key,
  //       keyword,
  //     });
  //     return data;
  //   } catch (e) {
  //     return [];
  //   };
  // }, [filterField.key, sceneSetupState.id]);

  // const searchByValue = useCallback(async (ids: (string | number)[]) => {
  //   const { data } = await filterFindByIds(sceneSetupState.id, {
  //     key: filterField.key,
  //     ids
  //   });
  //   return data;
  // }, [filterField.key, sceneSetupState.id]);

  // const loadData = useCallback(async (parentId?: string | number): Promise<SimpleNode[]> => {
  //   const { data } = await filterSearchTree(sceneSetupState.id, filterField.key, parentId);
  //   return data.map(d => ({
  //     id: d.value,
  //     pId: parentId || 0,
  //     title: d.label,
  //     disabled: d.disabled,
  //   }));
  // }, [filterField.key, sceneSetupState.id]);

  // const loadByValue = useCallback(async (value) => {
  //   const ids = Array.isArray(value) ? value : [value];
  //   const { data } = await filterFindByIds(sceneSetupState.id, {
  //     key: filterField.key,
  //     ids,
  //   });
  //   return data;
  // }, [filterField.key, sceneSetupState.id]);
  const searchOptions = useCallback(
    async (value: any) => {
      // console.log(value, filterField, 11123232);
      const ops = await filterFieldService?.findOptions(
        filterField.key as BusinessFieldType,
        value,
      );
      return ops || ([] as OptionItem[]);
    },
    [filterField.key, filterFieldService],
  );

  const searchByValue = useCallback(async () => {
    const ids = Array.isArray(value) ? value : [value];
    const ops = await filterFieldService?.findOfValues(
      filterField.key as BusinessFieldType,
      ids,
    );
    console.log(value, ops, 11123232);
    return ops || [];
  }, [filterField.key, filterFieldService, value]);

  const findDataTrees = useCallback(
    async parentId => {
      console.log(value, filterField, 11123232);
      const ops = await filterFieldService?.findDataTrees(
        filterField.key as BusinessFieldType,
        parentId,
      );
      // setTreeData([{ id: '1', pId: 0, value: '1', title: 'Expand to load' }]);
      // return [];
      return ops || [];
    },
    [filterField.key, filterFieldService],
  );

  const field = {
    key: 'tree',
    name: 'Tree',
    type: 'treeSelect',
  };
  // useEffect(() => {
  //   // loadByValue();
  // }, [filterField.key, filterFieldService]);

  const input = useMemo(() => {
    switch (filterField?.type) {
      case BusinessFieldType.STRING:
        return (
          <Input
            disabled={filterField == null}
            placeholder="请收入维度值"
            style={style}
            value={value}
            onChange={e => handleValue(e.target.value)}
          />
        );
      case BusinessFieldType.NUMBER:
        return (
          <InputNumber
            disabled={filterField == null}
            placeholder={`请输入${filterField.name}`}
            style={style}
            value={value}
            onChange={value => handleValue(value)}
          />
        );
      case BusinessFieldType.DATE:
        return (
          <DatePicker
            value={value != null ? moment(value) : null}
            onChange={value => handleValue(value?.format('YYYY/MM/DD'))}
          />
        );
      case BusinessFieldType.DATETIME:
        return (
          <DatePicker
            value={value != null ? moment(value) : null}
            onChange={value =>
              handleValue(value?.format('YYYY/MM/DD HH:mm:ss'))
            }
          />
        );
      case BusinessFieldType.SINGLE_OPTION:
        return (
          <AntSelect
            disabled={filterField == null}
            placeholder={`请选择${filterField.name}`}
            mode={multiple ? 'multiple' : undefined}
            allowClear
            style={style}
            options={filterField.options}
            value={value}
            onChange={(value, options) =>
              handleSelectOptions(value, options as OptionItem)
            }
          />
        );
      case BusinessFieldType.OBJECT_ID:
        if (filterField.parentKey != null && filterField.parentKey !== '') {
          return (
            <Fields.FieldTreeSelect
              field={field}
              style={style}
              mode="edit"
              placeholder="请选择维度值"
              multiple={multiple}
              value={value}
              onChange={handleValue}
              treeData={treeData}
              loadData={findDataTrees}
              loadByValue={searchByValue}
            />
          );
        }
        return (
          <SelectPro
            placeholder="请选择维度值"
            style={style}
            options={filterField.options}
            mode={multiple ? 'multiple' : undefined}
            value={value}
            params={filterField}
            showSearch
            remote={searchOptions}
            remoteByValue={searchByValue}
            onChange={(value, options) =>
              handleSelectOptions(value, options as OptionItem)
            }
          />
        );
      default:
        return (
          <Input
            disabled={filterField == null}
            placeholder={`请输入${filterField.name}`}
            style={style}
            value={value}
            onChange={e => handleValue(e.target.value)}
          />
        );
    }
  }, [
    filterField,
    style,
    value,
    multiple,
    handleValue,
    handleSelectOptions,
    handleTreeSelect,
  ]);

  return input;
};

export default FilterValueInput;
