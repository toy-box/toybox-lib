import { DatePicker } from 'antd';
import React, { Ref, ForwardRefRenderFunction, useCallback, useMemo } from 'react';
import moment from 'moment';

import { FieldProps } from '../interface';
import { DatePickerProps } from 'antd/lib/date-picker';
import { parseValueToMoment } from '../../../utils';

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

const FieldDate: ForwardRefRenderFunction<any, FieldDateProps> = ({
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
}, ref: Ref<any>) => {
  const innerOnChange = useCallback((date: moment.Moment) => {
    onChange && onChange(date.format(format));
  }, [format, onChange]);

  const innerValue = useMemo(() => parseValueToMoment(value, format), [format, value]);

  if (mode === 'read') {
    return <span ref={ref} onClick={onClick}>{ value != null ? moment(value).format(format) : '-'}</span>
  }
  if (mode === 'edit' || mode === 'update') {
    return <DatePicker
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
  }
  return null;
}

export default React.forwardRef(FieldDate);
