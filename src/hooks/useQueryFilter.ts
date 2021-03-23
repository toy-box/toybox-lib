import { useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'qs';
import { ILogicFilter, LogicOP } from '../types/compare';

export interface QueryFilter {
  filter?: ILogicFilter;
  pageSize?: number;
  current?: number;
}

declare type SetQueryFilter = (queryFilter: QueryFilter) => void;

export default () => {
  const history = useHistory();
  const location = useLocation();

  const setQueryFilter = (queryFilter: QueryFilter) => {
    const query = {
      filter:
        queryFilter.filter != null
          ? window.btoa(JSON.stringify(queryFilter.filter))
          : undefined,
      pageSize: queryFilter.pageSize,
      current: queryFilter.current,
    };
    history.replace(`${location.pathname}?${qs.stringify(query)}`);
  };

  const queryFilter = useMemo(() => {
    const query = qs.parse(location.search.substr(1));
    return {
      filter:
        typeof query.filter === 'string'
          ? JSON.parse(window.atob(query.filter as string))
          : { logic: LogicOP.AND, compares: [] },
      pageSize: query.pageSize != null ? Number(query.pageSize) : undefined,
      current: query.current != null ? Number(query.current) : undefined,
    };
  }, [location.search]);
  return [queryFilter, setQueryFilter] as [QueryFilter, SetQueryFilter];
};
