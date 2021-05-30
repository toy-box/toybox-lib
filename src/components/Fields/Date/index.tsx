import React, {
  Ref,
  ForwardRefRenderFunction,
  useCallback,
  useMemo,
} from 'react';
import dayjs, { Dayjs } from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { DatePickerProps } from 'antd/lib/date-picker';
import { PickerBaseProps } from 'antd/lib/date-picker/generatePicker';
import DatePicker from '../../DatePicker';
import { BaseFieldProps } from '../interface';
import { parseValueToMoment } from '../../../utils';
import { BusinessFieldType } from '../../../types';

dayjs.extend(LocalizedFormat);

export declare type FieldBasePickerProps = Omit<
  PickerBaseProps<Dayjs>,
  'mode' | 'picker'
> &
  Omit<BaseFieldProps, 'value' | 'onChange'>;

export declare type FieldDateProps = FieldBasePickerProps & {
  picker?: DatePickerProps['picker'];
  dateMode?: PickerBaseProps<Dayjs>['mode'];
};

const defaultFormat = 'YYYY/MM/DD';

const FieldDate: ForwardRefRenderFunction<any, FieldDateProps> = (
  {
    disabled,
    value,
    defaultValue,
    placeholder,
    mode,
    field,
    format = defaultFormat,
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
  const innerOnChange = useCallback(
    (date: Dayjs) => {
      onChange &&
        onChange(
          date,
          typeof format === 'function'
            ? format(date)
            : date?.format(format as string),
        );
    },
    [format, onChange],
  );

  const formatFn = useCallback(
    (date: string | number | Date | dayjs.Dayjs | null | undefined) => {
      if (typeof format === 'function') {
        return date != null ? format(dayjs(date)) : undefined;
      }
      return date != null ? dayjs(date).format(format as string) : undefined;
    },
    [format],
  );

  const innerValue = useMemo(
    () =>
      typeof format === 'string'
        ? parseValueToMoment(value, format)
        : parseValueToMoment(value),
    [format, value],
  );

  const text = useMemo(() => formatFn(value), [value, format]);

  if (mode === 'read') {
    return (
      <span ref={ref} onClick={onClick}>
        {value != null ? text : '-'}
      </span>
    );
  }
  if (mode === 'edit' || mode === 'update') {
    return (
      <DatePicker
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

export default React.forwardRef(FieldDate);
