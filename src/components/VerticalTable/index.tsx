import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ColumnsType,
  DefaultRecordType,
  RowClassName,
} from 'rc-table/lib/interface';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { ConfigContext } from 'antd/lib/config-provider/context';
import {
  TableRowSelection,
  GetRowKey,
  GetPopupContainer,
} from 'antd/lib/table/interface';
import classNames from 'classnames';
import useSelection from 'antd/lib/table/hooks/useSelection';
import useTitleColumns from 'antd/lib/table/hooks/useTitleColumns';
import useLazyKVMap from 'antd/lib/table/hooks/useLazyKVMap';
import defaultLocale from 'antd/lib/locale/en_US';
import { useTimeoutLock } from 'rc-table/lib/hooks/useFrame';
import ColumnRow from './components/ColumnRow';
import { TableContext } from './context/tableContext';

import './style.less';

type RowKeyFn<RecordType> = (record: RecordType) => string;

// Used for conditions cache
const EMPTY_DATA: any[] = [];

// Used for customize scroll
const EMPTY_SCROLL_TARGET = {};
export interface VerticalTableProps<RecordType extends DefaultRecordType> {
  bordered?: boolean;
  columns: ColumnsType<DefaultRecordType>;
  columnWidth?: number;
  headerWidth?: number;
  dataSource: RecordType[];
  expandedRowClassName?: RowClassName<DefaultRecordType>;
  loading?: boolean | ReactNode;
  rowClassName?: string | RowClassName<DefaultRecordType>;
  size?: SizeType;
  showHeader?: boolean;
  rowSelection?: Omit<TableRowSelection<RecordType>, 'fixed'>;
  rowKey?: string | RowKeyFn<RecordType>;
  getPopupContainer?: GetPopupContainer;
}

function VerticalTable<RecordType = DefaultRecordType>({
  bordered,
  columns,
  columnWidth,
  dataSource,
  headerWidth,
  rowClassName,
  size,
  showHeader = true,
  rowSelection,
  rowKey,
  getPopupContainer,
}: VerticalTableProps<RecordType>) {
  const prefixCls = 'tbox-vertical-table';
  const [pingedLeft, setPingedLeft] = useState(false);
  const [pingedRight, setPingedRight] = useState(false);
  const {
    locale: contextLocale = defaultLocale,
    renderEmpty,
    direction,
  } = React.useContext(ConfigContext);
  const tableLocale = { ...contextLocale.Table };

  const tableContextValue = useMemo(
    () => ({
      dataSource,
      rowClassName,
      columns,
      columnWidth,
      headerWidth,
      showHeader,
    }),
    [rowClassName, showHeader, columns, columnWidth, headerWidth],
  );

  // =========================== Classes ===========================
  const classes = classNames('tbox-vertical-table', {
    [`${prefixCls}-${size}`]: size,
    [`${prefixCls}-bordered`]: bordered,
    [`${prefixCls}-ping-left`]: pingedLeft,
    [`${prefixCls}-ping-right`]: pingedRight,
  });

  // ============================ RowKey ============================
  const getRowKey = React.useMemo<GetRowKey<RecordType>>(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }

    return (record: RecordType) => (record as any)?.[rowKey as string];
  }, [rowKey]);

  const childrenColumnName = 'selector';

  const [getRecordByKey] = useLazyKVMap(
    dataSource || EMPTY_DATA,
    childrenColumnName,
    getRowKey,
  );

  const mergedData = useMemo(() => dataSource, [dataSource]);
  const pageData = useMemo(() => dataSource, [dataSource]);

  // ============================ Scroll =============================
  const scrollRef = React.useRef<any>();

  const [setScrollTarget, getScrollTarget] = useTimeoutLock<any>(null);

  function forceScroll(
    scrollLeft: number,
    target: HTMLDivElement | ((left: number) => void),
  ) {
    if (!target) {
      return;
    }
    if (typeof target === 'function') {
      target(scrollLeft);
    } else if (target.scrollLeft !== scrollLeft) {
      // eslint-disable-next-line no-param-reassign
      target.scrollLeft = scrollLeft;
    }
  }
  const onScroll = ({
    currentTarget,
    scrollLeft,
  }: {
    currentTarget: HTMLElement;
    scrollLeft?: number;
  }) => {
    console.log('scrollLeft', scrollLeft);
    const isRTL = direction === 'rtl';
    const mergedScrollLeft =
      typeof scrollLeft === 'number' ? scrollLeft : currentTarget.scrollLeft;

    const compareTarget = currentTarget || EMPTY_SCROLL_TARGET;
    if (!getScrollTarget() || getScrollTarget() === compareTarget) {
      setScrollTarget(compareTarget);

      forceScroll(mergedScrollLeft, scrollRef.current);
    }

    if (currentTarget) {
      const { scrollWidth, clientWidth } = currentTarget;
      if (isRTL) {
        setPingedLeft(-mergedScrollLeft < scrollWidth - clientWidth);
        setPingedRight(-mergedScrollLeft > 0);
      } else {
        setPingedLeft(mergedScrollLeft > 0);
        setPingedRight(mergedScrollLeft < scrollWidth - clientWidth);
      }
    }
  };

  useEffect(() => {
    function onWheel(e: WheelEvent) {
      const { currentTarget, deltaX } = (e as unknown) as React.WheelEvent<
        HTMLDivElement
      >;
      if (deltaX) {
        onScroll({
          currentTarget,
          scrollLeft: currentTarget.scrollLeft + deltaX,
        });
      }
    }
    scrollRef.current?.addEventListener('wheel', onWheel);

    return () => {
      scrollRef.current?.removeEventListener('wheel', onWheel);
    };
  }, []);

  // ========================== Selections ==========================
  const [transformSelectionColumns, selectedKeySet] = useSelection<RecordType>(
    rowSelection,
    {
      prefixCls,
      data: mergedData,
      pageData,
      getRowKey,
      getRecordByKey,
      expandType: null,
      childrenColumnName,
      locale: tableLocale,
      getPopupContainer,
    },
  );

  // =========================== Column ============================

  const [transformTitleColumns] = useTitleColumns<RecordType>({});

  // =========================== Render =============================
  const transformColumns = useCallback(
    (innerColumns: ColumnsType<RecordType>): ColumnsType<RecordType> => {
      const cols = transformSelectionColumns(innerColumns);
      return transformTitleColumns(cols);
    },
    [transformTitleColumns, transformSelectionColumns],
  );

  const newColumns = useMemo(
    () => transformColumns(columns as ColumnsType<RecordType>),
    [transformColumns, columns],
  );

  return (
    <TableContext.Provider value={tableContextValue}>
      <div className={classes}>
        <table ref={scrollRef} onScroll={onScroll}>
          <tbody>
            {newColumns.map((column, index) => (
              <ColumnRow column={column} records={dataSource} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </TableContext.Provider>
  );
}

export default VerticalTable;
