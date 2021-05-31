import { DateFilterUnitTypeGroup } from './interface';

export const optionGroups: DateFilterUnitTypeGroup[] = [
  {
    group: 'DAY',
    options: [
      {
        labelValue: 'DAY:0:0',
        value: {
          unit: 'DAY',
          begin: 0,
          end: 0,
        },
      },
      {
        labelValue: 'DAY:-1:-1',
        value: {
          unit: 'DAY',
          begin: -1,
          end: -1,
        },
      },
      {
        labelValue: 'DAY:1:1',
        value: {
          unit: 'DAY',
          begin: 1,
          end: 1,
        },
      },
      {
        labelValue: 'DAY:-6:0',
        value: {
          unit: 'DAY',
          begin: -6,
          end: 0,
        },
      },
      {
        labelValue: 'DAY:-29:0',
        value: {
          unit: 'DAY',
          begin: -29,
          end: 0,
        },
      },
      {
        labelValue: 'DAY:-59:0',
        value: {
          unit: 'DAY',
          begin: -59,
          end: 0,
        },
      },
      {
        labelValue: 'DAY:-89:0',
        value: {
          unit: 'DAY',
          begin: -89,
          end: 0,
        },
      },
      {
        labelValue: 'DAY:-119:0',
        value: {
          unit: 'DAY',
          begin: -119,
          end: 0,
        },
      },
      {
        labelValue: 'DAY:0:6',
        value: {
          unit: 'DAY',
          begin: 0,
          end: 6,
        },
      },
      {
        labelValue: 'DAY:0:29',
        value: {
          unit: 'DAY',
          begin: 0,
          end: 29,
        },
      },
      {
        labelValue: 'DAY:0:59',
        value: {
          unit: 'DAY',
          begin: 0,
          end: 59,
        },
      },
      {
        labelValue: 'DAY:0:89',
        value: {
          unit: 'DAY',
          begin: 0,
          end: 89,
        },
      },
      {
        labelValue: 'DAY:0:119',
        value: {
          unit: 'DAY',
          begin: 0,
          end: 119,
        },
      },
    ],
  },
  {
    group: 'MONTH',
    options: [
      {
        labelValue: 'MONTH:0:0',
        value: {
          unit: 'MONTH',
          begin: 0,
          end: 0,
        },
      },
      {
        labelValue: 'MONTH:-1:-1',
        value: {
          unit: 'MONTH',
          begin: -1,
          end: -1,
        },
      },
      {
        labelValue: 'MONTH:1:1',
        value: {
          unit: 'MONTH',
          begin: 1,
          end: 1,
        },
      },
      {
        labelValue: 'MONTH:-1:0',
        value: {
          unit: 'MONTH',
          begin: -1,
          end: 0,
        },
      },
      {
        labelValue: 'MONTH:0:1',
        value: {
          unit: 'MONTH',
          begin: 0,
          end: 1,
        },
      },
    ],
  },
  {
    group: 'YEAR',
    options: [
      {
        labelValue: 'YEAR:0:0',
        value: {
          unit: 'YEAR',
          begin: 0,
          end: 0,
        },
      },
      {
        labelValue: 'YEAR:-1:-1',
        value: {
          unit: 'YEAR',
          begin: -1,
          end: -1,
        },
      },
      {
        labelValue: 'YEAR:1:1',
        value: {
          unit: 'YEAR',
          begin: 1,
          end: 1,
        },
      },
    ],
  },
];
