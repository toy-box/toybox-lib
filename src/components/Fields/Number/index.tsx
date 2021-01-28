import { InputNumber } from 'antd';
import React, { useRef, useImperativeHandle, Ref, ForwardRefRenderFunction } from 'react';

import { FieldProps } from '../interface';

export interface FieldNumberProps extends FieldProps {
  value?: number;
  defaultValue?: number;
  placeholder?: string;
  onChange?: (value: number) => void;
}

const FieldNumber: ForwardRefRenderFunction<any, FieldNumberProps> = ({
  mode,
  value,
  defaultValue,
  placeholder,
  fieldProps,
  disabled,
  onChange,
  onClick
}, ref: Ref<any>) => {
  const inputRef = useRef();
  useImperativeHandle(
    ref,
    () => ({
      ...(inputRef.current || {}),
    }),
    [],
  );

  if (mode === 'read') {
    const dom = value || '-';
    return <span onClick={onClick}>{dom}</span>
  }
  if (mode === 'edit' || mode === 'update') {
    return <InputNumber
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
      placeholder={placeholder}
      ref={inputRef}
      disabled={disabled}
      style={{
        width: '100%',
      }}
      {...fieldProps}
    />
  }
  return null;
}

export default React.forwardRef(FieldNumber);
