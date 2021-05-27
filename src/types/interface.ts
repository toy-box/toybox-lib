import { ReactText } from 'react';
import { SortOrder } from 'antd/lib/table/interface';
import {
  OptionData,
  OptionGroupData,
  OptionsType,
} from 'rc-select/lib/interface';
import { IBusinessObjectMeta, IFieldMeta, IFieldOption } from './meta';

export type RowData = Record<string, any>;
export declare type Key = string | number;

export type BusinessObjectMeta = IBusinessObjectMeta;

export type FieldMeta = IFieldMeta;

export interface FieldMetaProfile extends FieldMeta {
  disabled?: boolean;
  mode?: 'read' | 'update' | 'edit';
  remote?: (key: string, params?: any) => Promise<OptionItem[]>;
  remoteByValue?: (
    value: ReactText | ReactText[],
    params?: any,
  ) => Promise<OptionItem[]>;
}

export type FieldOption = IFieldOption;

export type OptionItem = OptionData | OptionGroupData;

export type OptionItemsType = OptionsType;

export type OptionReturnType = OptionsType | OptionData | OptionGroupData;

export type ColumnMeta = {
  component?: string;
  fixed?: boolean;
  align?: 'left' | 'right' | 'center';
  link?: (...args: any) => string | string;
  sorter?: boolean;
  sortDirections?: SortOrder[];
  width?: number;
} & FieldMeta;

export type MetaPageMode = 'list' | 'view';

export interface MetaRoute {
  objectKey: string;
  mode: MetaPageMode;
  objectId?: string;
  objectName?: string;
}
