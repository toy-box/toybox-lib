import React, { FC, useMemo, useCallback, useState } from 'react';
import FilterTag, { BasicValueType } from '../FilterTag/index';
import { FieldMeta, ICompareOperation } from '../../types/compare';

export interface FilterMetaTag extends FieldMeta {
  ellipsis?: boolean;
  width?: string;
  remote?: (
    value: BasicValueType[],
    key: string,
  ) => Promise<(string | number)[]>;
}

export interface FilterTagsProps {
  filterFieldTags: FilterMetaTag[];
  value?: Partial<ICompareOperation>[];
  // remote?: (value: BasicValueType[], key: string) => Promise<(string | number)[]>;
}

const FilterTags: FC<FilterTagsProps> = ({
  filterFieldTags,
  value,
  // remote,
}) => {
  const ellipsis = useCallback(
    tag => {
      const meta = filterFieldTags?.find(val => val.key === tag.key);
      return (meta && meta.ellipsis) || true;
    },
    [filterFieldTags],
  );

  const width = useCallback(
    tag => {
      const meta = filterFieldTags?.find(val => val.key === tag.key);
      return (meta && meta.width) || '100px';
    },
    [filterFieldTags],
  );

  const remote = useCallback(
    tag => {
      const meta = filterFieldTags?.find(val => val.key === tag.key);
      return meta && meta.remote;
    },
    [filterFieldTags],
  );

  const remoteMethod = useCallback(
    async (value, tag) => {
      const meta = filterFieldTags?.find(val => val.key === tag.key);
      if (meta && meta.remote) return meta.remote(value, tag.key);
      return value;
    },
    [filterFieldTags],
  );

  const filterTags = useMemo(() => {
    let tags: any[] = [];
    filterFieldTags.forEach(filed => {
      const meta = value?.filter(val => val.source === filed.key);
      if (meta) {
        meta.forEach(met => {
          tags.push({
            title: filed.name,
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
          remote={remote(tag) ? value => remoteMethod(value, tag) : undefined}
          filter={tag}
          ellipsis={ellipsis(tag)}
        />
      ))}
    </div>
  );
};

export default FilterTags;
