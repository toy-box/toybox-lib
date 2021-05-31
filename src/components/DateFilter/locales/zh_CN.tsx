import { DateFilterLocale } from '../interface';

const locale: DateFilterLocale = {
  lang: {
    placeholder: '选择时间段',
    DAY: '日',
    WEEK: '月',
    MONTH: '月',
    SEASON: '季度',
    YEAR: '年',
    'DAY:0:0': '今天',
    'DAY:-1:-1': '昨天',
    'DAY:1:1': '明天',
    'DAY:-6:0': '过去7天',
    'DAY:-29:0': '过去30天',
    'DAY:-59:0': '过去60天',
    'DAY:-89:0': '过去90天',
    'DAY:-119:0': '过去120天',
    'DAY:0:6': '未来7天',
    'DAY:0:29': '未来30天',
    'DAY:0:59': '未来60天',
    'DAY:0:89': '未来90天',
    'DAY:0:119': '未来120天',
    'MONTH:0:0': '当月',
    'MONTH:-1:-1': '上个月',
    'MONTH:1:1': '下个月',
    'MONTH:0:1': '当前和下个月',
    'MONTH:-1:0': '当前和上个月',
    'YEAR:0:0': '今年',
    'YEAR:-1:-1': '去年',
    'YEAR:1:1': '明年',
  },
};

export default locale;
