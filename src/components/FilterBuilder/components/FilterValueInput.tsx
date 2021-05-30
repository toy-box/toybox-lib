import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useContext,
  CSSProperties,
} from 'react';
import { InputNumber } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { RawValueType } from 'rc-tree-select/lib/interface';
import LocaleContext from 'antd/lib/locale-provider/context';
import dayjs, { Dayjs } from 'dayjs';
import get from 'lodash.get';
import localeMap from '../locale';
import DatePicker from '../../DatePicker';
import Fields from '../../Fields';
import SelectPro from '../../SelectPro';
import DateFilter from '../../DateFilter';
import {
  BusinessFieldType,
  FieldService,
  FieldMeta,
  OptionItem,
  UniteCompareOP,
  DateCompareOP,
} from '../../../types';

declare type RangeValue = [
  string | number | undefined,
  string | number | undefined,
];

export declare type FilterValueInputType =
  | 'string'
  | 'number'
  | 'date'
  | 'datetime'
  | 'tree'
  | 'select'
  | 'unitDateRange'
  | 'dateBetween';

export interface FilterValueInputProps {
  fieldMeta: FieldMeta;
  operation?: UniteCompareOP;
  value?: any;
  multiple?: boolean;
  onChange: (value: any, text?: string[]) => void;
  style?: CSSProperties;
  mode?: 'read' | 'edit' | 'update';
  fieldMetaService?: FieldService;
  locale?: string;
}

