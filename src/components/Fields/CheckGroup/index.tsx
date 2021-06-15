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
  defaultValue?: ReactText[];
  onChange?: (value: CheckboxValueType[]) => void;
}

const FieldCheckGroup: ForwardRefRenderFunction<any, FieldCheckGroupProps> = (
  { field, mode, value, defaultValue, fieldProps, disabled, onChange },
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
  const options = useMemo(() => field.enum || [], [field.enum]);
  const text = useMemo(() => {
    return options
      .filter(opt => value.some(v => v === opt.value))
      .map(opt => opt.label)
      .join(', ');
  }, [options, value]);
  if (mode === 'edit' || mode === 'update') {
    const { span } = fieldProps;
    if (Number.isSafeInteger(span)) {
      <Checkbox.Group>
        <Row>
          {options.map((opt, idx) => (
            <Col key={idx} span={span}>
              <Checkbox value={opt.value}>{opt.label}</Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>;
    }
    return (
      <Checkbox.Group
        disabled={disabled}
        defaultValue={defaultValue}
        options={field.enum}
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
