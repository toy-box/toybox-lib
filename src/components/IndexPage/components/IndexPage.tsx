import React, {
  useMemo,
  useImperativeHandle,
  Ref,
  useState,
  useCallback,
  ReactNode,
  ForwardRefRenderFunction,
} from 'react';
import { Form, Button, Dropdown, Menu } from 'antd';
import classNames from 'classnames';
import {
  CheckboxMultipleLine,
  CheckboxMultipleFill,
  ListUnordered,
  TableLine,
  ArrowDownSLine,
  LayoutColumnLine,
} from '@airclass/icons';
import useAntdTable from '../hooks/useTable';
import { ContentWrapper } from './ContentWrapper';
import MetaTable from '../../MetaTable';
import { default as Panel, PanelItem, PanelItemProps } from '../../Panel';
import { BusinessObjectMeta } from '../../../types/interface';
import { OperateItem } from '../../MetaTable/components/OperateColumn';
import IndexSearch from './IndexSearch';
import PageHeader from '../../PageHeader';
import { FieldType } from '../../Fields/interface';
import { AdvanceSearch } from './advanceSearch';
import { RowData } from '../../../types/interface';
import { useQuery } from '../../../hooks';
import { SearchFindParam } from './interface';

import '../style.less';
import SortableSelect from '@/components/SortableSelect';
import { SelectItem, ValueType } from '@/components/SortableSelect/interface';

const LIST_RENDER = 'listRender';

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

export type IndexMode = 'table' | 'list' | 'card';

export interface IndexPageProps {
  objectMeta: BusinessObjectMeta;
  title?: string;
  subTitle?: string;
  operateItems?: OperateItem[];
  visibleColumns: ColumnVisible[];
  visibleColumnSet?: boolean;
  searchOption?: {
    findParams: SearchFindParam[];
  };
  style?: any;
  panelItems?: IndexPagePanelItemProps[];
  mode?: IndexMode;
  viewMode?: IndexMode[];
  className?: string;
  columnComponents?: Record<string, (...args: any) => ReactNode>;
  /**
   * @description 是否更具请求参数修改url
   * @default false
   */
  urlQuery?: boolean;
  selectionToggle?: boolean;
  defaultSelectionType?: 'checkbox';
  loadData: (
    pageable: Pageable,
    fieldsValue: Record<string, any>,
  ) => Promise<PageResult>;
  renderContent?: (...args: any) => ReactNode;
  viewLink?: (...arg: any) => string;
}

export interface ColumnVisible {
  key: string;
  fixed?: boolean;
  align?: 'left' | 'right' | 'center';
  component?: string;
  visiable?: boolean;
}

export type IndexPagePanelItemProps = PanelItemProps & {
  selection?: boolean;
};

