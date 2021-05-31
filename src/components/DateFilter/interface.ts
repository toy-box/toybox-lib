export type DateFilterUnitType = 'DAY' | 'WEEK' | 'MONTH' | 'SEASON' | 'YEAR';

export type DateFilterValueType =
  | 'DAY:0:0'
  | 'DAY:-1:-1'
  | 'DAY:1:1'
  | 'DAY:-6:0'
  | 'DAY:-29:0'
  | 'DAY:-59:0'
  | 'DAY:-89:0'
  | 'DAY:-119:0'
  | 'DAY:0:6'
  | 'DAY:0:29'
  | 'DAY:0:59'
  | 'DAY:0:89'
  | 'DAY:0:119'
  | 'MONTH:0:0'
  | 'MONTH:-1:-1'
  | 'MONTH:1:1'
  | 'MONTH:0:1'
  | 'MONTH:-1:0'
  | 'YEAR:0:0'
  | 'YEAR:-1:-1'
  | 'YEAR:1:1';

export interface DateFilterType {
  unit: DateFilterUnitType;
  begin: number;
  end: number;
}

export interface DateFilterOption {
  labelValue: DateFilterValueType;
  value: { unit: DateFilterUnitType; begin: number; end: number };
}

export interface DateFilterUnitTypeGroup {
  group: string;
  options: DateFilterOption[];
}

export interface DateFilterLocale {
  lang: {
    [key: string]: string;
  };
}
