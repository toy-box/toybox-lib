import React, { FC, useCallback, useMemo } from 'react';
import update from 'immutability-helper';
import { Button } from 'antd';
import { ReactSortable, ReactSortableProps } from 'react-sortablejs';
import classNames from 'classnames';
import { omit } from '@/utils';

export interface ItemRenderProps<T> {
  dataSource: T;
  onChange: (data: T) => void;
}

export interface ArrayListProps<T>
  extends Pick<
    ReactSortableProps<T>,
    'ghostClass' | 'chosenClass' | 'dragClass'
  > {
  dataSource?: Array<T>;
  onChange?: (data: Array<T>) => void;
  addMore?: () => void;
  addEnable?: boolean;
  removable?: boolean;
  max?: number;
  addText?: string;
  className?: string;
  style?: any;
  sortable?: boolean;
  handle?: string;
  renderItem: FC<any>;
}

const ArrayItem: FC<ArrayListProps<any>> = ({
  dataSource = [],
  onChange,
  max,
  addMore,
  addEnable,
  addText = '添加',
  sortable,
  className,
  style,
  handle,
  ghostClass,
  chosenClass,
  dragClass,
  renderItem: RenderItem,
}) => {
  const disabled = useMemo(() => {
    return max != null && dataSource.length >= max;
  }, [max, dataSource]);

  const handleAddMore = useCallback(() => {
    if (disabled) {
      return;
    }
    addMore && addMore();
  }, [disabled, onChange, dataSource]);

  const handleChange = useCallback(
    (arrayValue: any[]) => {
      const _value = arrayValue.map(v => omit(v, ['selected', 'chosen']));
      onChange && onChange(_value);
    },
    [onChange],
  );

  const handleItemChange = useCallback(
    (index: number, itemValue: any) => {
      onChange &&
        onChange(
          update(dataSource || [], {
            [index]: { $set: omit(itemValue, ['selected', 'chosen']) },
          }),
        );
    },
    [onChange, dataSource],
  );

  const handleRemove = useCallback(
    (index: number) => {
      onChange && onChange(update(dataSource || [], { $splice: [[index, 1]] }));
    },
    [onChange, dataSource],
  );

  const innerItemRender = useCallback(
    (itemValue: any, index: number) => {
      const props = {
        value: itemValue,
        onChange: (itemValue: any) => handleItemChange(index, itemValue),
        remove: () => handleRemove(index),
      };
      return (
        <div className="array-item__item" key={index}>
          {' '}
          {<RenderItem {...props} />}{' '}
        </div>
      );
    },
    [RenderItem, handleItemChange, handleRemove],
  );

  const addRender = useMemo(() => {
    return (
      <React.Fragment>
        {addEnable && (
          <Button
            onClick={handleAddMore}
            type="primary"
            block
            disabled={disabled}
          >
            {addText}
          </Button>
        )}
      </React.Fragment>
    );
  }, [addEnable]);

  return (
    <React.Fragment>
      {sortable ? (
        <ReactSortable
          tag="div"
          className={classNames('array-item', className)}
          style={style}
          list={dataSource}
          sort={sortable}
          setList={handleChange}
          handle={handle}
          ghostClass={ghostClass}
          chosenClass={chosenClass}
          dragClass={dragClass}
        >
          {dataSource.map((itemValue, index) =>
            innerItemRender(itemValue, index),
          )}
        </ReactSortable>
      ) : (
        <div className={classNames('array-item', className)} style={style}>
          {dataSource.map((itemValue, index) =>
            innerItemRender(itemValue, index),
          )}
        </div>
      )}
      {addRender}
    </React.Fragment>
  );
};

export default ArrayItem;
