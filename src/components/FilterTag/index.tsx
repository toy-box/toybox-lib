import React, { FC, useContext, useMemo } from 'react';
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

export interface FilterData {
  title: string;
  key: string;
  op: CompareOP;
  labelValue: LabelValueType;
}
export interface FilterTagProps extends TagProps {
  filter: FilterData;
  ellipsis?: boolean;
}

const FilterTag: FC<FilterTagProps> = ({
  filter,
  ellipsis,
  style,
  ...tagProps
}) => {
  const antLocale = useContext(LocaleContext);
  const locale = useMemo(
    () => (antLocale && antLocale.locale ? antLocale.locale : 'zh_CN'),
    [antLocale],
  );
  const localeData = useMemo(() => localeMap[locale || 'zh_CN'], [locale]);
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
  const { title, op, labelValue } = filter;

  const styleMixs = useMemo(
    () => ({
      ...style,
      ...ellipsisStyle,
    }),
    [ellipsisStyle, style],
  );

  const labelValues = useMemo(() => {
    return Array.isArray(labelValue)
      ? labelValue.map(lv => lv.label)
      : [labelValue?.value];
  }, [labelValue]);

  const text = useMemo(
    () =>
      `${title} ${get(
        localeData.lang,
        `compareOperation.${op}`,
      )} ${labelValues.join(',')}`,
    [title, op, labelValue],
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
