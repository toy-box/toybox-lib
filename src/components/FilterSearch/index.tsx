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
  FieldMeta,
  ICompareOperation,
  BusinessFieldType,
  FieldService,
} from '../../types/compare';
import update from 'immutability-helper';
import { FilterValueInput } from '../FilterBuilder/components/FilterValueInput';
import LocaleContext from 'antd/lib/locale-provider/context';
import Container from './components/Container';
import { Filter3Line, ContactsBookLine } from '@airclass/icons';

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
  value?: Partial<ICompareOperation>[];
  filterFieldService?: FieldService;
  title: string;
  // filterLables?: FilterLabel[];
  onChange: (compares: Partial<ICompareOperation>[]) => Promise<void>;
  onCancel?: () => void;
}

const FilterSearch: FC<IFilterSearchProps> = ({
  filterFieldMetas,
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

  const save = useCallback(async (filterItem: Partial<ICompareOperation>[]) => {
    console.log('new compare12121212', filterItem);
    setFilterEditVisible(false);
    const p = filterItem.filter(item => item.op && item.target != null);
    setTagValue(p);
    onChange(p);
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
      console.log(val, filterField, 'filterField');
      if (val !== undefined) {
        const idx =
          tagValue &&
          tagValue.findIndex(field => field.source === filterField.key);
        const unSelectValues =
          tagValue &&
          tagValue.filter(field => field.source !== filterField.key);
        let tagValues = tagValue;
        switch (filterField.type) {
          case BusinessFieldType.STRING:
          case BusinessFieldType.SINGLE_OPTION:
          case BusinessFieldType.OBJECT_ID:
            const filterItem: Partial<ICompareOperation> = {
              source: filterField.key,
              op: '$in' as CompareOP,
              target: val,
            };
            if ((idx || idx === 0) && idx > -1) {
              if (val) {
                tagValues = update(unSelectValues, {
                  [idx]: { $set: filterItem },
                });
                setTagValue(tagValues);
              } else {
                tagValues = update(unSelectValues, { $splice: [[idx, 1]] });
                setTagValue(tagValues);
              }
            } else {
              tagValues = update(unSelectValues, { $push: [filterItem] });
              setTagValue(tagValues);
            }
            break;
          default:
            const fieldItem: Partial<ICompareOperation> = {
              source: filterField.key,
              op: '$eq' as CompareOP,
              target: val,
            };
            if ((idx || idx === 0) && idx > -1) {
              tagValues = update(unSelectValues, {
                [idx]: { $set: fieldItem },
              });
              setTagValue(tagValues);
            } else {
              tagValues = update(unSelectValues, { $push: [fieldItem] });
              setTagValue(tagValues);
            }
            break;
        }
        onChange(tagValues as Partial<ICompareOperation>[]);
      }
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

  const filterLeftFieldMetas = useMemo(() => {
    return filterFieldMetas.filter(
      fieldMeta => !fieldMeta.layout || fieldMeta.layout === 'left',
    );
  }, [filterFieldMetas]);

  const filterRightFieldMetas = useMemo(() => {
    return filterFieldMetas.filter(fieldMeta => fieldMeta.layout === 'right');
  }, [filterFieldMetas]);

  const inputStyle = { width: '198px' };

  return (
    <div className="filter-model">
      <Form layout="inline">
        {filterLeftFieldMetas.map(
          (filterFieldMeta, idx) =>
            filterFieldMeta.unBasic && (
              <Form.Item>
                <FilterValueInput
                  key={idx}
                  value={filterValue(filterFieldMeta)}
                  filterFieldService={filterFieldService}
                  multiple={false}
                  singleMode
                  filterField={filterFieldMeta}
                  onChange={value => onValueChange(value, filterFieldMeta)}
                  style={inputStyle}
                />
              </Form.Item>
            ),
        )}
        <Form.Item>
          <Popover
            overlayClassName="no-padding"
            placement="right"
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
        {filterRightFieldMetas.map(
          (filterFieldMeta, idx) =>
            filterFieldMeta.unBasic && (
              <Form.Item>
                <FilterValueInput
                  key={idx}
                  value={filterValue(filterFieldMeta)}
                  filterFieldService={filterFieldService}
                  multiple={false}
                  singleMode
                  filterField={filterFieldMeta}
                  onChange={value => onValueChange(value, filterFieldMeta)}
                  style={inputStyle}
                />
              </Form.Item>
            ),
        )}
      </Form>
    </div>
  );
};

export default FilterSearch;
