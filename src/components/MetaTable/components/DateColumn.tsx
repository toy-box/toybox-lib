import React, { FC, useMemo } from 'react';
import dayjs from 'dayjs';
import { ColumnFCProps } from '../interface';
import Fields from '../../Fields';
import { useColumnLink } from '../hooks';

export interface DataColumnProps extends ColumnFCProps {
  text?: string;
}

export const DateColumn: FC<DataColumnProps> = ({
  text,
  record,
  columnMeta,
}) => {
  const { align, component, fixed, link, ...field } = columnMeta;
  const linkHandle = useColumnLink(record, link);

  return (
    <Fields.FieldDate
      field={field}
      onClick={linkHandle}
      value={text}
      mode="read"
    />
  );
};
