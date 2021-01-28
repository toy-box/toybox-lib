import { useState, useCallback } from "react";
import { OptionItem } from '..';

const useFetchOptions = (
  loadData: (key: string, params?: any) => Promise<OptionItem[]>,
  params?: any
) => {
  const [options, setOptions] = useState<OptionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async (key: string) => {
    setLoading(true);
    setOptions(await loadData(key, params));
    setLoading(false);
  }, [loadData, params]);


  return [
    loading,
    options,
    fetchData,
  ] as [boolean, OptionItem[], (key: string, params?: any) => Promise<void>]
}

export default useFetchOptions;
