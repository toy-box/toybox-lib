import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
  ReactNode,
  ReactText,
  useContext,
} from 'react';
import { DatePicker, Input, InputNumber, Select as AntSelect } from 'antd';
// import { useSelector } from 'react-redux';
import { SelectValue, LabeledValue } from 'antd/lib/select';
import { RawValueType } from 'rc-tree-select/lib/interface';
import moment from 'moment';
import get from 'lodash.get';
import localeMap from '../locale';
import LocaleContext from 'antd/lib/locale-provider/context';
import Fields from '../../Fields';
import SelectPro from '../../SelectPro';
import Search from '../../Search';
import { SearchLine } from '@airclass/icons';
import { BusinessFieldType, FieldService } from '../../../types/compare';
import { FieldMeta } from '../../../types/interface';
import { OptionItem } from '../../../types/interface';

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
  mode?: 'read' | 'edit' | 'update';
  filterFieldService?: FieldService;
  singleMode?: boolean;
}

export const FilterValueInput: FC<FilterValueInputProps> = ({
  filterField,
  value,
  onChange,
  multiple,
  style,
  mode = 'edit',
  singleMode,
  filterFieldService,
}) => {
  // const [initial, setInitial] = useState(false);
  const [treeData, setTreeData] = useState([]);

  const antLocale = useContext(LocaleContext);
  const locale = useMemo(
    () => (antLocale && antLocale.locale ? antLocale.locale : 'zh_CN'),
    [antLocale],
  );
  const localeData = useMemo(() => localeMap[locale || 'zh_CN'], [locale]);
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
    (value?: any) => {
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
    if (multiple) {
      if (value != null && !Array.isArray(value)) {
        onChange([value]);
      } else if (value == null) {
        onChange(undefined);
      }
      // if (innerValues != null && !Array.isArray(innerValues)) {
      //   setInnerValues([innerValues]);
      // }
    } else {
      if (Array.isArray(value) && value.length > 0) {
        // setInnerValue(innerValue[0]);
        onChange(value[0]);
      }
      // if (Array.isArray(innerValues)) {
      //   setInnerValues([innerValues[0]]);
      // }
    }
  }, [multiple]);

  const searchOptions = useCallback(
    async (value: any) => {
      console.log(value, filterFieldService);
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
    return ops || [];
  }, [filterField.key, filterFieldService, value]);

  const findDataTrees = useCallback(
    async parentId => {
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

  const filterValue = useMemo(() => {
    if (multiple) {
      if (Array.isArray(value)) return value;
      if (!Array.isArray(value) && value != null) return [value];
    } else {
      if (Array.isArray(value) && value.length > 0) return value[0];
      return value;
    }
  }, [value, multiple]);

  const field = {
    key: 'tree',
    name: 'Tree',
    type: 'treeSelect',
  };

  const input = useMemo(() => {
    switch (filterField?.type) {
      case BusinessFieldType.STRING:
        return (
          <Fields.FieldString
            disabled={filterField == null}
            field={field}
            mode={mode}
            style={style}
            placeholder={`${get(localeData.lang, 'filed.placeholderOp.param')}${
              filterField.name
            }`}
            value={value}
            onChange={handleValue}
          />
        );
      case BusinessFieldType.SEARCH_ICON:
        if (singleMode) {
          return (
            <div style={style}>
              <Search.IconSearch
                disabled={filterField == null}
                placeholder={`${get(
                  localeData.lang,
                  'filed.placeholderOp.param',
                )}${filterField.name}`}
                value={value}
                onChange={handleValue}
              >
                <SearchLine />
              </Search.IconSearch>
            </div>
          );
        }
        return (
          <div style={style}>
            <Search
              disabled={filterField == null}
              placeholder={`${get(
                localeData.lang,
                'filed.placeholderOp.param',
              )}${filterField.name}`}
              value={value}
              onChange={value => handleValue(value)}
            />
          </div>
        );
      case BusinessFieldType.NUMBER:
        return (
          <InputNumber
            disabled={filterField == null}
            placeholder={`${get(localeData.lang, 'filed.placeholderOp.param')}${
              filterField.name
            }`}
            style={style}
            value={value}
            onChange={value => handleValue(value)}
          />
        );
      case BusinessFieldType.DATE:
        return (
          // <DatePicker
          //   value={value != null ? moment(value) : null}
          //   onChange={value => handleValue(value?.format('YYYY/MM/DD'))}
          // />
          <div style={style}>
            <Fields.FieldDate
              value={value}
              mode={mode}
              field={field}
              placeholder={`${get(
                localeData.lang,
                'filed.placeholderOp.paramSelect',
              )}${filterField.name}`}
              format={filterField.format || 'YYYY/MM/DD'}
              onChange={value =>
                handleValue(value?.format(filterField.format || 'YYYY/MM/DD'))
              }
            />
          </div>
        );
      case BusinessFieldType.DATETIME:
        return (
          <div style={style}>
            <Fields.FieldDate
              value={value}
              mode={mode}
              field={field}
              showTime
              placeholder={`${get(
                localeData.lang,
                'filed.placeholderOp.paramSelect',
              )}${filterField.name}`}
              format={filterField.format || 'YYYY/MM/DD HH:mm:ss'}
              onChange={value =>
                handleValue(
                  value?.format(filterField.format || 'YYYY/MM/DD HH:mm:ss'),
                )
              }
            />
          </div>
        );
      case BusinessFieldType.SINGLE_OPTION:
        return (
          <SelectPro
            disabled={filterField == null}
            placeholder={`${get(localeData.lang, 'filed.placeholderOp.param')}${
              filterField.name
            }`}
            mode={multiple ? 'multiple' : undefined}
            allowClear
            style={style}
            showSearch
            options={filterField.options}
            value={filterValue}
            onChange={(value, options) =>
              handleSelectOptions(value, options as OptionItem)
            }
          />
        );
      case BusinessFieldType.BUSINESS_OBJECT:
        return (
          <SelectPro
            placeholder={get(localeData.lang, 'filed.placeholderOp.value')}
            style={style}
            options={filterField.options}
            mode={multiple ? 'multiple' : undefined}
            value={filterValue}
            params={filterField}
            showSearch
            remote={searchOptions}
            remoteByValue={searchByValue}
            onChange={(value, options) =>
              handleSelectOptions(value, options as OptionItem)
            }
          />
        );
      case BusinessFieldType.OBJECT_ID:
        if (
          filterField.parentKey != null &&
          filterField.parentKey !== '' &&
          multiple
        ) {
          return (
            <Fields.FieldTreeSelect
              field={field}
              style={style}
              mode={mode}
              placeholder={get(localeData.lang, 'filed.placeholderOp.value')}
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
            placeholder={get(localeData.lang, 'filed.placeholderOp.value')}
            style={style}
            options={filterField.options}
            mode={multiple ? 'multiple' : undefined}
            value={filterValue}
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
          <Fields.FieldString
            disabled={filterField == null}
            field={field}
            mode={mode}
            style={style}
            placeholder={`${get(localeData.lang, 'filed.placeholderOp.param')}${
              filterField.name
            }`}
            value={value}
            onChange={handleValue}
          />
          // <Input
          //   disabled={filterField == null}
          //   placeholder={`${get(localeData.lang, 'filed.placeholderOp.param')}${
          //     filterField.name
          //   }`}
          //   style={style}
          //   value={value}
          //   onChange={e => handleValue(e.target.value)}
          // />
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