const IndexPage: ForwardRefRenderFunction<any, IndexPageProps> = (
  {
    title,
    subTitle,
    objectMeta,
    operateItems,
    visibleColumns,
    visibleColumnSet,
    panelItems,
    mode = 'table',
    viewMode,
    searchOption,
    className,
    style,
    columnComponents = {},
    selectionToggle,
    defaultSelectionType,
    renderContent,
    viewLink,
    loadData,
    urlQuery,
  },
  ref: Ref<any>,
) => {
  const [queryForm] = Form.useForm();
  const [query, setQuery] = useQuery();
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>(
    [],
  );
  const [selectedRows, setSelectedRows] = useState<RowData[]>([]);
  const [selectionType, setSelectionType] = useState(defaultSelectionType);
  const [currentMode, setCurrentMode] = useState<IndexMode>(mode);
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false);

  // 可配置的字段key
  const metaColumnKeys = useMemo(() => visibleColumns.map(col => col.key), [
    visibleColumns,
  ]);

  const defaultColumnKeys = useMemo(
    () => visibleColumns.filter(col => col.visiable).map(col => col.key),
    [visibleColumns],
  );

  const defaultDataSource = useMemo(() => {
    return metaColumnKeys.map(key => {
      const column = objectMeta.properties[key];
      return {
        label: column.name,
        value: column.key,
      };
    });
  }, [metaColumnKeys, objectMeta]);

  const [dataSource, setDataSource] = useState<SelectItem[]>(defaultDataSource);
  const [visibleKeys, setVisibleKeys] = useState(defaultColumnKeys);

  const { search, tableProps } = useAntdTable(
    loadData,
    {
      defaultPageSize: 10,
      form: queryForm,
      defaultParams: [
        { pageSize: query.pageSize || 20, current: query.current },
        query,
      ] as any,
    },
    urlQuery ? setQuery : undefined,
  );
  const toggleSelection = useCallback(() => {
    if (selectionType == null) {
      setSelectionType('checkbox');
    } else {
      setSelectionType(undefined);
    }
  }, [selectionType]);

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
    return dataSource
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
  }, [
    currentMode,
    dataSource,
    visibleKeys,
    objectMeta,
    viewLink,
    visibleColumns,
  ]);

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
    const menuItems = (viewMode || []).map((itemMode, idx) => {
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
  }, [currentMode, viewMode]);

  const leftPanel = useMemo(() => {
    return (
      <React.Fragment>
        {selectionToggle ? (
          <Button
            type="text"
            onClick={toggleSelection}
            icon={
              selectionType == null ? (
                <CheckboxMultipleLine />
              ) : (
                <CheckboxMultipleFill />
              )
            }
          />
        ) : null}
        {(viewMode || []).length > 1 ? modeMenu : null}
        {searchOption ? (
          <IndexSearch
            form={queryForm}
            submit={search.submit}
            findParams={searchOption.findParams}
            showAdvance={showAdvanceSearch}
            triggerAdvance={() => setShowAdvanceSearch(!showAdvanceSearch)}
          />
        ) : null}
      </React.Fragment>
    );
  }, [
    queryForm,
    modeMenu,
    showAdvanceSearch,
    setShowAdvanceSearch,
    searchOption,
    selectionType,
    search.submit,
    toggleSelection,
    viewMode,
  ]);

  const advanceSearch = useMemo(() => {
    const classes = classNames('advance-search', { active: showAdvanceSearch });
    return searchOption && showAdvanceSearch ? (
      <AdvanceSearch
        className={classes}
        form={queryForm}
        submit={search.submit}
        findParams={searchOption.findParams}
      />
    ) : null;
  }, [searchOption, showAdvanceSearch, search.submit, queryForm]);

  const columnSet = useMemo(() => {
    return visibleColumnSet ? (
      <SortableSelect
        title="配置表格字段"
        dataSource={dataSource}
        value={visibleKeys}
        onChange={(keys: ValueType) => {
          console.log('keys', keys);
          setVisibleKeys(keys as string[]);
        }}
        onSortEnd={setDataSource}
        multiple
      >
        <Button type="text">
          <LayoutColumnLine />
        </Button>
      </SortableSelect>
    ) : null;
  }, [
    visibleColumnSet,
    dataSource,
    visibleKeys,
    setVisibleKeys,
    setDataSource,
  ]);

  const rightPanel = useMemo(() => {
    return (
      <React.Fragment>
        {(panelItems || [])
          .filter(item => !item.selection || selectionType != null)
          .map((item, index) => (
            <PanelItem key={index} {...item} />
          ))}
        {columnSet}
      </React.Fragment>
    );
  }, [columnSet, panelItems, selectionType]);

  const tablePanel = useMemo(
    () =>
      rightPanel != null || leftPanel != null ? (
        <React.Fragment>
          <Panel left={leftPanel} right={rightPanel} />
        </React.Fragment>
      ) : null,
    [rightPanel, leftPanel],
  );

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

  return (
    <div
      className={classNames('tbox-page', 'tbox-index-page', className)}
      style={style}
    >
      {title && <PageHeader title={title} subTitle={subTitle} />}
      {advanceSearch}
      <ContentWrapper>
        {tablePanel}
        <IndexContent />
      </ContentWrapper>
    </div>
  );
};

export default React.forwardRef(IndexPage);
