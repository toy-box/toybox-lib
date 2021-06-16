import React, { FC, useMemo, useCallback, useState } from 'react';
import dayjs from 'dayjs';
import FilterTag from '../FilterTag/index';
import {
  BusinessFieldType,
  CompareOP,
  DateCompareOP,
  FieldMeta,
  ICompareOperation,
} from '../../types';

export interface FilterMetaTag {
  fieldMeta: FieldMeta;
  ellipsis?: boolean;
  maxWidth?: number;
  remote?: (
    key: string,
    value: (string | number)[],
  ) => Promise<(string | number)[]>;
}

export interface FilterTagsProps {
  filterFieldTags: FilterMetaTag[];
  value?: ICompareOperation[];
  remove?: (index: number) => void;
}

const FilterTags: FC<FilterTagsProps> = ({
  filterFieldTags,
  value,
  remove,
}) => {
  const ellipsis = useCallback(
    tag => {
      const meta = filterFieldTags?.find(val => val.fieldMeta.key === tag.key);
      return (meta && meta.ellipsis) || true;
    },
    [filterFieldTags],
  );

  const getMaxWidth = useCallback(
    tag => {
      const meta = filterFieldTags?.find(val => val.fieldMeta.key === tag.key);
      return meta?.maxWidth ? `${meta.maxWidth}px` : '100px';
    },
    [filterFieldTags],
  );

  const remote = useCallback(
    tag => {
      const meta = filterFieldTags?.find(val => val.fieldMeta.key === tag.key);
      return meta && meta.remote;
    },
    [filterFieldTags],
  );

  const remoteMethod = useCallback(
    async (tag, value) => {
      const meta = filterFieldTags?.find(val => val.fieldMeta.key === tag.key);
      if (meta && meta.remote) return meta.remote(tag.key, value);
      return value;
    },
    [filterFieldTags],
  );

  const formatter = (
    type: BusinessFieldType.DATE | BusinessFieldType.DATETIME,
    format?: string,
  ) => {
    return format || type === BusinessFieldType.DATE
      ? 'YYYY/MM/DD'
      : 'YYYY/MM/DD HH:mm';
  };

  const filterTags = useMemo(() => {
    let tags: any[] = [];
    filterFieldTags.forEach(tag => {
      const { fieldMeta } = tag;
      const compares = value?.filter(val => val.source === fieldMeta.key);
      if (compares) {
        compares.forEach(compare => {
          if (
            (fieldMeta.type === BusinessFieldType.DATE ||
              fieldMeta.type === BusinessFieldType.DATETIME) &&
            (compare.op === CompareOP.EQ ||
              compare.op === CompareOP.NE ||
              CompareOP.GT ||
              CompareOP.GTE ||
              CompareOP.LT ||
              CompareOP.LTE ||
              compare.op === DateCompareOP.BETWEEN)
          ) {
            if (compare.op === DateCompareOP.BETWEEN) {
              tags.push({
                title: fieldMeta.name,
                key: compare.source,
                op: compare.op,
                value: [
                  dayjs((compare.target as string[])[0]).format(
                    formatter(fieldMeta.type, fieldMeta.format),
                  ),
                  dayjs((compare.target as string[])[1]).format(
                    formatter(fieldMeta.type, fieldMeta.format),
                  ),
                ],
              });
            } else {
              tags.push({
                title: fieldMeta.name,
                key: compare.source,
                op: compare.op,
                value: dayjs(compare.target as string).format(
                  formatter(fieldMeta.type, fieldMeta.format),
                ),
              });
            }
          } else {
            tags.push({
              title: fieldMeta.name,
              key: compare.source,
              op: compare.op,
              value: compare.target,
              labelValue: [
                {
                  label: compare.target,
                  value: compare.target,
                },
              ],
            });
          }
        });
      }
    });
    return tags;
  }, [filterFieldTags, value]);

  return (
    <div className="filter-tags">
      {filterTags.map((tag, idx) => (
        <FilterTag
          key={idx}
          style={{ maxWidth: getMaxWidth(tag) }}
          remote={remote(tag) ? value => remoteMethod(tag, value) : undefined}
          filter={tag}
          remove={remove ? () => remove(idx) : undefined}
          ellipsis={ellipsis(tag)}
        />
      ))}
    </div>
  );
};

export default FilterTags;
