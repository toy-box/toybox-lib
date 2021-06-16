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

type ISODateString = string;

export declare type FieldBasePickerProps = Omit<
  PickerBaseProps<ISODateString>,
  'mode' | 'picker' | 'format'
> &
  Omit<BaseFieldProps, 'value' | 'onChange'>;

export declare type FieldDateProps = FieldBasePickerProps & {
  picker?: DatePickerProps['picker'];
  dateMode?: PickerBaseProps<ISODateString>['mode'];
};

const DateFormat = 'YYYY/MM/DD';
const DatetimeFormat = 'YYYY/MM/DD HH:mm:ss';

const FieldDate: ForwardRefRenderFunction<any, FieldDateProps> = (
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
  const showTime = useMemo(() => field.type === BusinessFieldType.DATETIME, [
    field.type,
  ]);

  const defaultValue = useMemo(() => dayjs(field.defaultValue), [
    field.defaultValue,
  ]);

  const innerFormat = useMemo(
    () =>
      field.format || field.type === BusinessFieldType.DATE
        ? DateFormat
        : DatetimeFormat,
    [field.format],
  );

  const innerOnChange = useCallback(
    (date: Dayjs | null, dateString: string = '') => {
      onChange &&
        onChange(date ? dayjs(dateString).toISOString() : null, dateString);
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
        showTime={showTime ? { format: 'HH:mm:ss' } : false}
        onOpenChange={onOpenChange}
      />
    );
  }
  return null;
};

export default React.forwardRef(FieldDate);
