import React, { ForwardRefRenderFunction, useMemo, useRef, useImperativeHandle, Ref } from 'react';
import { Switch } from 'antd';
import { FieldProps } from '../interface';


export type FieldBooleanProps = FieldProps & {
  value?: boolean;
  textValues?: [string, string];
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
}

const FieldBoolean: ForwardRefRenderFunction<any, FieldBooleanProps> = ({ onChange, value, textValues, defaultValue, mode, fieldProps, onClick }, ref: Ref<any>) => {
  const inputRef = useRef();
  useImperativeHandle(
    ref,
    () => ({
      ...(inputRef.current || {}),
    }),
    [],
  );
  const innerTextValues = useMemo(() => {
    return textValues ? textValues : ['否', '是'];
  }, [textValues]);
  const textValue = useMemo(() => {
    if (value === true) {
      return innerTextValues[1]
    } else if (value === false) {
      return innerTextValues[0]
    }
    return null
  }, [innerTextValues, value]);
  switch(mode) {
    case 'read':
      return <div onClick={onClick}>{textValue}</div>;
    case 'edit':
    case 'update':
      return <Switch
        ref={inputRef}
        onChange={onChange}
        checkedChildren={innerTextValues[1]}
        unCheckedChildren={innerTextValues[0]}
        checked={value}
        defaultChecked={defaultValue}
        {...fieldProps}
      />
    default:
      return null;
  }
}

export default React.forwardRef(FieldBoolean);
