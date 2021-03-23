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

export interface FieldService extends FieldMeta {
  findOptions: (key: string, name: string) => Promise<void> | void;
  findOfValues: (
    key: string,
    value: (string | number)[],
  ) => Promise<void> | void;
  findDataTrees: (
    key: string,
    parentId: string | number,
  ) => Promise<void> | void;
  findOtherData: (field: FieldMeta) => Promise<void> | void;
}
