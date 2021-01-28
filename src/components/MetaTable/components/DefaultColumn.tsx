import React, { FC } from 'react';
import { ColumnFCProps } from '../interface';
import { useColumnLink } from '../hooks';

export type DefaultColumnProps = ColumnFCProps;

export const DefaultColumn: FC<DefaultColumnProps> = ({ text, record, columnMeta }) => {
  const { link } = columnMeta;
  const linkHandle = useColumnLink(record, link);
  if (columnMeta.link) {
    return <div className="tbox-column-link" onClick={linkHandle}>{text}</div>;
  }
  return <React.Fragment>{text}</React.Fragment>;
}