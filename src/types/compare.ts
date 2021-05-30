import { ReactNode } from 'react';
import { FieldMeta } from './interface';
import { LogicOP, ICompareOperation } from './filter';

export enum BusinessFieldTypeWild {
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
  DOCUMENT = 'document',
  PERCENT = 'percent',
  OBJECT = 'object',
  SEARCH_ICON = 'searchIcon',
}

export interface IUncheckLogicFilter {
  logic: LogicOP;
  compares: Partial<ICompareOperation>[];
}

export interface OptionValueType {
  label: ReactNode;
  title?: string;
  value: string | number;
  disabled?: boolean;
}

export interface SimpleNode {
  id: string | number;
  pId: string | number;
  title: ReactNode;
  value: string | number;
  disabled?: boolean;
}

export interface FieldService extends FieldMeta {
  findOptions: (key: string, name: string) => Promise<OptionValueType[]>;
  findOfValues: (
    key: string,
    value: (string | number)[],
  ) => Promise<OptionValueType[]>;
  findDataTrees: (
    key: string,
    parentId: string | number,
  ) => Promise<SimpleNode[]>;
}
