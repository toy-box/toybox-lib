import React, {
  useMemo,
  useImperativeHandle,
  ForwardRefRenderFunction,
  useRef,
  useCallback,
} from 'react';
import dayjs, { Dayjs } from 'dayjs';
import DatePicker from '../DatePicker';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';

export type DatePickerProProps = PickerProps<Dayjs> & {
  value?: Dayjs | string;
  defaultValue?: Dayjs | string;
  defaultPickerValue?: Dayjs | string;
  stringValue?: boolean;
  onChange?: (date: Dayjs | string | null, dateString: string) => void;
};

const DatePickerPro: ForwardRefRenderFunction<any, DatePickerProProps> = (
  { value, defaultValue, defaultPickerValue, stringValue, onChange, ...props },
  ref,
) => {
  const inputRef = useRef<any>();
  const innerValue = useMemo(() => {
    return value != null ? dayjs(value) : undefined;
  }, [value]);
  const innerDefaultValue = useMemo(() => {
    return defaultValue != null ? dayjs(defaultValue) : undefined;
  }, [defaultValue]);
  const innerDefaultPickerValue = useMemo(() => {
    return defaultPickerValue != null ? dayjs(defaultPickerValue) : undefined;
  }, [defaultPickerValue]);

  const handleChange = useCallback(
    (date: Dayjs | null, dateString: string) => {
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
