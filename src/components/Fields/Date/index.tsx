import React, {
  Ref,
  ForwardRefRenderFunction,
  useCallback,
  useMemo,
} from 'react';
import dayjs, { Dayjs } from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { DatePickerProps } from 'antd/lib/date-picker';
import DatePicker from '../../DatePicker';
import { FieldProps } from '../interface';
import { parseValueToMoment } from '../../../utils';

dayjs.extend(LocalizedFormat);

export interface FieldDateProps extends FieldProps {
  placeholder?: string;
  format?: string;
  showTime?: boolean;
  picker?: DatePickerProps['picker'];
  onChange?: (date: string) => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  value?: Date | number | string;
  defaultValue?: Date | number | string;
  bordered?: boolean;
}

const defaultFormat = 'YYYY-MM-DD';

const FieldDate: ForwardRefRenderFunction<any, FieldDateProps> = (
  {
    disabled,
    value,
    defaultValue,
    placeholder,
    mode,
    format = defaultFormat,
    fieldProps,
    picker,
    open,
    bordered,
    showTime,
    onChange,
    onClick,
    onOpenChange,
  },
  ref: Ref<any>,
) => {
  const innerOnChange = useCallback(
    (date: Dayjs) => {
      onChange && onChange(date.format(format));
    },
    [format, onChange],
  );

  const innerValue = useMemo(() => parseValueToMoment(value, format), [
    format,
    value,
  ]);

  const text = useMemo(() => dayjs(value).format(format), [value, format]);

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
        onOpenChange={onOpenChange}
        showTime={showTime}
        {...fieldProps}
      />
    );
  }
  return null;
};

export default React.forwardRef(FieldDate);
