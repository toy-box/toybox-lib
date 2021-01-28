import React, { useMemo, useImperativeHandle, Ref, useState, useCallback, ReactNode, ForwardRefRenderFunction } from 'react';
import { Form, Button, Dropdown, Menu } from 'antd';
import classNames from 'classnames';
import { CheckboxMultipleLine, CheckboxMultipleFill, ListUnordered, TableLine, ArrowDownSLine } from '@airclass/icons';
import useAntdTable from '../hooks/useTable';
import { ContentWrapper } from './ContentWrapper';
import MetaTable from '../../MetaTable';
import { default as Panel, PanelItem, PanelItemProps } from '../../Panel';
import { BusinessObjectMeta } from '../../../types/interface';
import { OperateItem } from '../../MetaTable/components/OperateColumn';
import { IndexSearch, SearchFindParam } from './IndexSearch';
import PageHeader from '../../PageHeader';
import { FieldType } from '../../Fields/interface';
import { AdvanceSearch } from './advanceSearch';
import { RowData } from '../../../types/interface';
import { useQuery } from '../../../hooks';

import '../style.less';

const LIST_RENDER = 'listRender';

export interface PageResult {
  list: Record<string, any>[];
  total: number;
}

export interface Pageable {
  pageSize: number;
  current: number;
}

export type IndexMode = 'table' | 'list' | 'card';

export interface IndexPageProps {
  title?: string;
  subTitle?: string;
  objectMeta: BusinessObjectMeta;
  operateItems?: OperateItem[];
  visibleColumns?: ColumnVisible[];
  searchOption?: {
    findParams: SearchFindParam[];
  }
  style?: any;
  panelItems?: IndexPagePanelItemProps[];
  mode?: IndexMode;
  viewMode?: IndexMode[];
  className?: string;
  columnComponents?: Record<string, (...args: any) => ReactNode>;
  urlQuery?: boolean,
  renderContent?: (...args: any) => ReactNode;
  loadData: (pageable: Pageable, fieldsValue: Record<string, any>) => Promise<PageResult>;
  viewLink?: (...arg: any) => string;
}

export interface ColumnVisible {
  key: string;
  fixed?: boolean;
  align?: 'left' | 'right' | 'center';
  component?: string;
}

export type IndexPagePanelItemProps = PanelItemProps & {
  selection?: boolean;
}

