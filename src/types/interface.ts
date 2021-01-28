import { ReactText } from 'react';
import { OptionItem } from '../components/Fields/select';
import { FieldType } from '../components/Fields/interface';

export type RowData = Record<string, any>;

export interface BusinessObjectMeta {
  key: string;
  idKey?: string;
  name: string;
  description: string;
  properties: { [key: string]: FieldMeta };
  titleKey: string;
  type?: FieldType;
}

export interface FieldMeta {
  key: string;
  name: string;
  type: string;
  description?: string;
  options?: FieldOption[];
  refObjectId?: string;
  unique?: boolean;
  required?: boolean;
  maximum?: number;
  minimum?: number;
  exclusiveMaximum?: number;
  exclusiveMinimum?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  format?: string;
  idKey?: string;
  titleKey?: string;
  properties?: { [key: string]: FieldMeta };
  index?: number;
  defaultValue?: any;
}

export interface FieldMetaProfile extends FieldMeta {
  disabled?: boolean;
  mode?: 'read' | 'update' | 'edit';
  remote?: (key: string, params?: any) => Promise<OptionItem[]>;
  remoteByValue?: (value: ReactText | ReactText[], params?: any) => Promise<OptionItem>;
}

export interface FieldOption {
  label: string;
  value: string;
}

export type ColumnMeta = {
  component?: string;
  fixed?: boolean;
  align?: 'left' | 'right' | 'center';
  link?: (...args: any) => string | string;
} & FieldMeta

export type MetaPageMode = 'list' | 'view';

export interface MetaRoute {
  objectKey: string;
  mode: MetaPageMode;
  objectId?: string;
  objectName?: string;
}