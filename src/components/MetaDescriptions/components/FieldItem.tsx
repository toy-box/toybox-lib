import React, { FC, useMemo } from 'react';
import { FieldProps } from '../../Fields/interface';

export type FieldMap = Record<string, React.FC<FieldProps> | React.ForwardRefExoticComponent<FieldProps & any>>;

export type FieldItemProps = FieldProps & {
  fieldMap: FieldMap;
  component?: string;
}

export const FieldItem: FC<FieldItemProps> = ({ field, fieldMap, mode = 'read', value, component, ...other }) => {
  const fieldItem = useMemo(() => {
    const FieldComponent = fieldMap[component || field.type];
    return FieldComponent != null ? <FieldComponent field={field} mode={mode} value={value} {...other} /> : null;
  }, [component, fieldMap, mode, other, value, field]);
  return fieldItem;
}
