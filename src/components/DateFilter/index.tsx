import React, { CSSProperties, FC, useContext, useMemo } from 'react';
import { Select } from 'antd';
import LocaleContext from 'antd/lib/locale-provider/context';
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
  locale?: string;
}

export function getText(labelValue: string, localeName = 'zh_CN') {
  const text = locales[localeName].lang[labelValue];
  return text || labelValue;
}

const DateFilter: FC<DateFilterProps<DateFilterValueType>> = ({
  value,
  onChange,
  style,
  className,
  placeholder,
  locale = 'zh_CN',
}) => {
  const antLocale = useContext(LocaleContext);
  const localeName = useMemo(
    () => (antLocale && antLocale.locale ? antLocale.locale : 'zh_CN'),
    [antLocale],
  );

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
        <OptGroup label={getText(optGroup.group)} key={optGroup.group}>
          {optGroup.options.map((opt, idx) => (
            <Option value={opt.labelValue} key={opt.labelValue}>
              {getText(opt.labelValue)}
            </Option>
          ))}
        </OptGroup>
      ))}
    </Select>
  );
};

export default DateFilter;
