import { InputNumber } from 'antd';
import React, {
  useRef,
  useImperativeHandle,
  Fragment,
  Ref,
  ReactNode,
  ForwardRefRenderFunction,
} from 'react';
import { BaseFieldProps } from '../interface';
import {
  getColorByRealValue,
  getSymbolByRealValue,
  getRealTextWithPrecision,
} from './util';

export interface FieldPercentProps extends BaseFieldProps {
  value?: number;
  defaultValue?: number;
  placeholder?: string;
  onChange?: (value: number) => void;
  showColor?: boolean;
  showSymbol?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  precision?: number;
  style?: any;
}

const FieldPercent: ForwardRefRenderFunction<any, FieldPercentProps> = (
  {
    mode,
    value,
    defaultValue,
    placeholder,
    fieldProps,
    disabled,
    onChange,
    onClick,
    showColor = false,
    showSymbol,
    prefix,
    suffix = '%',
    precision,
    style,
  }: FieldPercentProps,
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
    const style = showColor ? { color: getColorByRealValue(value) } : {};
    if (value == null) {
      return (
        <span style={style} onClick={onClick}>
          -
        </span>
      );
    }
    return (
      <span style={style} onClick={onClick}>
        {prefix && <span>{prefix}</span>}
        {showSymbol && <Fragment>{getSymbolByRealValue(value)} </Fragment>}
        {getRealTextWithPrecision(Math.abs(value), precision)}
        {suffix && suffix}
      </span>
    );
  }
  if (mode === 'edit' || mode === 'update') {
    return (
      <InputNumber
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        placeholder={placeholder}
        ref={inputRef}
        disabled={disabled}
        formatter={value => {
          if (value && prefix) {
            return `${prefix} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
          return value;
        }}
        parser={value =>
          value
            ? value.replace(new RegExp(`\\${prefix}\\s?|(,*)`, 'g'), '')
            : ''
        }
        style={Object.assign({ width: '100%' }, style)}
        precision={2}
        {...fieldProps}
      />
    );
  }
  return null;
};

export default React.forwardRef(FieldPercent);
