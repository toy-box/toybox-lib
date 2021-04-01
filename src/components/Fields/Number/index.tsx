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
  InputNumberProps;

const FieldNumber: ForwardRefRenderFunction<any, FieldNumberProps> = (
  { mode, value, style, onChange, onClick, ...otherProps },
  ref: Ref<any>,
) => {
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
    return <span onClick={onClick}>{dom}</span>;
  }
  if (mode === 'edit' || mode === 'update') {
    return (
      <InputNumber
        ref={inputRef}
        value={value}
        onChange={onChange}
        style={Object.assign({ width: '100%' }, style)}
        {...otherProps}
      />
    );
  }
  return null;
};

export default React.forwardRef(FieldNumber);