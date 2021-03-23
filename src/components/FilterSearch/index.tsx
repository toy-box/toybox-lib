import React, {
  FC,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import { Form, Tooltip, Popover, Button } from 'antd';
import { CompareOP } from '../../types/compare';
import localeMap from './locale';
import {
  ICompareOperation,
  BusinessFieldType,
  FieldService,
} from '../../types/compare';
import update from 'immutability-helper';
import { FilterValueInput } from '../FilterBuilder/components/FilterValueInput';
import LocaleContext from 'antd/lib/locale-provider/context';
import Container from './components/Container';
import { Filter3Line } from '@airclass/icons';
import { FieldMeta } from '@/types/interface';

export interface LabelValue {
  value: any;
  label: string;
}

export declare type LabelValueType = LabelValue | LabelValue[];

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
  value?: Partial<ICompareOperation>[];
  filterFieldService?: FieldService;
  title?: string;
  onChange?: (compares: Partial<ICompareOperation>[]) => void;
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
  const [tagValue, setTagValue] = useState(value);
  const [filterEditVisible, setFilterEditVisible] = useState(false);
  const antLocale = useContext(LocaleContext);
  const locale = useMemo(
    () => (antLocale && antLocale.locale ? antLocale.locale : 'zh_CN'),
    [antLocale],
  );
  const localeData = useMemo(() => localeMap[locale || 'zh_CN'], [locale]);

  const save = useCallback((filterItem: Partial<ICompareOperation>[]) => {
    setFilterEditVisible(false);
    const p = filterItem.filter(item => item.op && item.target != null);
    setTagValue(p);
    onChange && onChange(p);
  }, []);

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

  const onValueChange = useCallback(
    (val: any, filterField: FieldMeta) => {
      switch (filterField.type) {
        case BusinessFieldType.STRING:
        case BusinessFieldType.SINGLE_OPTION:
        case BusinessFieldType.OBJECT_ID:
          onValueChangeFunc(val, filterField, '$in');
          break;
        default:
          onValueChangeFunc(val, filterField, '$eq');
          break;
      }
    },
    [tagValue],
  );

  const onValueChangeFunc = useCallback(
    (val, filterField, op) => {
      const idx =
        tagValue &&
        tagValue.findIndex(field => field.source === filterField.key);
      const unSelectValues =
        tagValue && tagValue.filter(field => field.source !== filterField.key);
      let tagValues = tagValue;
      const fieldItem: Partial<ICompareOperation> = {
        source: filterField.key,
        op: op as CompareOP,
        target: val,
      };
      if (val || val === 0) {
        if ((idx || idx === 0) && idx > -1) {
          tagValues = update(unSelectValues, {
            [idx]: { $set: fieldItem },
          });
          setTagValue(tagValues);
        } else {
          tagValues = update(unSelectValues, { $push: [fieldItem] });
          setTagValue(tagValues);
        }
      } else if (!val && (idx || idx === 0) && idx > -1) {
        tagValues = update(unSelectValues, { $splice: [[idx, 1]] });
        setTagValue(tagValues);
      }
      onChange && onChange(tagValues as Partial<ICompareOperation>[]);
    },
    [tagValue],
  );

  const cencel = useCallback(() => {
    setFilterEditVisible(false);
  }, []);

  useEffect(() => {
    setTagValue(value);
  }, [value]);

  // 子组件
  const filterContainer = useMemo(() => {
    return (
      <Container
        filterFieldMetas={filterFieldMetas}
        value={tagValue}
        title={title || localeData.lang.filter['defaultTitle']}
        filterFieldService={filterFieldService}
        onChange={(filterItem: Partial<ICompareOperation>[]) =>
          save(filterItem)
        }
        onCancel={cencel}
      />
    );
  }, [filterFieldMetas, tagValue, filterFieldService]);

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
