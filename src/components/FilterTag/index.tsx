import React, { FC, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Tag, TagProps, Tooltip } from 'antd';
import { CompareOP } from '../../types/compare';

export interface LabelValue {
  value: any;
  label: string;
}

export declare type LabelValueType = LabelValue | LabelValue[];

export interface FilterTagProps extends TagProps {
  title: string;
  key: string;
  op: CompareOP;
  labelValue: LabelValueType;
  ellipsis?: boolean;
}

const FilterTag: FC<FilterTagProps> = ({
  title,
  op,
  labelValue,
  ellipsis,
  style,
  ...tagProps
}) => {
  const intl = useIntl();
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

  const labelValues = useMemo(() => {
    return Array.isArray(labelValue)
      ? labelValue.map(lv => lv.label)
      : [labelValue?.value];
  }, [labelValue]);

  const text = useMemo(
    () =>
      `${title} ${intl.formatMessage({
        id: `operation.${op}`,
      })} ${labelValues.join(',')}`,
    [intl, title, op, labelValue],
  );

  const content = useMemo(() => {
    return ellipsis ? <Tooltip title={text}>{text}</Tooltip> : text;
  }, [ellipsis]);

  return (
    <Tag style={styleMixs} {...tagProps}>
      {content}
    </Tag>
  );
};
