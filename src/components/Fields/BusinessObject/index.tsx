import React, { FC } from 'react';
import { FieldProps } from '../interface';


export type FieldBusinessObjectProps = FieldProps & {
  value?: Record<string, any>;
  titleKey?: string;
}

// TODO: edit 模式需要考虑
const FieldBusinessObject: FC<FieldBusinessObjectProps> = ({ value, titleKey = 'id', onClick }) => {
  return <span onClick={onClick}>{value ? value[titleKey] : null}</span>;
}

export default FieldBusinessObject;
