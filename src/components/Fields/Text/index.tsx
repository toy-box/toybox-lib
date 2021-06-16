import React, { useCallback, useRef, useImperativeHandle, Ref } from 'react';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input';

import { BaseFieldProps } from '../interface';

export declare type FieldTextProps = Omit<
  BaseFieldProps,
  'value' | 'onChange'
> &
  Omit<TextAreaProps, 'onChange' | 'defaultValue'> & {
    onChange?: (value: string) => void;
  };

const FieldString = (
  {
    mode,
    value,
    field,
    onChange,
    placeholder,
    disabled,
    onClick,
    ...otherProps
  }: FieldTextProps,
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
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      onChange && onChange(e.target.value),
    [onChange],
  );

  if (mode === 'read') {
    const dom = value || '-';
    return <div onClick={onClick}>{dom}</div>;
  }
  if (mode === 'edit' || mode === 'update') {
    return (
      <Input.TextArea
        ref={inputRef}
        defaultValue={field.defaultValue}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        {...otherProps}
      />
    );
  }
  return null;
};

export default React.forwardRef(FieldString);
