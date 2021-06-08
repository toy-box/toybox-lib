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

export interface PageResult {
  list: Record<string, any>[];
  total: number;
  pageSize?: number;
  current?: number;
}

export interface Pageable {
  pageSize: number;
  current: number;
}

type sorterFun = (prev: any, current: any) => number;
export interface ColumnVisible {
  key: string;
  fixed?: boolean | 'left' | 'right';
  align?: 'left' | 'right' | 'center';
  component?: string;
  width?: number;
  sorter?: boolean | sorterFun;
  sortDirections?: SortOrder[];
  link?: (...args: any) => string;
  visiable?: boolean;
}

export type ColumnMeta = ColumnVisible & FieldMeta;

export type MetaPageMode = 'list' | 'view';

export interface MetaRoute {
  objectKey: string;
  mode: MetaPageMode;
  objectId?: string;
  objectName?: string;
}
