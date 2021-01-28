import React, {
  ForwardRefRenderFunction,
  useRef,
  useImperativeHandle,
} from 'react';
import { FieldProps } from '../interface';
import SelectPro, { SelectProProps } from '../../SelectPro';

export interface OptionItem {
  label: React.ReactNode;
  value: React.ReactText;
}

type SelectValue = React.ReactText | React.ReactText[];

export interface FieldSelectProps
  extends Omit<FieldProps, 'onChange' | 'value'>,
    Pick<SelectProProps, 'onChange' | 'value' | 'remote' | 'remoteByValue'> {
  multiple?: boolean;
  value?: SelectValue;
}

const FieldSelect: ForwardRefRenderFunction<any, FieldSelectProps> = (
  {
    mode,
    fieldProps,
    field,
    multiple,
    onClick,
    ...otherProps
  },
  ref,
) => {
  const inputRef = useRef<any>();
  useImperativeHandle(ref, () => ({
    ...(inputRef.current || {}),
  }));

  return (
    <div onClick={onClick}>
      <SelectPro
        ref={inputRef}
        mode={multiple ? 'multiple' : undefined}
        options={field.options}
        {...fieldProps}
        {...otherProps}
        readMode={mode === 'read'}
      />
    </div>
  );
};

export default React.forwardRef(FieldSelect);
