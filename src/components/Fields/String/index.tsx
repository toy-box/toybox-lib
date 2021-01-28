import { Input } from 'antd';
import React, { useRef, useImperativeHandle, Ref, ForwardRefRenderFunction } from 'react';

import { FieldProps } from '../interface';

export interface FieldStringProps extends FieldProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const FieldString: ForwardRefRenderFunction<any, FieldStringProps> = ({
  field,
  mode,
  value,
  placeholder,
  fieldProps,
  disabled,
  onClick,
  onChange,
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
    const { defaultValue } = field;
    return <Input
      ref={inputRef}
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
      placeholder={placeholder}
      disabled={disabled}
      {...fieldProps}
    />
  }
  return null;
}

export default React.forwardRef(FieldString);
