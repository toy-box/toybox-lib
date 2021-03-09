import React, { FC, useContext, useEffect, useMemo } from 'react';
import numbro from 'numbro';
import LocaleContext from 'antd/lib/locale-provider/context';

export interface NumberProps {
  value: number;
  currency: boolean;
  className?: string;
}

const Number: FC<NumberProps> = ({ value, currency, className }) => {
  const antLocale = useContext(LocaleContext);
  const locale = useMemo(
    () => (antLocale && antLocale.locale ? antLocale.locale : 'zh_CN'),
    [antLocale],
  );

  useEffect(() => {
    numbro.setLanguage(locale.replace('_', '-'));
  }, [locale]);

  const numberStr = useMemo(() => {
    numbro.setLanguage('zh-CN');
    return currency
      ? numbro(value).formatCurrency({
          average: true,
          mantissa: 2,
          spaceSeparated: true,
        })
      : numbro(value).format({
          average: true,
          mantissa: 2,
          spaceSeparated: true,
        });
  }, [value]);
  return <span className={className}>{numberStr}</span>;
};

export default Number;
