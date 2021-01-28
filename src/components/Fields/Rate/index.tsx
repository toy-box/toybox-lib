import { Rate } from 'antd';
import React, { useRef, useImperativeHandle, Ref, ForwardRefRenderFunction } from 'react';

import { FieldProps } from '../interface';

export interface FieldRateProps extends FieldProps {
  value?: number;
  defaultValue?: number;
  placeholder?: string;
  onChange?: (value: number) => void;
}

const FieldRate: ForwardRefRenderFunction<any, FieldRateProps> = ({
  mode,
  value,
  defaultValue,
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
    return <Rate
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
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

export default React.forwardRef(FieldRate);