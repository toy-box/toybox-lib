/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-use-before-define */
import useRequest from '@ahooksjs/use-request';
import { useUpdateEffect, usePersistFn } from 'ahooks';
import { useState, useCallback, useEffect } from 'react';
import {
  CombineService,
  PaginatedParams,
  BasePaginatedOptions,
  PaginatedOptionsWithFormat,
  PaginatedFormatReturn,
  PaginatedResult,
} from '@ahooksjs/use-request/lib/types';
import { ILogicFilter, LogicOP } from '../../../types';

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

type Antd4ValidateFields = (fieldNames?: string[]) => Promise<any>;

export interface UseAntdTableFormUtils {
  getFieldInstance?: (name: string) => {}; // antd 3
  setFieldsValue: (value: ILogicFilter) => void;
  getFieldsValue: (...args: any) => ILogicFilter;
  resetFields: (...args: any) => void;
  validateFields: Antd4ValidateFields;
  [key: string]: any;
}

export interface FilterUtil {
  getFilter: (...args: any) => ILogicFilter | undefined;
  resetFilter: (...args: any) => void;
}

export interface Result<Item> extends PaginatedResult<Item> {
  search: {
    submit: () => void;
    reset: () => void;
  };
}

export interface BaseOptions<U>
  extends Omit<BasePaginatedOptions<U>, 'paginated'> {
  filterUtil?: FilterUtil;
}

export interface OptionsWithFormat<R, Item, U>
  extends Omit<PaginatedOptionsWithFormat<R, Item, U>, 'paginated'> {
  filterUtil?: FilterUtil;
}

function useAntdTable<R = any, Item = any, U extends Item = any>(
  service: CombineService<R, PaginatedParams>,
  options: OptionsWithFormat<R, Item, U>,
): Result<Item>;
function useAntdTable<R = any, Item = any, U extends Item = any>(
  service: CombineService<PaginatedFormatReturn<Item>, PaginatedParams>,
  options: BaseOptions<U>,
): Result<Item>;
function useAntdTable<R = any, Item = any, U extends Item = any>(
  service: CombineService<any, any>,
  options: BaseOptions<U> | OptionsWithFormat<R, Item, U>,
): any {
  const {
    filterUtil,
    refreshDeps = [],
    manual,
    defaultParams,
    ...restOptions
  } = options;
  const result = useRequest(service, {
    ...restOptions,
    paginated: true as true,
    manual: true,
  });

  const { params, run } = result;

  // 获取当前展示的 form 字段值
  const getFilterData = useCallback(() => {
    if (!filterUtil) {
      return {
        logic: LogicOP.AND,
        compares: [],
      };
    }
    return filterUtil.getFilter();
  }, [filterUtil]);

  // 首次加载，手动提交。为了拿到 form 的 initial values
  // useEffect(() => {
  //   // 如果有缓存，则使用缓存，重新请求
  //   if (params.length > 0) {
  //     run(...params);
  //     return;
  //   }

  //   // 如果没有缓存，触发 submit
  //   if (!manual) {
  //     _submit(defaultParams);
  //   }
  // }, []);

  const _submit = useCallback(
    (initParams?: any) => {
      setTimeout(() => {
        const activeFilterData = getFilterData();
        // has defaultParams
        if (initParams) {
          run(initParams[0], activeFilterData);
          return;
        }
        run(
          {
            pageSize: options.defaultPageSize || 10,
            ...((params[0] as PaginatedParams[0] | undefined) || {}), // 防止 manual 情况下，第一次触发 submit，此时没有 params[0]
            current: 1,
          },
          activeFilterData,
        );
      });
    },
    [getFilterData, run, params],
  );

  const reset = useCallback(() => {
    if (filterUtil) {
      filterUtil.resetFilter();
    }
    _submit();
  }, [filterUtil, _submit]);

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
      reset,
    },
  };
}

export default useAntdTable;
