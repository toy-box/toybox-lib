import React, { FC } from 'react';
import Fields from '../../Fields';
import { useColumnLink } from '../hooks';
import { ColumnFCProps } from '../interface';

interface BooleanColumnProps extends ColumnFCProps {
  text: boolean;
}

export const BooleanColumn: FC<BooleanColumnProps> = ({ text, record, columnMeta }) => {
  const { align, component, fixed, link, ...field } = columnMeta;
  const linkHandle = useColumnLink(record, link);
  return <Fields.FieldBoolean field={field} onClick={linkHandle} value={text} mode="read" />
}
