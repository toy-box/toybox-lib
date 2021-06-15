export enum LogicOP {
  AND = '$and',
  OR = '$or',
  NOT = '$not',
  NOR = '$nor',
}

export type LogicOpType = '$and' | '$or' | '$not' | '$nor';

export interface ICompareOperation {
  source: string;
  op: UniteCompareOP;
  target?: number | string | number[] | string[] | Date | Date[];
}

export interface ILogicFilter {
  logic: LogicOP;
  compares: Partial<ICompareOperation>[];
}

export type CompareOpType =
  | '$eq'
  | '$gt'
  | '$gte'
  | '$in'
  | '$lt'
  | '$lte'
  | '$ne'
  | '$ne'
  | '$nin';

export type DateCompareOpType = '$unitDateRange' | '$between';

export type UniteCompareOpType = CompareOpType | DateCompareOpType;

export enum CompareOP {
  EQ = '$eq',
  GT = '$gt',
  GTE = '$gte',
  IN = '$in',
  LT = '$lt',
  LTE = '$lte',
  NE = '$ne',
  NIN = '$nin',
  IS_NULL = '$isNull',
}

export enum DateCompareOP {
  UNIT_DATE_RANGE = '$unitDateRange',
  BETWEEN = '$between',
}

export type UniteCompareOP = CompareOP | DateCompareOP;

export type TimeUnit = 'day' | 'month' | 'week' | 'season' | 'year';

export interface IUnitDateRange {
  unit: TimeUnit;
  begin: number;
  end: number;
}

export type DateFilterValueType =
  | 'TODAY'
  | 'YESTODAY'
  | 'TOMORROW'
  | 'LAST_DAYS:7'
  | 'LAST_DAYS:30'
  | 'LAST_DAYS:60'
  | 'LAST_DAYS:90'
  | 'LAST_DAYS:120'
  | 'NEXT_DAYS:7'
  | 'NEXT_DAYS:30'
  | 'NEXT_DAYS:60'
  | 'NEXT_DAYS:90'
  | 'NEXT_DAYS:120'
  | 'CURRENT_MONTH'
  | 'LAST_MONTH'
  | 'NEXT_MONTH'
  | 'LAST_MONTHS:2'
  | 'NEXT_MONTHS:2';
