import React, {
  useMemo,
  useImperativeHandle,
  Ref,
  useCallback,
  useEffect,
  useState,
  ReactNode,
  ForwardRefRenderFunction,
} from 'react';
import { Button, Dropdown, Menu } from 'antd';
import classNames from 'classnames';
import { ListUnordered, TableLine, ArrowDownSLine } from '@airclass/icons';
import useAntdTable from './hooks/useTable';
import MetaTable from '../MetaTable';
import { BusinessObjectMeta } from '../../types/interface';
import { OperateItem } from '../MetaTable/components/OperateColumn';
import { FieldType } from '../Fields/interface';
import { RowData } from '../../types/interface';
import { useQueryFilter } from '../../hooks';
import TablePanel from './components/TablePanel';
import Toolbar from './components/Toolbar';
import { SelectItem } from '../SortableSelect/interface';
import IndexViewContext from './context';
import { FieldService } from '../../types/compare';
import { FilterType } from '../FilterSearch';

import './style.less';

const LIST_RENDER = 'listRender';

export declare type IndexMode = 'table' | 'list' | 'card';

export interface PageResult {
  list: Record<string, any>[];
  total: number;
  pageSize?: number;
  current?: number;
}

export interface Pageable {
  pageSize: number;
  current: number;
}

export interface FilterSearch {
  filterKeys: string[];
  simpleFilterKeys: string[];
  filterFieldService?: FieldService;
}

export interface IndexViewProps {
  objectMeta: BusinessObjectMeta;
  operateItems?: OperateItem[];
  operateHeader?: ReactNode;
  visibleColumns: ColumnVisible[];
  visibleColumnSet?: boolean;
  style?: any;
  mode?: IndexMode;
  viewModes?: IndexMode[];
  className?: string;
  columnComponents?: Record<string, (...args: any) => ReactNode>;
  /**
   * @description 是否更具请求参数修改url
   * @default false
   */
  urlQuery?: boolean;
  defaultSelectionType?: 'checkbox';
  loadData: (
    pageable: Pageable,
    fieldsValue: Record<string, any>,
  ) => Promise<PageResult>;
  renderContent?: (...args: any) => ReactNode;
  viewLink?: (...arg: any) => string;
  filterSearch?: FilterSearch;
  filterKey?: string;
}

export interface ColumnVisible {
  key: string;
  fixed?: boolean;
  align?: 'left' | 'right' | 'center';
  component?: string;
  visiable?: boolean;
}

