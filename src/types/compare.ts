import { ReactNode } from 'react';
import { FieldMeta } from './interface';

export enum CompareOP {
  EQ = '$eq',
  GT = '$gt',
  GTE = '$gte',
  IN = '$in',
  LT = '$lt',
  LTE = '$lte',
  NE = '$ne',
  NIN = '$nin',
}

export interface FieldOption {
  label: string;
  value: string;
}

export enum BusinessFieldType {
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
  SEARCH_ICON = 'searchIcon',
}

export interface ILogicFilter {
  logic: LogicOP;
  compares: ICompareOperation[];
}

export interface ICompareOperation {
  source: string;
  op: CompareOP;
  target?: number | string | number[] | string[] | Date | Date[];
}

export enum LogicOP {
  AND = '$and',
  OR = '$or',
  NOT = '$not',
  NOR = '$nor',
}

declare interface OptionValueType {
  label: ReactNode;
  title?: string;
  value: string | number;
}

export interface FieldService extends FieldMeta {
  findOptions: (key: string, name: string) => Promise<OptionValueType[]>;
  findOfValues: (
    key: string,
    value: (string | number)[],
  ) => Promise<OptionValueType[]>;
  findDataTrees: (key: string, parentId: string | number) => Promise<void>;
  findOtherData: (field: FieldMeta) => Promise<void>;
}
