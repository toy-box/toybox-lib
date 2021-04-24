import { FC } from 'react';
import { DateColumn } from './DateColumn';
import { ObjectColumn } from './ObjectColumn';
import { DefaultColumn } from './DefaultColumn';
import { BooleanColumn } from './BooleanColumn';
import { SingleOptionColumn } from './SingleOptionColumn';
import { ColumnFCProps } from '../interface';

export const DefaultColumnRenderMap: Record<string, FC<ColumnFCProps>> = {
  businessObject: ObjectColumn,
  date: DateColumn,
  datetime: DateColumn,
  document: ObjectColumn,
  object: ObjectColumn,
  singleOption: SingleOptionColumn,
  boolean: BooleanColumn,
  string: DefaultColumn,
  number: DefaultColumn,
};
