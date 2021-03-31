import React, { FC, useCallback, useMemo } from 'react';
import update from 'immutability-helper';
import { Button } from 'antd';
import { ReactSortable, ReactSortableProps } from 'react-sortablejs';
import classNames from 'classnames';

export interface ItemRenderProps<T> {
  value: T;
  onChange: (value: T) => void;
}

export interface ArrayListProps<T>
  extends Pick<
    ReactSortableProps<T>,
    'ghostClass' | 'chosenClass' | 'dragClass'
  > {
  value?: Array<T>;
  onChange?: (value: Array<T>) => void;
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
  value,
  onChange,
  max,
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
    return max != null && (value || []).length >= max;
  }, [max, value]);

  const handleAddMore = useCallback(() => {
    if (disabled) {
      return;
    }
    const newItem = {
      image: undefined,
      link: {
        type: undefined,
        props: undefined,
      },
    };
    const newArray = [...(value || []), newItem];
    onChange && onChange(newArray);
  }, [disabled, onChange, value]);

  const handleChange = useCallback(
    (arrayValue: any[]) => {
      const _value = arrayValue.map(v => {
        const { selected, chosen, ..._itemValue } = v;
        return _itemValue;
      });
      onChange && onChange(_value);
    },
    [onChange],
  );

  const handleItemChange = useCallback(
    (index: number, itemValue: any) => {
      const { selected, chosen, ..._itemValue } = itemValue;
      onChange &&
        onChange(update(value || [], { [index]: { $set: _itemValue } }));
    },
    [onChange, value],
  );

  const handleRemove = useCallback(
    (index: number) => {
      onChange && onChange(update(value || [], { $splice: [[index, 1]] }));
    },
    [onChange, value],
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

  return (
    <React.Fragment>
      {sortable ? (
        <ReactSortable
          tag="div"
          className={classNames('array-item', className)}
          style={style}
          list={value || []}
          sort={sortable}
          setList={handleChange}
          handle={handle}
          ghostClass={ghostClass}
          chosenClass={chosenClass}
          dragClass={dragClass}
        >
          {(value || []).map((itemValue, index) =>
            innerItemRender(itemValue, index),
          )}
        </ReactSortable>
      ) : (
        <div className={classNames('array-item', className)} style={style}>
          {(value || []).map((itemValue, index) =>
            innerItemRender(itemValue, index),
          )}
        </div>
      )}
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
};

export default ArrayItem;
