import React, {
  useMemo,
  useImperativeHandle,
  ForwardRefRenderFunction,
  useRef,
  useCallback,
} from 'react';
import moment, { Moment } from 'moment';
import { DatePicker } from 'antd';
import { DatePickerProps } from 'antd/lib/date-picker';

export type DatePickerProProps = DatePickerProps & {
  value?: Moment | string;
  defaultValue?: Moment | string;
  defaultPickerValue?: Moment | string;
  stringValue?: boolean;
  onChange?: (date: Moment | string | null, dateString: string) => void;
};

const DatePickerPro: ForwardRefRenderFunction<any, DatePickerProProps> = (
  { value, defaultValue, defaultPickerValue, stringValue, onChange, ...props },
  ref,
) => {
  const inputRef = useRef<any>();
  const innerValue = useMemo(() => {
    return value != null ? (moment(value) as Moment) : undefined;
  }, [value]);
  const innerDefaultValue = useMemo(() => {
    return defaultValue != null ? (moment(defaultValue) as Moment) : undefined;
  }, [defaultValue]);
  const innerDefaultPickerValue = useMemo(() => {
    return defaultPickerValue != null
      ? (moment(defaultPickerValue) as Moment)
      : undefined;
  }, [defaultPickerValue]);

  const handleChange = useCallback(
    (date: Moment | null, dateString: string) => {
      onChange && onChange(stringValue ? dateString : date, dateString);
    },
    [onChange, stringValue],
  );

  useImperativeHandle(ref, () => ({
    value: innerValue,
    defaultValue: innerDefaultValue,
    defaultPickerValue: innerDefaultPickerValue,
    ...(inputRef.current || {}),
  }));

  return (
    <DatePicker
      ref={inputRef}
      defaultPickerValue={innerDefaultPickerValue}
      defaultValue={innerDefaultValue}
      value={innerValue}
      onChange={handleChange}
      {...props}
    />
  );
};

export default React.forwardRef(DatePickerPro);
