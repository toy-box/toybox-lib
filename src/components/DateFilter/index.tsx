import React, { CSSProperties, FC } from 'react';
import { Select } from 'antd';
import locales from './locales';
import { DateFilterValueType } from './interface';
import { optionGroups } from './config';

const { Option, OptGroup } = Select;

export interface DateFilterProps<T> {
  value?: T;
  onChange?: (value: T, text?: string) => void;
  style?: CSSProperties;
  className?: string;
  placeholder?: string;
  localeName?: string;
}

const DateFilter: FC<DateFilterProps<DateFilterValueType>> = ({
  value,
  onChange,
  style,
  className,
  placeholder,
  localeName = 'zhCN',
}) => {
  const getText = (labelValue: string) => {
    const text = locales[localeName].lang[labelValue];
    return text || labelValue;
  };

  return (
    <Select
      value={value}
      onChange={value => onChange && onChange(value, getText(value))}
      style={style}
      className={className}
      placeholder={placeholder || getText('placeholder')}
    >
      {optionGroups.map(optGroup => (
        <OptGroup label={getText(optGroup.group)}>
          {optGroup.options.map(opt => (
            <Option value={opt.labelValue}>{getText(opt.labelValue)}</Option>
          ))}
        </OptGroup>
      ))}
    </Select>
  );
};

export default DateFilter;
