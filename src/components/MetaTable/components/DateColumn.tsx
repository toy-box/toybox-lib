import React, { FC, useMemo } from 'react';
import { ColumnFCProps } from '../interface';
import Fields from '../../Fields';
import { useColumnLink } from '../hooks';

export interface DataColumnProps extends ColumnFCProps {
  text: string | Date | number;
}

export const DateColumn: FC<DataColumnProps> = ({ text, record, columnMeta }) => {
  const { align, component, fixed, link, ...field } = columnMeta;
  const linkHandle = useColumnLink(record, link);

  const format = useMemo(() => {
    switch (columnMeta.type) {
      case 'yearMonth':
        return 'YYYY MMMM';
      case 'date':
        return 'LL';
      case 'datetime':
      default:
        return 'LLL';
    }
  }, [columnMeta.type]);
  return <Fields.FieldDate field={field} onClick={linkHandle} value={text} mode="read" format={format} />
}
