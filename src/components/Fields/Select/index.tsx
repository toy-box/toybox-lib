import React, {
  ForwardRefRenderFunction,
  useRef,
  useImperativeHandle,
} from 'react';
import { BaseFieldProps } from '../interface';
import SelectPro, { SelectProProps } from '../../SelectPro';

export type SelectValue = React.ReactText | React.ReactText[];

export declare type FieldSelectProps = Omit<
  BaseFieldProps,
  'onChange' | 'value'
> &
  Omit<SelectProProps, 'mode' | 'defaultValue'> & {
    selectMode?: SelectProProps['mode'];
  };

const FieldSelect: ForwardRefRenderFunction<any, FieldSelectProps> = (
  { mode, field, selectMode, onClick, ...otherProps },
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
        mode={selectMode}
        defaultValue={field.defaultValue}
        options={field.options}
        readMode={mode === 'read'}
        {...otherProps}
      />
    </div>
  );
};

export default React.forwardRef(FieldSelect);
