import { InputNumber, InputNumberProps } from 'antd';
import React, {
  useRef,
  useImperativeHandle,
  Ref,
  ForwardRefRenderFunction,
} from 'react';

import { BaseFieldProps } from '../interface';

export type FieldNumberProps = Omit<
  BaseFieldProps,
  'value' | 'onChange' | 'onClick'
> &
  Omit<InputNumberProps, 'defaultValue' | 'min' | 'max'>;

const FieldNumber: ForwardRefRenderFunction<any, FieldNumberProps> = (
  { mode, value, style, onChange, onClick, field, ...otherProps },
  ref: Ref<any>,
) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useImperativeHandle(
    ref,
    () => ({
      ...(inputRef.current || {}),
    }),
    [],
  );

  if (mode === 'read') {
    const dom = value || '-';
    return <span onClick={onClick}>{dom}</span>;
  }

  if (mode === 'edit' || mode === 'update') {
    return (
      <InputNumber
        ref={inputRef}
        value={value}
        onChange={onChange}
        defaultValue={field.defaultValue}
        style={{ ...style, width: '100%' }}
        precision={field.precision}
        min={field.minimum}
        max={field.maximum}
        {...otherProps}
      />
    );
  }
  return null;
};

export default React.forwardRef(FieldNumber);
