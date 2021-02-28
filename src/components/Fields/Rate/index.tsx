import { Rate, RateProps } from 'antd';
import React, {
  useRef,
  useImperativeHandle,
  Ref,
  ForwardRefRenderFunction,
} from 'react';

import { BaseFieldProps } from '../interface';

export interface FieldRateProps
  extends Omit<BaseFieldProps, 'value' | 'onChange'>,
    RateProps {}

const FieldRate: ForwardRefRenderFunction<any, FieldRateProps> = (
  { mode, value, defaultValue, fieldProps, disabled, style, onChange, onClick },
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
      <Rate
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        ref={inputRef}
        disabled={disabled}
        style={Object.assign({ width: '100%' }, style)}
        {...fieldProps}
      />
    );
  }
  return null;
};

export default React.forwardRef(FieldRate);
