import { useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'qs';
import { PaginatedParams } from '@ahooksjs/use-request/lib/types';
import { ILogicFilter, LogicOP } from '../types/compare';

export type QueryFilter = PaginatedParams[0] & {
  logicFilter?: ILogicFilter;
};

declare type SetQueryFilter = (queryFilter: QueryFilter) => void;

export default () => {
  const history = useHistory();
  const location = useLocation();

  const setQueryFilter = (qf: QueryFilter) => {
    const query = {
      logicFilter:
        qf.logicFilter != null
          ? window.btoa(JSON.stringify(qf.logicFilter))
          : undefined,
      pageSize: qf.pageSize,
      current: qf.current,
      sorter: qf.sorter,
      filters: qf.filters,
    };
    history.replace(`${location.pathname}?${qs.stringify(query)}`);
  };

  const queryFilter = useMemo(() => {
    const qf = qs.parse(location.search.substr(1));
    return {
      logicFilter:
        typeof qf.logicFilter === 'string'
          ? JSON.parse(window.atob(qf.logicFilter as string))
          : { logic: LogicOP.AND, compares: [] },
      pageSize: qf.pageSize != null ? Number(qf.pageSize) : undefined,
      current: qf.current != null ? Number(qf.current) : undefined,
      sorter: qf.sorter,
      filters: qf.filters,
    };
  }, [location.search]);
  return [queryFilter, setQueryFilter] as [QueryFilter, SetQueryFilter];
};
