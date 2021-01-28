import React, { FC } from 'react';
import Fields from '../../Fields';
import { ColumnFCProps } from '../interface';
import { useColumnLink } from '../hooks';

interface SingleOptionColumnProps extends ColumnFCProps {
  text: string;
}

export const SingleOptionColumn: FC<SingleOptionColumnProps> = ({ text, record, columnMeta }) => {
  const { align, component, fixed, link, ...field } = columnMeta;
  const linkHandle = useColumnLink(record, columnMeta.link);
  return <Fields.FieldSelect field={field} onClick={linkHandle} value={text} mode="read" />;
}
