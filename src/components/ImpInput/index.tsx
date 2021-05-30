import React, { FC, useState, useRef } from 'react';
import { Input } from 'antd';
import classNames from 'classnames';
import { InputProps } from 'antd/lib/input';

import './style.less';

export type ImpInputProps = {
  onSave?: (value: string | number | readonly string[] | undefined) => void;
  inputClassName?: string;
} & InputProps;

const ImpInput: FC<ImpInputProps> = ({
  value,
  onSave,
  onPressEnter,
  onChange,
  onBlur,
  disabled,
  inputClassName,
  ...other
}) => {
  const inputRef = useRef<Input | null>(null);
  const [active, setActive] = useState(false);
  const [innerValue, setInnerValue] = useState(value);

  const activeHandle = () => {
    if (disabled) {
      return;
    }
    setActive(true);
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  const onPressEnterHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setActive(false);
    if (onPressEnter != null && typeof onPressEnter === 'function') {
      onPressEnter(e);
    }
    onSave && onSave(innerValue);
  };

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInnerValue(e.target.value);
    if (onChange != null && typeof onChange === 'function') {
      onChange(e);
    }
  };

  const onBlurHandle = (e: React.FocusEvent<HTMLInputElement>) => {
    setActive(false);
    if (onBlur != null && typeof onBlur === 'function') {
      onBlur(e);
    }
    setInnerValue(value);
  };

  return (
    <div className="tbox-imp-input">
      {active ? (
        <Input
          ref={inputRef}
          className={inputClassName}
          onBlur={onBlurHandle}
          onPressEnter={onPressEnterHandle}
          onChange={onChangeHandle}
          value={innerValue}
          {...other}
        />
      ) : (
        <div
          className={classNames('tbox-imp-input__text', { disabled })}
          onClick={activeHandle}
        >
          {value}
        </div>
      )}
    </div>
  );
};

export default ImpInput;
