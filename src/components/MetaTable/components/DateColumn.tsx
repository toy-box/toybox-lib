import React, { FC, useMemo } from 'react';
import dayjs from 'dayjs';
import { ColumnFCProps } from '../interface';
import Fields from '../../Fields';
import { useColumnLink } from '../hooks';

export interface DataColumnProps extends ColumnFCProps {
  text?: string | Date | number;
}

export const DateColumn: FC<DataColumnProps> = ({
  text,
  record,
  columnMeta,
}) => {
  const { align, component, fixed, link, ...field } = columnMeta;
  const linkHandle = useColumnLink(record, link);

  const value = useMemo(() => {
    if (text == null) {
      return null;
    }
    return dayjs(text);
  }, [text]);

  return (
    <Fields.FieldDate
      field={field}
      onClick={linkHandle}
      value={value}
      mode="read"
    />
  );
};
