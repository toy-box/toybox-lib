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
import { BusinessFieldType } from '../../../types';

dayjs.extend(LocalizedFormat);

export declare type FieldBasePickerProps = Omit<
  PickerBaseProps<number>,
  'mode' | 'picker' | 'format'
> &
  Omit<BaseFieldProps, 'value' | 'onChange'>;

export declare type FieldTimestampProps = FieldBasePickerProps & {
  picker?: DatePickerProps['picker'];
  dateMode?: PickerBaseProps<number>['mode'];
};

const DateFormat = 'YYYY/MM/DD';
const DatetimeFormat = 'YYYY/MM/DD HH:mm:ss';

const FieldTimestamp: ForwardRefRenderFunction<any, FieldTimestampProps> = (
  {
    disabled,
    value,
    placeholder,
    mode,
    field,
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
  const defaultValue = useMemo(() => dayjs(field.defaultValue), [
    field.defaultValue,
  ]);

  const innerFormat = useMemo(
    () => (field.format ? DateFormat : DatetimeFormat),
    [field.format],
  );

  const innerOnChange = useCallback(
    (date: Dayjs | null, dateString: string = '') => {
      onChange && onChange(date ? dayjs(date).unix() : null, dateString);
    },
    [innerFormat, onChange],
  );

  const innerValue = useMemo(() => (value ? dayjs(value) : undefined), [value]);

  const text = useMemo(() => (value ? dayjs(value).format(innerFormat) : '-'), [
    value,
    innerFormat,
  ]);

  if (mode === 'read') {
    return (
      <span ref={ref} onClick={onClick}>
        {text}
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
        showTime={{ format: 'HH:mm:ss' }}
        onOpenChange={onOpenChange}
      />
    );
  }
  return null;
};

export default React.forwardRef(FieldTimestamp);
