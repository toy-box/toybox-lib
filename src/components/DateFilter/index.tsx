import React, { FC } from 'react';
import { Select } from 'antd';
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver';
import { zhCN } from './locale';
import {
  DateFilterUnitTypeGroup,
  DateFilterValueType,
  DateFilterLocale,
} from './interface';
import { CSSProperties } from 'styled-components';

const { Option, OptGroup } = Select;

const optionGroups: DateFilterUnitTypeGroup[] = [
  {
    group: 'day',
    options: [
      {
        labelValue: 'TODAY',
        value: {
          unit: 'day',
          begin: 0,
          end: 0,
        },
      },
      {
        labelValue: 'YESTODAY',
        value: {
          unit: 'day',
          begin: -1,
          end: -1,
        },
      },
      {
        labelValue: 'TOMORROW',
        value: {
          unit: 'day',
          begin: 1,
          end: 1,
        },
      },
      {
        labelValue: 'LAST_DAYS:7',
        value: {
          unit: 'day',
          begin: -6,
          end: 0,
        },
      },
      {
        labelValue: 'LAST_DAYS:30',
        value: {
          unit: 'day',
          begin: -29,
          end: 0,
        },
      },
      {
        labelValue: 'LAST_DAYS:60',
        value: {
          unit: 'day',
          begin: -59,
          end: 0,
        },
      },
      {
        labelValue: 'LAST_DAYS:90',
        value: {
          unit: 'day',
          begin: -89,
          end: 0,
        },
      },
      {
        labelValue: 'LAST_DAYS:120',
        value: {
          unit: 'day',
          begin: -119,
          end: 0,
        },
      },
      {
        labelValue: 'NEXT_DAYS:7',
        value: {
          unit: 'day',
          begin: 0,
          end: 6,
        },
      },
      {
        labelValue: 'NEXT_DAYS:30',
        value: {
          unit: 'day',
          begin: 0,
          end: 29,
        },
      },
      {
        labelValue: 'NEXT_DAYS:60',
        value: {
          unit: 'day',
          begin: 0,
          end: 59,
        },
      },
      {
        labelValue: 'NEXT_DAYS:90',
        value: {
          unit: 'day',
          begin: 0,
          end: 89,
        },
      },
      {
        labelValue: 'NEXT_DAYS:120',
        value: {
          unit: 'day',
          begin: 0,
          end: 119,
        },
      },
    ],
  },
  {
    group: 'month',
    options: [
      {
        labelValue: 'CURRENT_MONTH',
        value: {
          unit: 'month',
          begin: 0,
          end: 0,
        },
      },
      {
        labelValue: 'LAST_MONTH',
        value: {
          unit: 'month',
          begin: -1,
          end: -1,
        },
      },
      {
        labelValue: 'NEXT_MONTH',
        value: {
          unit: 'month',
          begin: 1,
          end: 1,
        },
      },
      {
        labelValue: 'LAST_MONTHS:2',
        value: {
          unit: 'month',
          begin: -1,
          end: 0,
        },
      },
      {
        labelValue: 'NEXT_MONTHS:2',
        value: {
          unit: 'month',
          begin: 0,
          end: 1,
        },
      },
    ],
  },
];

export interface DateFilterProps<T> {
  value?: T;
  onChange?: (value: T) => void;
  style?: CSSProperties;
  className?: string;
  placeholder?: string;
}

const DateFilter: FC<DateFilterProps<DateFilterValueType>> = ({
  value,
  onChange,
  style,
  className,
  placeholder,
}) => {
  const render = (locale: any) => {
    const getLable = (labelValue: string) => {
      return locale.lang[labelValue];
    };
    return (
      <Select
        value={value}
        onChange={onChange}
        style={style}
        className={className}
        placeholder={placeholder || getLable('placeholder')}
      >
        {optionGroups.map(optGroup => (
          <OptGroup label={getLable(optGroup.group)}>
            {optGroup.options.map(opt => (
              <Option value={opt.labelValue}>{getLable(opt.labelValue)}</Option>
            ))}
          </OptGroup>
        ))}
      </Select>
    );
  };

  return (
    <LocaleReceiver componentName="DateFilter" defaultLocale={zhCN}>
      {render}
    </LocaleReceiver>
  );
};

export default DateFilter;
