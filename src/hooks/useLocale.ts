import LocaleContext from 'antd/lib/locale-provider/context';
import { useContext, useMemo } from 'react';

const DefaultLocale = 'zh_CN';

const useLocale = () => {
  const antLocale = useContext(LocaleContext);
  return antLocale && antLocale.locale ? antLocale.locale : DefaultLocale;
};

export default useLocale;
