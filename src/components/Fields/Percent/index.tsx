import { InputNumber } from 'antd';
import React, {
  useRef,
  useMemo,
  useCallback,
  useImperativeHandle,
  Fragment,
  Ref,
  ForwardRefRenderFunction,
  CSSProperties,
} from 'react';
import { BaseFieldProps } from '../interface';
import {
  getColorByRealValue,
  getSymbolByRealValue,
  getRealTextWithPrecision,
} from './util';

export interface FieldPercentProps extends BaseFieldProps {
  value?: number;
  placeholder?: string;
  onChange?: (value?: number) => void;
  showColor?: boolean;
  showSymbol?: boolean;
  suffix?: string;
  precision?: number;
  style?: CSSProperties;
}

const FieldPercent: ForwardRefRenderFunction<any, FieldPercentProps> = (
  {
    mode,
    value,
    field,
    placeholder,
    disabled,
    onChange,
    onClick,
    showColor = false,
    showSymbol,
    suffix = '%',
    precision = 2,
    style,
  }: FieldPercentProps,
  ref: Ref<any>,
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const innerValue = useMemo(
    () =>
      value != null
        ? Math.round(value * Math.pow(10, precision + 2)) /
          Math.pow(10, precision)
        : undefined,
    [value],
  );
  const handleChange = useCallback(
    (value?: number) =>
      onChange &&
      onChange(
        value != null
          ? Math.round(Number(value) * Math.pow(10, precision)) /
              Math.pow(10, precision + 2)
          : value,
      ),
    [onChange],
  );

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
        {showSymbol && <Fragment>{getSymbolByRealValue(value)} </Fragment>}
        {getRealTextWithPrecision(Math.abs(value), precision)}
        {suffix}
      </span>
    );
  }
  if (mode === 'edit' || mode === 'update') {
    return (
      <InputNumber
        value={innerValue}
        onChange={handleChange}
        defaultValue={field.defaultValue}
        placeholder={placeholder}
        ref={inputRef}
        disabled={disabled}
        formatter={value => (value != null ? `${value}${suffix}` : undefined)}
        parser={value => {
          if (value != null) {
            return value == suffix
              ? undefined
              : Number(value.replace(suffix, ''));
          }
          return undefined;
        }}
        style={{ ...style, width: '100%' }}
        precision={precision}
      />
    );
  }
  return null;
};

export default React.forwardRef(FieldPercent);
