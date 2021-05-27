export type DateFilterUnitType = 'day' | 'month' | 'season' | 'year';

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
