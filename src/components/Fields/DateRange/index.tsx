import React, {
  Ref,
  ForwardRefRenderFunction,
  useCallback,
  useMemo,
} from 'react';
import dayjs, { Dayjs } from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { DatePickerProps } from 'antd/lib/date-picker';
import { RangePickerProps } from 'antd/lib/date-picker/generatePicker';
import DatePicker from '../../DatePicker';
import { BaseFieldProps } from '../interface';
import { parseValueToMoment } from '../../../utils';
import { BusinessFieldType } from '../../../types';

dayjs.extend(LocalizedFormat);

type ISODateString = string;

export declare type FieldDateRangePickerProps = Omit<
  RangePickerProps<ISODateString>,
  'mode' | 'picker' | 'format'
> &
  Omit<BaseFieldProps, 'value' | 'onChange'>;

export declare type FieldDateRangeProps = FieldDateRangePickerProps & {
  picker?: DatePickerProps['picker'];
  dateMode?: RangePickerProps<ISODateString>['mode'];
};

const DateFormat = 'YYYY/MM/DD';
const DatetimeFormat = 'YYYY/MM/DD HH:mm:ss';

const FieldDateRange: ForwardRefRenderFunction<any, FieldDateRangeProps> = (
  {
    disabled,
    value,
    defaultValue,
    placeholder,
    mode,
    field,
    fieldProps,
    picker,
    open,
    bordered,
    onChange,
    onClick,
    onOpenChange,
    dateMode,
  },
  ref: Ref<any>,
) => {
  const showTime = useMemo(() => field.type === BusinessFieldType.DATETIME, [
    field.type,
  ]);

  const innerFormat = useMemo(
    () =>
      field.format || field.type === BusinessFieldType.DATE
        ? DateFormat
        : DatetimeFormat,
    [field.format],
  );

  const innerOnChange = useCallback(
    (values: Dayjs[]) => {
      const dateStrings = [
        values[0]?.format(innerFormat),
        values[1]?.format(innerFormat),
      ] as [string, string];
      const doValues = [
        dayjs(dateStrings[0]).toISOString(),
        dayjs(dateStrings[1]).toISOString(),
      ] as [ISODateString, ISODateString];
      onChange && onChange(doValues, dateStrings);
    },
    [innerFormat, onChange],
  );

  const innerValue = useMemo(
    () =>
      value ? [parseValueToMoment(value[0]), parseValueToMoment(value[1])] : [],
    [innerFormat, value],
  );

  const text = useMemo(() => {
    if (value) {
      return value.map(v => parseValueToMoment(v)).join(' - ');
    }
    return '-';
  }, [value, innerFormat]);

  if (mode === 'read') {
    return (
      <span ref={ref} onClick={onClick}>
        {text}
      </span>
    );
  }
  if (mode === 'edit' || mode === 'update') {
    return (
      <DatePicker.RangePicker
        ref={ref}
        value={innerValue}
        defaultValue={defaultValue}
        bordered={bordered}
        placeholder={placeholder}
        disabled={disabled}
        onChange={innerOnChange}
        picker={picker}
        open={open}
        style={{ width: '100%' }}
        mode={dateMode}
        showTime={showTime ? { format: 'HH:mm' } : false}
        onOpenChange={onOpenChange}
        {...fieldProps}
      />
    );
  }
  return null;
};

export default React.forwardRef(FieldDateRange);
