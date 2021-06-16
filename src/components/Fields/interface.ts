import { ReactText } from 'react';
import { default as FieldDate, FieldDateProps } from './Date';
import { default as FieldString, FieldStringProps } from './String';
import { default as FieldText } from './Text';
import { default as FieldNumber } from './Number';
import { default as FieldSelect, FieldSelectProps } from './Select';
import { default as FieldRate } from './Rate';
import { default as FieldCheckGroup, FieldCheckGroupProps } from './CheckGroup';
import { default as FieldPercent } from './Percent';
import { default as FieldBoolean, FieldBooleanProps } from './Boolean';
import {
  default as FieldBusinessObject,
  FieldBusinessObjectProps,
} from './BusinessObject';
import { FieldMeta, OptionItem } from '../../types/interface';
import { FieldTreeSelectProps } from './TreeSelect';

type Component<P> =
  | React.ComponentType<P>
  | React.ForwardRefExoticComponent<P>
  | React.FC<P>
  | keyof React.ReactHTML;

export type CustomizeComponent = Component<any>;

export declare type FieldMode = 'read' | 'edit' | 'update';
export interface BaseFieldProps {
  field: FieldMeta;
  mode: FieldMode;
  disabled?: boolean;
  value?: any;
  onClick?: () => void;
  onChange?: (...args: any) => void;
}

export declare type FieldProps =
  | BaseFieldProps
  | FieldStringProps
  | FieldDateProps
  | FieldBusinessObjectProps
  | FieldBooleanProps
  | FieldCheckGroupProps
  | FieldSelectProps
  | FieldTreeSelectProps;

// export interface FieldProps {
//   field: FieldMeta;
//   mode: FieldMode;
//   fieldProps?: any;
//   disabled?: boolean;
//   value?: any;
//   onClick?: () => void;
//   onChange?: (...args: any) => void;
//   remote?: (key: string, params?: any) => Promise<OptionItem[]>;
//   remoteByValue?: (
//     value: ReactText | ReactText[],
//     params?: any,
//   ) => Promise<OptionItem>;
// }

export type FieldMap = Record<
  string,
  React.FC<FieldProps> | React.ForwardRefExoticComponent<FieldProps & any>
>;

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
  // businessObject: FieldBusinessObject,
};
