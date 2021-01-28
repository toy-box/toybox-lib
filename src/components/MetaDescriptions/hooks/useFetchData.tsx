import { useCallback, useState, useEffect } from 'react';

export interface RequestData {
  data: any;
  success?: boolean;
  [key: string]: any;
}

export interface UseFetchDataAction<T extends RequestData> {
  dataSource: T['data'] | T;
  loading: boolean | undefined;
  reload: () => Promise<void>;
}

const useFetchData = <T extends RequestData>(
  getData: () => Promise<T>,
  options?: {
    effects?: any[];
    manual: boolean;
    onRequestError?: (e: Error) => void;
  },
): UseFetchDataAction<T> => {
  const { onRequestError, effects = [], manual } = options || {};
  const [entity, setEntity] = useState<T['data']>({} as any);
  const [loading, setLoading] = useState<boolean | undefined>(undefined);

  const updateDataAndLoading = (data: T) => {
    setEntity(data);
    setLoading(false);
  };
  /**
   * 请求数据
   */
  const fetchList = useCallback(async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const { data, success } = (await getData()) || {};
      if (success !== false) {
        updateDataAndLoading(data);
      }
    } catch (e) {
      // 如果没有传递这个方法的话，需要把错误抛出去，以免吞掉错误
      if (onRequestError === undefined) {
        throw new Error(e);
      } else {
        onRequestError(e);
      }
      setLoading(false);
    }
  }, [getData, loading, onRequestError]);

  useEffect(() => {
    if (manual) {
      return;
    }
    fetchList();
  }, [fetchList, manual]);

  return {
    dataSource: entity,
    loading,
    reload: () => fetchList(),
  };
};

export default useFetchData;