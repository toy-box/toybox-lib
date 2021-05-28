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

export function getText(labelValue: string, localeName = 'zhCN') {
  const text = locales[localeName].lang[labelValue];
  return text || labelValue;
}

const DateFilter: FC<DateFilterProps<DateFilterValueType>> = ({
  value,
  onChange,
  style,
  className,
  placeholder,
  localeName = 'zhCN',
}) => {
  return (
    <Select
      value={value}
      onChange={value =>
        onChange && onChange(value, getText(value, localeName))
      }
      style={style}
      className={className}
      placeholder={placeholder || getText('placeholder')}
    >
      {optionGroups.map((optGroup, index) => (
        <OptGroup label={getText(optGroup.group)} key={index}>
          {optGroup.options.map((opt, idx) => (
            <Option value={opt.labelValue} key={idx}>
              {getText(opt.labelValue)}
            </Option>
          ))}
        </OptGroup>
      ))}
    </Select>
  );
};

export default DateFilter;
