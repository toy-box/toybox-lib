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

export interface FieldMeta {
  key: string;
  name: string;
  type: BusinessFieldType;
  description?: string;
  options?: FieldOption[];
  refObjectId?: string;
  unique?: boolean;
  required?: boolean;
  maximum?: number;
  minimum?: number;
  exclusiveMaximum?: boolean;
  exclusiveMinimum?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  format?: string;
  properties?: { [key: string]: FieldMeta };
  titleKey?: string;
  parentKey?: string;
  unBasic?: boolean;
}

export interface ILogicFilter {
  logic: LogicOP;
  compares: Partial<ICompareOperation>[];
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
  customCallback: (field: FieldMeta) => Promise<void> | void;
}