const IndexView: ForwardRefRenderFunction<any, IndexViewProps> = (
  {
    objectMeta,
    operateItems,
    operateHeader,
    visibleColumns,
    visibleColumnSet,
    mode = 'table',
    viewModes,
    className,
    style,
    columnComponents = {},
    defaultSelectionType,
    renderContent,
    viewLink,
    loadData,
    urlQuery,
    filterSearch,
    filterKey = 'filter',
  },
  ref: Ref<any>,
) => {
  const [queryFilter, setQueryFilter] = useQueryFilter();
  const [simpleFilter, setSimpleFilter] = useState<FilterType>();

  useEffect(() => {
    if (queryFilter.filter != null && queryFilter.filter.compares != null) {
      setSimpleFilter(queryFilter.filter.compares);
    }
  }, [queryFilter, setSimpleFilter]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>(
    [],
  );
  const [selectedRows, setSelectedRows] = useState<RowData[]>([]);
  const [selectionType, setSelectionType] = useState(defaultSelectionType);
  const [currentMode, setCurrentMode] = useState<IndexMode>(mode);

  // 可配置的字段key
  const metaColumnKeys = useMemo(() => visibleColumns.map(col => col.key), [
    visibleColumns,
  ]);

  const defaultColumnKeys = useMemo(
    () => visibleColumns.filter(col => col.visiable).map(col => col.key),
    [visibleColumns],
  );

  const defaultColumns = useMemo(() => {
    return metaColumnKeys.map(key => {
      const column = objectMeta.properties[key];
      return {
        label: column.name,
        value: column.key,
      };
    });
  }, [metaColumnKeys, objectMeta]);

  const [columns, setColumns] = useState<SelectItem[]>(defaultColumns);
  const [visibleKeys, setVisibleKeys] = useState(defaultColumnKeys);

  const { search, tableProps } = useAntdTable(
    loadData,
    {
      defaultPageSize: 20,
      defaultParams: [
        { pageSize: queryFilter.pageSize, current: queryFilter.current },
        queryFilter.filter,
      ] as any,
    },
    urlQuery ? setQueryFilter : undefined,
  );

  const rowSelection = useMemo(
    () =>
      selectionType != null
        ? {
            selectedRowKeys,
            selectionType,
            onChange: (keys: (string | number)[], rows: RowData[]) => {
              setSelectedRowKeys(keys), setSelectedRows(rows);
            },
          }
        : undefined,
    [selectedRowKeys, selectionType, setSelectedRowKeys],
  );

  useImperativeHandle(
    ref,
    () => ({
      reload: () => search.submit(),
      selectedRowKeys,
      selectedRows,
    }),
    [search, selectedRowKeys, selectedRows],
  );

  const columnMetas = useMemo(() => {
    if (currentMode === 'list') {
      return [
        {
          key: objectMeta.key,
          component: LIST_RENDER,
          name: objectMeta.name,
          type: FieldType.BUSINESS_OBJECT,
        },
      ];
    }
    return columns
      .filter(col => visibleKeys.some(k => k === col.value))
      .map(col => {
        const fieldMeta = objectMeta.properties[col.value];
        const column = visibleColumns.find(
          c => c.key === col.value,
        ) as ColumnVisible;
        return Object.assign(
          {
            key: column.key,
            fixed: column.fixed,
            align: column.align,
            component: column.component,
            link: fieldMeta.key === objectMeta.titleKey ? viewLink : undefined,
          },
          fieldMeta,
        );
      })
      .filter(c => c != null);
  }, [currentMode, columns, visibleKeys, objectMeta, viewLink, visibleColumns]);

  const components: Record<
    string,
    (...args: any) => ReactNode
  > = useMemo(() => {
    if (currentMode === 'list' && renderContent) {
      return {
        [LIST_RENDER]: renderContent,
      } as Record<string, (...args: any) => ReactNode>;
    }
    return columnComponents;
  }, [columnComponents, currentMode, renderContent]);

  // 显示模式切换菜单
  const modeMenu = useMemo(() => {
    const currentIcon =
      currentMode === 'list' ? <ListUnordered /> : <TableLine />;
    const menuItems = (viewModes || []).map((itemMode, idx) => {
      return (
        <Menu.Item
          key={idx}
          onClick={() => setCurrentMode(itemMode)}
          icon={itemMode === 'list' ? <ListUnordered /> : <TableLine />}
        >
          {itemMode === 'list' ? '列表' : '表格'}
        </Menu.Item>
      );
    });
    const menu = <Menu>{menuItems}</Menu>;
    return (
      <Dropdown overlay={menu}>
        <Button type="text" icon={currentIcon}>
          <ArrowDownSLine />
        </Button>
      </Dropdown>
    );
  }, [currentMode, viewModes]);

  const IndexContent = useCallback(() => {
    switch (currentMode) {
      case 'table':
        return (
          <MetaTable
            rowKey={objectMeta.idKey}
            operateItems={operateItems}
            columnMetas={columnMetas}
            rowSelection={rowSelection}
            columnComponents={components}
            operateHeader={operateHeader}
            {...tableProps}
          />
        );
      case 'list':
        return (
          <MetaTable
            rowKey={objectMeta.idKey}
            operateItems={operateItems}
            columnMetas={columnMetas}
            rowSelection={rowSelection}
            columnComponents={components}
            operateHeader={operateHeader}
            {...tableProps}
          />
        );
      default:
        return null;
    }
  }, [
    currentMode,
    objectMeta.idKey,
    operateItems,
    columnMetas,
    rowSelection,
    components,
    tableProps,
  ]);

  const content = useMemo(
    () => ({
      visibleColumnSet,
      columns,
      setColumns,
      visibleKeys,
      setVisibleKeys,
    }),
    [columns, setColumns, visibleColumnSet, visibleKeys, setVisibleKeys],
  );

  const filterSearchProps = useMemo(() => {
    return filterSearch
      ? {
          filterFieldMetas: filterSearch.filterKeys.map(
            key => objectMeta.properties[key],
          ),
          filterFieldService: filterSearch.filterFieldService,
          simpleFilterKeys: filterSearch.simpleFilterKeys,
          onChange: console.log,
        }
      : undefined;
  }, []);

  return (
    <IndexViewContext.Provider value={content}>
      <div className={classNames('tbox-index-view', className)} style={style}>
        <Toolbar
          filterSearch={filterSearchProps}
          onFilterChange={setSimpleFilter}
          filterValue={simpleFilter}
        />
        <TablePanel />
        <IndexContent />
      </div>
    </IndexViewContext.Provider>
  );
};

export default React.forwardRef(IndexView);
