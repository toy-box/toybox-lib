import React, { FC, useMemo, useCallback, useState } from 'react';
import FilterTag, { BasicValueType } from '../FilterTag/index';
import { ICompareOperation } from '../../types/compare';
import { FieldMeta } from '@/types/interface';

export interface FilterMetaTag {
  fieldMeta: FieldMeta;
  ellipsis?: boolean;
  width?: string;
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

  const width = useCallback(
    tag => {
      const meta = filterFieldTags?.find(val => val.fieldMeta.key === tag.key);
      return (meta && meta.width) || '100px';
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

  const filterTags = useMemo(() => {
    let tags: any[] = [];
    filterFieldTags.forEach(tag => {
      const { fieldMeta } = tag;
      const meta = value?.filter(val => val.source === fieldMeta.key);
      if (meta) {
        meta.forEach(met => {
          tags.push({
            title: fieldMeta.name,
            key: met.source,
            op: met.op,
            value: met.target,
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
    return tags;
  }, [filterFieldTags, value]);

  return (
    <div className="filter-tags">
      {filterTags.map((tag, idx) => (
        <FilterTag
          key={idx}
          style={{ width: width(tag) }}
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
