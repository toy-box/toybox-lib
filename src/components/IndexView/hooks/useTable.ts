/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-use-before-define */
import useRequest from '@ahooksjs/use-request';
import { useUpdateEffect, usePersistFn } from 'ahooks';
import { useState, useCallback, useEffect, useRef } from 'react';
import {
  CombineService,
  PaginatedParams,
  BasePaginatedOptions,
  PaginatedOptionsWithFormat,
  PaginatedFormatReturn,
  PaginatedResult,
} from '@ahooksjs/use-request/lib/types';

export {
  CombineService,
  PaginatedParams,
  BasePaginatedOptions,
  PaginatedOptionsWithFormat,
  PaginatedFormatReturn,
  PaginatedResult,
};

export interface Store {
  [name: string]: any;
}

type Antd3ValidateFields = (
  fieldNames: string[],
  callback: (errors: any, values: any) => void,
) => void;
type Antd4ValidateFields = (fieldNames?: string[]) => Promise<any>;

export interface UseAntdTableFormUtils {
  getFieldInstance?: (name: string) => {}; // antd 3
  setFieldsValue: (value: Store) => void;
  getFieldsValue: (...args: any) => Store;
  resetFields: (...args: any) => void;
  validateFields: Antd3ValidateFields | Antd4ValidateFields;
  [key: string]: any;
}

export interface FilterUtil {
  setFilter: (value: Store) => void;
  getFilter: (...args: any) => Store;
  resetFilter: (...args: any) => void;
}

export interface Result<Item> extends PaginatedResult<Item> {
  search: {
    type: 'simple' | 'advance';
    changeType: () => void;
    submit: () => void;
    reset: () => void;
  };
}

export interface BaseOptions<U>
  extends Omit<BasePaginatedOptions<U>, 'paginated'> {
  filter?: FilterUtil;
  defaultType?: 'simple' | 'advance';
}

export interface OptionsWithFormat<R, Item, U>
  extends Omit<PaginatedOptionsWithFormat<R, Item, U>, 'paginated'> {
  filter?: FilterUtil;
  defaultType?: 'simple' | 'advance';
}

function useAntdTable<R = any, Item = any, U extends Item = any>(
  service: CombineService<R, PaginatedParams>,
  options: OptionsWithFormat<R, Item, U>,
  setQuery?: (data: any) => void,
): Result<Item>;
function useAntdTable<R = any, Item = any, U extends Item = any>(
  service: CombineService<PaginatedFormatReturn<Item>, PaginatedParams>,
  options: BaseOptions<U>,
  setQuery?: (data: any) => void,
): Result<Item>;
function useAntdTable<R = any, Item = any, U extends Item = any>(
  service: CombineService<any, any>,
  options: BaseOptions<U> | OptionsWithFormat<R, Item, U>,
  setQuery?: (data: any) => void,
): any {
  const {
    filter,
    refreshDeps = [],
    manual,
    defaultType = 'simple',
    defaultParams,
    ...restOptions
  } = options;
  const result = useRequest(service, {
    ...restOptions,
    paginated: true as true,
    manual: true,
  });

  const { params, run } = result;

  const cacheFormTableData = params[2] || ({} as any);

  // 优先从缓存中读
  const [type, setType] = useState(cacheFormTableData.type || defaultType);

  // 全量 form 数据，包括 simple 和 advance
  const [allFormData, setAllFormData] = useState<Store>(
    cacheFormTableData.allFormData || (defaultParams && defaultParams[1]) || {},
  );

  // 获取当前展示的 form 字段值
  const getActivetFieldValues = useCallback((): Store => {
    if (!filter) {
      return {};
    }
    return filter.getFilter();
  }, [filter]);

  // const formRef = useRef(form);
  // formRef.current = form;
  /* 初始化，或改变了 searchType, 恢复表单数据 */
  useEffect(() => {
    filter && filter.setFilter(allFormData);
  }, [filter, type]);

  // 首次加载，手动提交。为了拿到 form 的 initial values
  useEffect(() => {
    // 如果有缓存，则使用缓存，重新请求
    if (params.length > 0) {
      run(...params);
      return;
    }

    // 如果没有缓存，触发 submit
    if (!manual) {
      _submit(defaultParams);
    }
  }, []);

  const changeType = useCallback(() => {
    const currentFormData = getActivetFieldValues();
    setAllFormData({ ...allFormData, ...currentFormData });

    const targetType = type === 'simple' ? 'advance' : 'simple';
    setType(targetType);
  }, [type, allFormData, getActivetFieldValues]);

  const _submit = useCallback(
    (initParams?: any) => {
      setTimeout(() => {
        const activeFormData = getActivetFieldValues();
        // 记录全量数据
        const _allFormData = { ...allFormData, ...activeFormData };
        setAllFormData(_allFormData);

        // has defaultParams
        if (initParams) {
          run(initParams[0], activeFormData, {
            allFormData: _allFormData,
            type,
          });
          return;
        }

        run(
          {
            pageSize: options.defaultPageSize || 10,
            ...((params[0] as PaginatedParams[0] | undefined) || {}), // 防止 manual 情况下，第一次触发 submit，此时没有 params[0]
            current: 1,
          },
          activeFormData,
          {
            allFormData: _allFormData,
            type,
          },
        );
        setQuery && setQuery(activeFormData);
      });
    },
    [getActivetFieldValues, run, params, allFormData, type],
  );

  const reset = useCallback(() => {
    if (filter) {
      filter.resetFilter();
    }
    _submit();
  }, [filter, _submit]);

  const resetPersistFn = usePersistFn(reset);

  // refreshDeps 变化，reset。
  useUpdateEffect(() => {
    if (!manual) {
      resetPersistFn();
    }
  }, [...refreshDeps]);

  const submit = usePersistFn(e => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    _submit();
  });

  return {
    ...result,
    search: {
      submit,
      type,
      changeType,
      reset,
    },
  };
}

export default useAntdTable;
