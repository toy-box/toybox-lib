import { Input, InputProps } from 'antd';
import React, {
  useRef,
  useImperativeHandle,
  Ref,
  ForwardRefRenderFunction,
  RefObject,
} from 'react';

import { BaseFieldProps } from '../interface';

export declare type FieldStringProps = Omit<
  BaseFieldProps,
  'value' | 'onChange'
> &
  Omit<InputProps, 'onChange'> & {
    onChange: (value: string) => void;
  };

const FieldString: ForwardRefRenderFunction<any, FieldStringProps> = (
  {
    field,
    mode,
    value,
    placeholder,
    disabled,
    onClick,
    onChange,
    ...otherProps
  },
  ref: Ref<any>,
) => {
  const inputRef = useRef<any>();
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
    const { defaultValue } = field;
    return (
      <Input
        ref={inputRef}
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        {...otherProps}
      />
    );
  }
  return null;
};

export default React.forwardRef(FieldString);
