import React, { FC, useState, useMemo, useCallback, useEffect } from 'react';
import { Form, Tooltip, Popover, Button } from 'antd';
import { CompareOP } from '../../types/compare';
import zhCN from './locale/zh_CN';
import {
  FieldMeta,
  ICompareOperation,
  BusinessFieldType,
  FieldService,
} from '../../types/compare';
import FilterTag from '../FilterTag/index';
import update from 'immutability-helper';
import { FilterValueInput } from '../FilterSearch/components/FilterValueInput';
import Container from './components/Container';

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

export interface IFilterModelProps {
  filterFieldMetas: FieldMeta[];
  value?: Partial<ICompareOperation>[];
  filterFieldServices?: FieldService[];
  title: string;
  // filterLables?: FilterLabel[];
  onChange: (compares: Partial<ICompareOperation>[]) => Promise<void>;
  onCancel?: () => void;
}

const FilterModel: FC<IFilterModelProps> = ({
  filterFieldMetas,
  filterFieldServices,
  value,
  title,
  onChange,
  onCancel,
}) => {
  const [tagValue, setTagValue] = useState(value);
  const [filterEditVisible, setFilterEditVisible] = useState(false);

  const filterTags = useMemo(() => {
    let tags: any[] = [];
    filterFieldMetas.forEach(filed => {
      const meta = tagValue?.filter(val => val.source === filed.key);
      console.log(meta, 'meta');
      if (meta) {
        meta.forEach(met => {
          tags.push({
            title: filed.name,
            key: met.source,
            op: met.op,
            labelValue: [
              {
                label: met.target,
                value: met.target,
              },
            ],
          });
        });
      }
    });
    console.log('tagValue', tagValue, tags);
    return tags;
  }, [filterFieldMetas, tagValue]);

  const ellipsis = useCallback(tag => {
    return true;
  }, []);

  const save = useCallback(async (filterItem: Partial<ICompareOperation>[]) => {
    console.log('new compare12121212', filterItem);
    setTagValue(filterItem);
    setFilterEditVisible(false);
    // onChange(filterItem);
  }, []);

  const onValueChange = useCallback(
    (val: any, filterField: FieldMeta) => {
      console.log(val);
      if (val !== undefined) {
        const idx =
          tagValue &&
          tagValue.findIndex(field => field.source === filterField.key);
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
              if (val)
                return setTagValue(
                  update(tagValue, { [idx]: { $set: filterItem } }),
                );
              return setTagValue(update(tagValue, { $splice: [[idx, 1]] }));
            } else {
              setTagValue(update(tagValue, { $push: [filterItem] }));
            }
            console.log(tagValue, idx);
            break;
          default:
            const fieldItem: Partial<ICompareOperation> = {
              source: filterField.key,
              op: '$eq' as CompareOP,
              target: val,
            };
            if ((idx || idx === 0) && idx > -1) {
              setTagValue(update(tagValue, { [idx]: { $set: fieldItem } }));
            } else {
              setTagValue(update(tagValue, { $push: [fieldItem] }));
            }
            break;
        }
      }
    },
    [tagValue],
  );

  const cencel = useCallback(() => {
    setFilterEditVisible(false);
  }, []);

  // 子组件
  const filterContainer = useMemo(() => {
    return (
      <Container
        filterFieldMetas={filterFieldMetas}
        value={tagValue}
        title={title || '条件过滤(AND)'}
        filterFieldServices={filterFieldServices}
        onChange={(filterItem: Partial<ICompareOperation>[]) =>
          save(filterItem)
        }
        onCancel={cencel}
      />
    );
  }, [filterFieldMetas, tagValue, filterFieldServices]);

  return (
    <div className="filter-model">
      <Form layout="inline">
        {filterFieldMetas.map(
          (filterFieldMeta, idx) =>
            filterFieldMeta.unBasic && (
              <Form.Item>
                <FilterValueInput
                  // value={filterValue}
                  multiple={false}
                  filterField={filterFieldMeta}
                  onChange={value => onValueChange(value, filterFieldMeta)}
                  // style={inputStyle}
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
            <Tooltip placement="top" title={zhCN.lang.filter['tip']}>
              <Button icon={<i className="ri-filter-3-line"></i>} />
            </Tooltip>
          </Popover>
        </Form.Item>
      </Form>
      <div className="filter-mode-tag" style={{ marginTop: '10px' }}>
        {filterTags.map((tag, idx) => (
          <FilterTag
            key={idx}
            style={{ width: '100px' }}
            {...tag}
            ellipsis={ellipsis(tag)}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterModel;
