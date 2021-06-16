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
  { mode, value, disabled, style, field, onChange },
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
    return <Rate value={value} disabled style={style} count={field.maximum} />;
  }
  if (mode === 'edit' || mode === 'update') {
    return (
      <Rate
        value={value}
        onChange={onChange}
        defaultValue={field.defaultValue}
        ref={inputRef}
        disabled={disabled}
        style={style}
        count={field.maximum}
      />
    );
  }
  return null;
};

export default React.forwardRef(FieldRate);