const IndexPage: ForwardRefRenderFunction<any, IndexPageProps>  = ({
  title,
  subTitle,
  objectMeta,
  operateItems,
  visibleColumns,
  panelItems,
  mode = 'table',
  viewMode,
  searchOption,
  className,
  style,
  columnComponents = {},
  renderContent,
  viewLink,
  loadData,
  urlQuery
}, ref: Ref<any>) => {
  const [queryForm] = Form.useForm();
  const [query, setQuery] = useQuery();
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
  const [selectedRows, setSelectedRows] = useState<RowData[]>([]);
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>();
  const [currentMode, setCurrentMode] = useState<IndexMode>(mode);
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false);
  const { search, tableProps } = useAntdTable(
    loadData,
    {
      defaultPageSize: 10,
      form: queryForm,
      defaultParams: [{ pageSize: query.pageSize || 20, current: query.current }, query] as any,
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
    () => selectionType != null
      ? ({
        selectedRowKeys,
        selectionType,
        onChange: (keys: (string | number)[], rows: RowData[]) => {
          setSelectedRowKeys(keys),
          setSelectedRows(rows);
        }
      })
      : undefined,
    [selectedRowKeys, selectionType, setSelectedRowKeys]
  )

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
      return [{
        key: objectMeta.key,
        component: LIST_RENDER,
        name: objectMeta.name,
        type: FieldType.BUSINESS_OBJECT,
      }];
    }
    if (visibleColumns != null) {
      return visibleColumns.map(col => {
        const fieldMeta = objectMeta.properties[col.key];
        return Object.assign(
          {
            key: col.key,
            fixed: col.fixed,
            align: col.align,
            component: col.component,
            link: fieldMeta.key === objectMeta.titleKey ? viewLink : undefined
          },
          fieldMeta,
        );
      });
    }
    return Object.keys(objectMeta.properties)
      .map(key => Object.assign(
        objectMeta.properties[key],
        { link: key === objectMeta.titleKey ? viewLink : undefined }
      ));
  }, [currentMode, objectMeta.key, objectMeta.name, objectMeta.properties, objectMeta.titleKey, viewLink, visibleColumns]);

  const components: Record<string, (...args: any) => ReactNode> = useMemo(() => {
    if (currentMode === 'list' && renderContent) {
      return {
        [LIST_RENDER]: renderContent,
      } as Record<string, (...args: any) => ReactNode>;
    }
    return columnComponents;
  }, [columnComponents, currentMode, renderContent]);

  // 显示模式切换菜单
  const modeMenu = useMemo(() => {
    const currentIcon = currentMode === 'list' ? <ListUnordered /> : <TableLine />;
    const menuItems = (viewMode || []).map((itemMode, idx) => {
      return <Menu.Item
        key={idx}
        onClick={() => setCurrentMode(itemMode)}
        icon={itemMode === 'list' ? <ListUnordered /> : <TableLine />}
      >
        { itemMode === 'list' ? '列表' : '表格' }
      </Menu.Item>;
    });
    const menu = (
      <Menu>
        {menuItems}
      </Menu>
    );
    return <Dropdown overlay={menu}>
      <Button type="text" icon={currentIcon}>
        <ArrowDownSLine />
      </Button>
    </Dropdown>
  }, [currentMode, viewMode]);

  const leftPanel = useMemo(() => {
    return <React.Fragment>
      <Button
        type="text"
        onClick={toggleSelection}
        icon={selectionType == null ? <CheckboxMultipleLine /> : <CheckboxMultipleFill />}
      />
      {
        (viewMode || []).length > 1 ? modeMenu : null
      }
      {
        searchOption
          ? <IndexSearch
              form={queryForm}
              submit={search.submit}
              findParams={searchOption.findParams}
              showAdvance={showAdvanceSearch}
              triggerAdvance={() => setShowAdvanceSearch(!showAdvanceSearch)}
            />
          : null
      }
    </React.Fragment>
  }, [queryForm, modeMenu, showAdvanceSearch, setShowAdvanceSearch, searchOption, selectionType, search.submit, toggleSelection, viewMode]);

  const advanceSearch = useMemo(() => {
    return searchOption && showAdvanceSearch
      ? <AdvanceSearch
          className={classNames('advance-search', { active: showAdvanceSearch})}
          form={queryForm}
          submit={search.submit}
          findParams={searchOption.findParams}
        />
      : null
  }, [searchOption, showAdvanceSearch, search.submit, queryForm]);

  const rightPanel = useMemo(() => {
    return (panelItems || [])
      .filter(item => !item.selection || selectionType != null)
      .map((item, index) => (
        <PanelItem key={index} {...item} />
      ));
  }, [panelItems, selectionType]);

  const tablePanel = useMemo(() => (rightPanel != null || leftPanel != null)
    ? <React.Fragment>
        <Panel left={leftPanel} right={rightPanel} />
      </React.Fragment>
    : null,
    [rightPanel, leftPanel]
  );

  const IndexContent = useCallback(() => {
    switch (currentMode) {
      case 'table':
        return <MetaTable
          rowKey={objectMeta.idKey}
          operateItems={operateItems}
          columnMetas={columnMetas}
          rowSelection={rowSelection}
          columnComponents={components}
          {...tableProps}
        />
      case 'list':
        return <MetaTable
          rowKey={objectMeta.idKey}
          operateItems={operateItems}
          columnMetas={columnMetas}
          rowSelection={rowSelection}
          columnComponents={components}
          {...tableProps}
        />;
      default:
        return null;
    }
  }, [currentMode, objectMeta.idKey, operateItems, columnMetas, rowSelection, components, tableProps]);

  return (
    <div className={classNames('tbox-page', 'tbox-index-page', className)} style={style}>
      {title && <PageHeader title={title} subTitle={subTitle} /> }
      { advanceSearch }
      <ContentWrapper>
        { tablePanel }
        <IndexContent />
      </ContentWrapper>
    </div>
  )
}

export default React.forwardRef(IndexPage);
