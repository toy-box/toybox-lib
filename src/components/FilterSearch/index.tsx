import React, { FC, useState, useMemo, useCallback, useContext } from 'react';
import { Form, Tooltip, Popover, Button } from 'antd';
import LocaleContext from 'antd/lib/locale-provider/context';
import { Filter3Line } from '@airclass/icons';
import update from 'immutability-helper';
import { CompareOP } from '../../types/compare';
import localeMap from './locale';
import {
  ICompareOperation,
  BusinessFieldType,
  FieldService,
} from '../../types/compare';
import { FilterValueInput } from '../FilterBuilder/components/FilterValueInput';
import Container from './components/Container';
import { FieldMeta } from '../../types/interface';

export interface LabelValue {
  value: any;
  label: string;
}

export declare type LabelValueType = LabelValue | LabelValue[];

export declare type FilterType = ICompareOperation[];

export interface FilterLabel {
  title: string;
  key: string;
  op: CompareOP;
  labelValue: LabelValueType;
  ellipsis?: boolean;
}

export interface IFilterSearchProps {
  filterFieldMetas: FieldMeta[];
  simpleFilterKeys?: string[];
  value?: FilterType;
  filterFieldService?: FieldService;
  title?: string;
  onChange?: (filter?: FilterType) => void;
  onCancel?: () => void;
}

const FilterSearch: FC<IFilterSearchProps> = ({
  filterFieldMetas,
  simpleFilterKeys = [],
  filterFieldService,
  value,
  title,
  onChange,
  onCancel,
}) => {
  const [filterEditVisible, setFilterEditVisible] = useState(false);
  const antLocale = useContext(LocaleContext);
  const locale = useMemo(
    () => (antLocale && antLocale.locale ? antLocale.locale : 'zh_CN'),
    [antLocale],
  );
  const localeData = useMemo(() => localeMap[locale || 'zh_CN'], [locale]);

  const handleChange = useCallback(
    (filter: FilterType) => {
      setFilterEditVisible(false);
      const validFilter = filter.filter(item => item.op && item.target != null);
      onChange && onChange(validFilter);
    },
    [onChange],
  );

  const filterValue = useCallback(
    filed => {
      const meta = value?.find(val => val.source === filed.key);
      const metaArr = value?.filter(val => val.source === filed.key);
      if (metaArr && metaArr.length > 1) return;
      const isShowMeta =
        meta && (meta.op === CompareOP.IN || meta.op === CompareOP.EQ);
      if (
        meta &&
        isShowMeta &&
        (!Array.isArray(meta.target) || meta.target.length === 1)
      )
        return meta.target;
      return;
    },
    [value],
  );

  const onValueChange = (val: any, filterField: FieldMeta) => {
    switch (filterField.type) {
      case BusinessFieldType.STRING:
      case BusinessFieldType.SINGLE_OPTION:
      case BusinessFieldType.OBJECT_ID:
        handleValueChange(val, filterField, '$in');
        break;
      default:
        handleValueChange(val, filterField, '$eq');
        break;
    }
  };

  const handleValueChange = useCallback(
    (val, fieldMeta: FieldMeta, op = CompareOP.EQ) => {
      const fieldItem: ICompareOperation = {
        source: fieldMeta.key,
        op: op as CompareOP,
        target: val,
      };
      // 如果选项设置空则
      if (val == null) {
        return (
          onChange &&
          onChange(
            (value || []).filter(field => field.source !== fieldMeta.key),
          )
        );
      }
      const refFilters = (value || []).filter(
        field => field.source === fieldMeta.key,
      ).length;
      if (refFilters === 0) {
        return onChange && onChange(update(value, { $push: [fieldItem] }));
      }
      if (refFilters === 1) {
        const idx = (value || []).findIndex(
          field => field.source === fieldMeta.key,
        );
        return (
          onChange && onChange(update(value, { [idx]: { $set: fieldItem } }))
        );
      }
      if (refFilters > 1) {
        const unSelectValues = (value || []).filter(
          field => field.source !== fieldMeta.key,
        );
        return (
          onChange && onChange(update(unSelectValues, { $push: [fieldItem] }))
        );
      }
    },
    [value, onChange],
  );

  const cencel = useCallback(() => {
    setFilterEditVisible(false);
  }, []);

  // 子组件
  const filterContainer = useMemo(() => {
    return (
      <Container
        filterFieldMetas={filterFieldMetas}
        value={value}
        title={title || localeData.lang.filter['defaultTitle']}
        filterFieldService={filterFieldService}
        onChange={handleChange}
        onCancel={cencel}
      />
    );
  }, [filterFieldMetas, value, filterFieldService]);

  const inputStyle = { width: '198px' };

  return (
    <div className="filter-model">
      <Form layout="inline">
        <Form.Item>
          <Popover
            overlayClassName="no-padding"
            placement="bottom"
            content={filterContainer}
            trigger="click"
            visible={filterEditVisible}
            onVisibleChange={setFilterEditVisible}
            destroyTooltipOnHide={true}
          >
            <Tooltip placement="top" title={localeData.lang.filter['tip']}>
              <Button icon={<Filter3Line />} />
            </Tooltip>
          </Popover>
        </Form.Item>
        {simpleFilterKeys.map((key, idx) => {
          const fieldMeta = filterFieldMetas.find(field => field.key === key);
          const flag = fieldMeta?.type === 'searchIcon';
          let singleMode = true;
          if (flag) singleMode = simpleFilterKeys.length === idx + 1;
          return fieldMeta ? (
            <Form.Item>
              <FilterValueInput
                key={idx}
                value={filterValue(fieldMeta)}
                filterFieldService={filterFieldService}
                multiple={false}
                singleMode={singleMode}
                filterField={fieldMeta}
                onChange={value => onValueChange(value, fieldMeta)}
                style={inputStyle}
              />
            </Form.Item>
          ) : (
            undefined
          );
        })}
      </Form>
    </div>
  );
};

export default FilterSearch;
