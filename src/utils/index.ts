import dayjs, { Dayjs } from 'dayjs';

type DateValue =
  | Dayjs
  | Dayjs[]
  | string
  | string[]
  | number
  | number[]
  | Date
  | null;

export const isNil = (value: any) => value === null || value === undefined;

export const parseValueToMoment = (
  value?: DateValue,
  formatter?: string,
): Dayjs | Dayjs[] | null | undefined => {
  if (isNil(value) || dayjs.isDayjs(value)) {
    return value as Dayjs | null | undefined;
  }
  if (Array.isArray(value)) {
    return (value as any[]).map(v => parseValueToMoment(v, formatter) as Dayjs);
  }
  return typeof value === 'string'
    ? dayjs(value || undefined, formatter)
    : dayjs(value || undefined);
};

export const makeArray = (item: any | any[]) => {
  if (Array.isArray(item)) {
    return item;
  }
  return [item];
};
