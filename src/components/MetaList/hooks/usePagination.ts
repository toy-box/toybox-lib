/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PaginationProps } from "antd/lib/pagination";
import { useState } from "react";

const DEFAULT_PAGE_SIZE = 10;

function extendsObject<T extends Record<string, any>>(...list: T[]) {
  const result: T = {} as T;

  list.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = (obj as any)[key];
        if (val !== undefined) {
          (result as any)[key] = val;
        }
      });
    }
  });

  return result;
}

export default function usePagination(
  total: number,
  pagination: PaginationProps | false | undefined,
  onChange: (current: number, pageSize: number) => void,
): [PaginationProps, () => void] {
  const { total: paginationTotal = 0, ...paginationObj } =
    pagination && typeof pagination === 'object' ? pagination : {};

  const [innerPagination, setInnerPagination] = useState<PaginationProps>(() => {
    return {
      current: 'defaultCurrent' in paginationObj ? paginationObj.defaultCurrent : 1,
      pageSize:
        'defaultPageSize' in paginationObj ? paginationObj.defaultPageSize : DEFAULT_PAGE_SIZE,
    };
  });

  // ============ Basic Pagination Config ============
  const mergedPagination = extendsObject<Partial<PaginationProps>>(
    innerPagination,
    paginationObj,
    {
      total: paginationTotal > 0 ? paginationTotal : total,
    },
  );

  if (!paginationTotal) {
    // Reset `current` if data length changed. Only reset when paginationObj do not have total
    const maxPage = Math.ceil(total / mergedPagination.pageSize!);
    if (maxPage < mergedPagination.current!) {
      mergedPagination.current = 1;
    }
  }

  const refreshPagination = (current = 1, pageSize?: number) => {
    setInnerPagination({
      ...mergedPagination,
      current,
      pageSize: pageSize || mergedPagination.pageSize,
    });
  };

  const onInternalChange: PaginationProps['onChange'] = (current, pageSize) => {
    const paginationPageSize = mergedPagination?.pageSize;
    if (pageSize && pageSize !== paginationPageSize) {
      current = 1;
      if (pagination && pagination.onShowSizeChange) pagination.onShowSizeChange(current, pageSize);
    }
    if (pagination && pagination.onChange) pagination.onChange(current, pageSize);

    refreshPagination(current, pageSize);
    onChange(current, pageSize || paginationPageSize!);
  };

  if (pagination === false) {
    return [{}, () => undefined];
  }

  return [
    {
      ...mergedPagination,
      onChange: onInternalChange,
    },
    refreshPagination,
  ];
}