export const FilterValueInput: FC<FilterValueInputProps> = ({
  fieldMeta,
  operation,
  value,
  onChange,
  multiple,
  style,
  mode = 'edit',
  fieldMetaService,
  locale = 'zh_CN',
}) => {
  const [treeData, setTreeData] = useState([]);

  const antLocale = useContext(LocaleContext);
  const localeName = useMemo(
    () => (antLocale && antLocale.locale ? antLocale.locale : locale),
    [antLocale],
  );
  const localeData = useMemo(() => localeMap[localeName], [localeName]);

  const remote = useMemo(
    () =>
      fieldMeta &&
      (fieldMeta.type === BusinessFieldType.OBJECT_ID ||
        fieldMeta.type === BusinessFieldType.OBJECT ||
        fieldMeta.type === 'businessObject' ||
        fieldMeta.type === 'document'),
    [fieldMeta],
  );

  const inputType = useMemo(() => {
    switch (fieldMeta.type) {
      case BusinessFieldType.STRING:
        return 'stirng';
      default:
        return;
    }
    return;
  }, [fieldMeta]);

  const handleValue = useCallback(
    (value?: any, text?: string[]) => {
      onChange(value === undefined ? null : value, text);
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
    } else {
      if (Array.isArray(value) && value.length > 0) {
        onChange(value[0]);
      }
    }
  }, [multiple]);

  const searchOptions = useCallback(
    async (value: any) => {
      if (fieldMeta == null) {
        return [];
      }
      const ops = await fieldMetaService?.findOptions(
        fieldMeta.key as BusinessFieldType,
        value,
      );
      return ops || ([] as OptionItem[]);
    },
    [fieldMeta, fieldMetaService],
  );

  const searchByValue = useCallback(async () => {
    const ids = Array.isArray(value) ? value : [value];
    const ops = await fieldMetaService?.findOfValues(
      fieldMeta.key as BusinessFieldType,
      ids,
    );
    return ops || [];
  }, [fieldMeta.key, fieldMetaService, value]);

  const findDataTrees = useCallback(
    async parentId => {
      const ops = await fieldMetaService?.findDataTrees(
        fieldMeta.key as BusinessFieldType,
        parentId,
      );
      return ops || [];
    },
    [fieldMeta.key, fieldMetaService],
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

  const treeFieldMeta = {
    key: 'tree',
    name: 'Tree',
    type: 'treeSelect',
  };

  const input = useMemo(() => {
    switch (fieldMeta?.type) {
      case BusinessFieldType.STRING:
        return (
          <Fields.FieldString
            disabled={fieldMeta == null}
            field={fieldMeta}
            mode={mode}
            style={style}
            placeholder={`${get(localeData.lang, 'filed.placeholderOp.param')}${
              fieldMeta.name
            }`}
            value={value}
            allowClear
            onChange={handleValue}
          />
        );
      case BusinessFieldType.NUMBER:
      case BusinessFieldType.INTEGER:
        return (
          <InputNumber
            disabled={fieldMeta == null}
            placeholder={`${get(localeData.lang, 'filed.placeholderOp.param')}${
              fieldMeta.name
            }`}
            style={style}
            value={value}
            onChange={value => handleValue(value)}
          />
        );
      case BusinessFieldType.DATE:
      case BusinessFieldType.DATETIME:
        const format =
          fieldMeta.type === BusinessFieldType.DATE
            ? 'YYYY/MM/DD'
            : 'YYYY/MM/DD HH:mm:ss';
        if (operation === DateCompareOP.UNIT_DATE_RANGE) {
          return (
            <DateFilter
              style={style}
              value={value}
              onChange={(value, text) => handleValue(value, text ? [text] : [])}
            />
          );
        }
        if (operation === DateCompareOP.BETWEEN) {
          const innerValue =
            value != null
              ? ([dayjs(value[0]), dayjs(value[1])] as [Dayjs, Dayjs])
              : undefined;
          return (
            <DatePicker.RangePicker
              value={innerValue}
              format={format}
              onChange={value => {
                const doValue = value
                  ? ([
                      value[0] ? value[0].toJSON() : undefined,
                      value[1] ? value[1].toJSON() : undefined,
                    ] as RangeValue)
                  : undefined;
                const doValues = value
                  ? [
                      value[0] ? value[0].format(format) : '',
                      value[1] ? value[1].format(format) : '',
                    ]
                  : [];
                handleValue(doValue, doValues);
              }}
              style={style}
              showTime={
                fieldMeta.type === BusinessFieldType.DATETIME
                  ? { format: 'HH:mm' }
                  : false
              }
            />
          );
        }
        return (
          <div style={style}>
            <Fields.FieldDate
              value={value}
              mode={mode}
              field={fieldMeta}
              placeholder={`${get(
                localeData.lang,
                'filed.placeholderOp.paramSelect',
              )}${fieldMeta.name}`}
              format={fieldMeta.format || format}
              onChange={value =>
                handleValue(value?.format(fieldMeta.format || format))
              }
            />
          </div>
        );
      case BusinessFieldType.SINGLE_OPTION:
        return (
          <SelectPro
            disabled={fieldMeta == null}
            placeholder={`${get(localeData.lang, 'filed.placeholderOp.param')}${
              fieldMeta.name
            }`}
            mode={multiple ? 'multiple' : undefined}
            allowClear
            style={style}
            showSearch
            options={fieldMeta.options}
            value={filterValue}
            onChange={(value, options) =>
              handleSelectOptions(value, options as OptionItem)
            }
          />
        );
      case BusinessFieldType.OBJECT:
        return (
          <SelectPro
            placeholder={get(localeData.lang, 'filed.placeholderOp.value')}
            style={style}
            options={fieldMeta.options}
            mode={multiple ? 'multiple' : undefined}
            value={filterValue}
            params={fieldMeta}
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
          fieldMeta.parentKey != null &&
          fieldMeta.parentKey !== '' &&
          multiple
        ) {
          return (
            <Fields.FieldTreeSelect
              field={fieldMeta}
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
            options={fieldMeta.options}
            mode={multiple ? 'multiple' : undefined}
            value={filterValue}
            params={fieldMeta}
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
            disabled={fieldMeta == null}
            field={fieldMeta}
            mode={mode}
            style={style}
            placeholder={`${get(localeData.lang, 'filed.placeholderOp.param')}${
              fieldMeta.name
            }`}
            value={value}
            onChange={value => handleValue(value, [value])}
          />
        );
    }
  }, [
    fieldMeta,
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
