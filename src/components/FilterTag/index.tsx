import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { Tag, TagProps, Tooltip } from 'antd';
import get from 'lodash.get';
import LocaleContext from 'antd/lib/locale-provider/context';
import localeMap from './locale';
import { CompareOP } from '../../types/compare';
export interface LabelValue {
  value: any;
  label: string;
}

export declare type LabelValueType = LabelValue | LabelValue[];

export declare type BasicValueType = string | number | Date;

export declare type RangeValueType = [number | Date, number | Date];

export interface FilterData {
  title: string;
  key: string;
  op: CompareOP;
  value: BasicValueType | BasicValueType[] | RangeValueType;
  labelValue?: LabelValueType;
}
export interface FilterTagProps extends TagProps {
  filter: FilterData;
  ellipsis?: boolean;
  remote?: (value: BasicValueType[]) => Promise<(string | number)[]>;
}

const FilterTag: FC<FilterTagProps> = ({
  filter,
  ellipsis,
  style,
  remote,
  ...tagProps
}) => {
  const { title, op } = filter;
  const antLocale = useContext(LocaleContext);
  const locale = useMemo(
    () => (antLocale && antLocale.locale ? antLocale.locale : 'zh_CN'),
    [antLocale],
  );
  const localeData = useMemo(() => localeMap[locale || 'zh_CN'], [locale]);
  const [labelValues, setLabelValues] = useState<(string | number)[]>([]);

  useEffect(() => {
    if (remote) {
      remote(Array.isArray(filter.value) ? filter.value : [filter.value]).then(
        data => {
          setLabelValues(data);
        },
      );
    } else {
      setLabelValues(
        Array.isArray(filter.labelValue)
          ? filter.labelValue.map(lv => lv.label)
          : filter.labelValue
          ? [filter.labelValue.label]
          : [],
      );
    }
  }, [remote, filter.labelValue]);

  const ellipsisStyle = useMemo(
    () =>
      ellipsis
        ? {
            whiteSpaces: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }
        : {},
    [ellipsis],
  );
  const styleMixs = useMemo(
    () => ({
      ...style,
      ...ellipsisStyle,
    }),
    [ellipsisStyle, style],
  );

  const text = useMemo(
    () =>
      `${title} ${get(
        localeData.lang,
        `compareOperation.${op}`,
      )} ${labelValues.join(',')}`,
    [title, op, labelValues],
  );

  const content = useMemo(() => {
    return ellipsis ? (
      <Tooltip title={text} placement="topLeft">
        {text}
      </Tooltip>
    ) : (
      text
    );
  }, [ellipsis, text]);

  return (
    <Tag style={styleMixs} {...tagProps}>
      {content}
    </Tag>
  );
};

export default FilterTag;
