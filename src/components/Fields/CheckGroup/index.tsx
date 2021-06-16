import React, {
  ForwardRefRenderFunction,
  ReactText,
  useMemo,
  useImperativeHandle,
  useRef,
  Ref,
} from 'react';
import { Checkbox, Row, Col } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { BaseFieldProps } from '../interface';

export interface FieldCheckGroupProps extends BaseFieldProps {
  value: ReactText[];
  onChange?: (value: CheckboxValueType[]) => void;
}

const FieldCheckGroup: ForwardRefRenderFunction<any, FieldCheckGroupProps> = (
  { field, mode, value, disabled, onChange },
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
  const options = useMemo(() => field.options || [], [field.options]);
  const text = useMemo(() => {
    return options
      .filter(opt => value.some(v => v === opt.value))
      .map(opt => opt.label)
      .join(', ');
  }, [options, value]);
  if (mode === 'edit' || mode === 'update') {
    return (
      <Checkbox.Group
        disabled={disabled}
        defaultValue={field.defaultValue}
        options={field.options}
        value={value}
        onChange={onChange}
      />
    );
  }
  if (mode === 'read') {
    return <span>{text}</span>;
  }
  return null;
};

export default React.forwardRef(FieldCheckGroup);
