import React, {
  useMemo,
  useImperativeHandle,
  Ref,
  useState,
  useCallback,
  ReactNode,
  ForwardRefRenderFunction,
} from 'react';
import { Form, Dropdown, Menu } from 'antd';
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
import MetaTable from '../../MetaTable';
import { PageWithHeader } from '../../Layout';
import { PanelItemProps } from '../../Panel';
import {
  RowData,
  BusinessObjectMeta,
  ColumnVisible,
  Pageable,
  PageResult,
} from '../../../types/interface';
import { OperateItem } from '../../MetaTable/components/OperateColumn';
import IndexSearch from './IndexSearch';
import Toolbar from '../../Toolbar';
import { FieldType } from '../../Fields/interface';
import { AdvanceSearch } from './advanceSearch';
import { useQuery } from '../../../hooks';
import { SearchFindParam } from './interface';
import SortableSelect from '../../SortableSelect';
import { SelectItem, ValueType } from '../../SortableSelect/interface';
import Button from '@/components/Button';
import ButtonGroup, { ButtonItem } from '@/components/ButtonGroup';
import { TablePanel } from '@/components/IndexView/components';
import IndexViewContext from '@/components/IndexView/context';

import '../style.less';

const LIST_RENDER = 'listRender';

export type IndexMode = 'table' | 'list' | 'card';

export interface IndexButtonItem extends ButtonItem {
  selection?: boolean;
}

export interface IndexPageProps {
  objectMeta: BusinessObjectMeta;
  header?: ReactNode;
  subTitle?: string;
  operateItems?: OperateItem[];
  operateHeader?: ReactNode;
  visibleColumns: ColumnVisible[];
  visibleColumnSet?: boolean;
  searchOption?: {
    findParams: SearchFindParam[];
  };
  style?: any;
  panelItems?: IndexPagePanelItemProps[];
  buttonItems?: IndexButtonItem[];
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

export type IndexPagePanelItemProps = PanelItemProps & {
  selection?: boolean;
};

const IndexPage: ForwardRefRenderFunction<any, IndexPageProps> = (
  {
    header,
    objectMeta,
    operateItems,
    operateHeader,
    visibleColumns,
    visibleColumnSet,
    panelItems,
    buttonItems,
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
  const selected = useMemo(() => selectedRows.length > 0, [selectedRows]);
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
      setSelectedRows([]);
      setSelectedRowKeys([]);
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
            tooltip
            onClick={toggleSelection}
            icon={
              selectionType == null ? (
                <CheckboxMultipleLine />
              ) : (
                <CheckboxMultipleFill />
              )
            }
          >
            多选
          </Button>
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
        dataSource={columns}
        value={visibleKeys}
        onChange={(keys: ValueType) => {
          setVisibleKeys(keys as string[]);
        }}
        onSortEnd={setColumns}
        multiple
      >
        <Button type="text">
          <LayoutColumnLine />
        </Button>
      </SortableSelect>
    ) : null;
  }, [visibleColumnSet, columns, visibleKeys, setVisibleKeys, setColumns]);

  const buttons = useMemo(() => {
    if (buttonItems != null) {
      return buttonItems.map(item => ({
        ...item,
        disabled: item.selection && !selected ? true : item.disabled,
      }));
    }
    if (panelItems) {
      const items: ButtonItem[] = [];
      (panelItems || [])
        .filter(item => item.type === 'button')
        .forEach(item => {
          if (item.type === 'button' && item.props) {
            items.push(...item.props.items);
          }
        });
      return items;
    }
    return [];
  }, [selected]);

  const rightPanel = useMemo(() => <ButtonGroup items={buttons} />, [buttons]);

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

  return (
    <IndexViewContext.Provider value={content}>
      <PageWithHeader header={header} className={className} style={style}>
        {advanceSearch}
        <Toolbar left={leftPanel} right={rightPanel} />
        <TablePanel />
        <IndexContent />
      </PageWithHeader>
    </IndexViewContext.Provider>
  );
};

export default React.forwardRef(IndexPage);
