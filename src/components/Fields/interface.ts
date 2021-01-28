import { ReactText } from 'react';
import { default as FieldDate } from './Date';
import { default as FieldString } from './String';
import { default as FieldText } from './Text';
import { default as FieldNumber } from './Number';
import { default as FieldSelect } from './Select';
import { default as FieldRate } from './Rate';
import { default as FieldCheckGroup } from './CheckGroup';
import { default as FieldPercent } from './Percent';
import { default as FieldBoolean } from './Boolean';
import { default as FieldBusinessObject } from './BusinessObject';
import { FieldMeta } from '../../types/interface';
import { OptionItem } from './select';

export type FieldMode = 'read' | 'edit' | 'update';

export interface FieldProps {
  field: FieldMeta;
  mode: FieldMode;
  fieldProps?: any;
  disabled?: boolean;
  value?: any;
  onClick?: () => void;
  onChange?: (...args: any) => void;
  remote?: (key: string, params?: any) => Promise<OptionItem[]>;
  remoteByValue?: (value: ReactText | ReactText[], params?: any) => Promise<OptionItem>;
}

export type FieldMap = Record<string, React.FC<FieldProps> | React.ForwardRefExoticComponent<FieldProps & any>>;

export enum FieldType {
  INTEGER = 'integer',
  NUMBER = 'number',
  STRING = 'string',
  TEXT = 'text',
  DATE = 'date',
  DATETIME = 'datetime',
  BOOLEAN = 'boolean',
  ARRAY = 'array',
  OBJECT_ID = 'objectId',
  BUSINESS_OBJECT = 'businessObject',
  SINGLE_OPTION = 'singleOption',
  MULTI_OPTION = 'multiOption',
  DOCUMENT = 'document',
}


export const defaultFieldMap: FieldMap = {
  string: FieldString,
  text: FieldText,
  number: FieldNumber,
  date: FieldDate,
  datetime: FieldDate,
  singleOption: FieldSelect,
  boolean: FieldBoolean,
  businessObject: FieldBusinessObject,
};
